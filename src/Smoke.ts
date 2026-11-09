import { defaults, type Defaults } from "./defaults";
import { SmokeNiceBG } from "./SmokeNiceBG";

const TWO_PI = 2 * Math.PI;

const isNumber = (value: unknown): value is number =>
  typeof value === "number" && !Number.isNaN(value);

export class Smoke {
  private drawCount: number;
  private canvas: HTMLCanvasElement;
  private displayCanvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private displayHeight: number;
  private displayWidth: number;
  private niceGradient: SmokeNiceBG;
  private circles: any[];
  private radius: number;
  private settings: Defaults;

  // Animation loop state (per instance, so several canvases can coexist).
  private rafId: number | null = null;
  private running = false;

  constructor(options: Defaults) {
    this.settings = { ...defaults, ...options };
  }

  public setSettings(_settings: Partial<Defaults>) {
    this.settings = { ...this.settings, ..._settings };
  }

  public setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.displayWidth = canvas.clientWidth;
    this.displayHeight = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    this.context = canvas.getContext("2d")!;
    this.radius = (canvas.clientHeight * 0.8) / 2;

    this.clear();
  }

  public clear() {
    this.drawCount = 0;
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.displayWidth, this.displayHeight);

    this.fillBackground();
    this.setCircles();
  }

  /** Starts the animation loop. Safe to call multiple times. */
  public start() {
    if (this.running) return;

    this.running = true;
    this.rafId = requestAnimationFrame(this.loop);
  }

  /** Stops the animation loop. */
  public stop() {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /** Stops the animation and releases the per-run state. */
  public destroy() {
    this.stop();
    this.circles = [];
  }

  private loop = () => {
    if (!this.running) return;

    // Exactly one simulation step per display frame. The whole frame's work
    // stays tiny (~drawsPerFrame curves), so the browser never blows its
    // ~16.7ms budget: that is what keeps the motion fluid. The trade-off is
    // that the smoke advances ~4x slower than the old setInterval(..., 1),
    // which is intentional. To speed it up without losing smoothness, raise
    // `drawsPerFrame` (and/or `iterations`) instead of adding steps per frame.
    if (!this.onTimer()) {
      this.stop();
      return;
    }

    this.rafId = requestAnimationFrame(this.loop);
  };

  /** Advances the simulation by one step. Returns false when it is done. */
  public onTimer(): boolean {
    let i, j;
    let c;
    let rad;
    let point1, point2;
    let x0, y0;
    let cosParam;

    const xSqueeze = 0.75; //cheap 3D effect by shortening in x direction.

    let yOffset;

    //draw circles
    for (j = 0; j < this.settings.drawsPerFrame; j++) {
      this.drawCount++;

      for (i = 0; i < this.settings.numCircles; i++) {
        c = this.circles[i];
        c.param += c.changeSpeed;
        if (c.param >= 1) {
          c.param = 0;

          c.pointList1 = c.pointList2;
          c.pointList2 = this.setLinePoints(this.settings.iterations);
        }
        cosParam = 0.5 - 0.5 * Math.cos(Math.PI * c.param);

        this.context.strokeStyle = c.color;
        this.context.lineWidth = this.settings.lineWidth;
        //context.fillStyle = c.fillColor;
        this.context.beginPath();
        point1 = c.pointList1.first;
        point2 = c.pointList2.first;

        //slowly rotate
        c.phase += 0.0002;

        let theta = c.phase;
        rad =
          c.minRad +
          (point1.y + cosParam * (point2.y - point1.y)) * (c.maxRad - c.minRad);

        //move center
        c.centerX += 0.5;
        c.centerY += 0.04;
        yOffset =
          40 * Math.sin(c.globalPhase + (this.drawCount / 1000) * TWO_PI);
        // Stop when off screen
        const maxRadial =
          this.settings.maxMaxRad === "auto"
            ? this.radius
            : this.settings.maxMaxRad;
        if (c.centerX > this.displayWidth + maxRadial) {
          return false;
        }

        //we are drawing in new position by applying a transform. We are doing this so the gradient will move with the drawing.
        this.context.setTransform(
          xSqueeze,
          0,
          0,
          1,
          c.centerX,
          c.centerY + yOffset,
        );

        //Drawing the curve involves stepping through a linked list of points defined by a fractal subdivision process.
        //It is like drawing a circle, except with varying radius.
        x0 = xSqueeze * rad * Math.cos(theta);
        y0 = rad * Math.sin(theta);
        this.context.lineTo(x0, y0);
        while (point1.next != null) {
          point1 = point1.next;
          point2 = point2.next;
          theta =
            TWO_PI * (point1.x + cosParam * (point2.x - point1.x)) + c.phase;
          rad =
            c.minRad +
            (point1.y + cosParam * (point2.y - point1.y)) *
              (c.maxRad - c.minRad);
          x0 = xSqueeze * rad * Math.cos(theta);
          y0 = rad * Math.sin(theta);
          this.context.lineTo(x0, y0);
        }
        this.context.closePath();
        this.context.stroke();
        //context.fill();
      }
    }

    return true;
  }

  public download(width: number, height: number) {
    this.exportContext.drawImage(
      this.displayCanvas[0],
      0,
      0,
      width,
      height,
      0,
      0,
      width,
      height,
    );
    //we will open a new window with the image contained within:
    //retrieve canvas image as data URL:
    const dataURL = this.exportCanvas.toDataURL("image/png");
    //open a new window of appropriate size to hold the image:
    const imageWindow = window.open(
      "",
      "fractalLineImage",
      "left=0,top=0,width=" +
        width +
        ",height=" +
        height +
        ",toolbar=0,resizable=0",
    );
    //write some html into the new window, creating an empty image:
    imageWindow.document.write("<title>Export Image</title>");
    imageWindow.document.write(
      "<img id='exportImage'" +
        " alt=''" +
        " height='" +
        height +
        "'" +
        " width='" +
        width +
        "'" +
        " style='position:absolute;left:0;top:0'/>",
    );
    imageWindow.document.close();
    //copy the image into the empty img in the newly opened window:
    const exportImage = imageWindow.document.getElementById("exportImage");
    // @ts-ignore
    exportImage.src = dataURL;
  }

  public setOption<T>(optionName: string, optionValue: T) {
    this.settings[optionName] = optionValue;
  }

  private fillBackground() {
    const outerRad =
      Math.sqrt(
        this.displayWidth * this.displayWidth +
          this.displayHeight * this.displayHeight,
      ) / 2;
    this.niceGradient = new SmokeNiceBG(
      this.displayWidth * 0.75,
      (this.displayHeight / 2) * 0.75,
      0,
      this.displayWidth / 2,
      this.displayHeight / 4,
      outerRad,
    );

    let hex = this.settings.bgColorInner.replace("#", "");

    const r0 = parseInt(hex.substring(0, 2), 16),
      g0 = parseInt(hex.substring(2, 4), 16),
      b0 = parseInt(hex.substring(4, 6), 16);

    hex = this.settings.bgColorOuter.replace("#", "");
    const r1 = parseInt(hex.substring(0, 2), 16),
      g1 = parseInt(hex.substring(2, 4), 16),
      b1 = parseInt(hex.substring(4, 6), 16);

    this.niceGradient.addColorStop(0, r0, g0, b0);
    this.niceGradient.addColorStop(1, r1, g1, b1);
    this.niceGradient.fillRect(
      this.context,
      0,
      0,
      this.displayWidth,
      this.displayHeight,
    );
  }

  private getMaximumRadial() {
    if (
      isNumber(this.settings.maxMaxRad) &&
      isNumber(this.settings.minMaxRad)
    ) {
      return (
        this.settings.minMaxRad +
        Math.random() * (this.settings.maxMaxRad - this.settings.minMaxRad)
      );
    } else {
      return this.radius + Math.random() * (this.radius - this.radius);
    }
  }

  private setCircles() {
    let i;
    let maxR, minR;
    let grad;

    this.circles = [];

    for (i = 0; i < this.settings.numCircles; i++) {
      maxR = this.getMaximumRadial();
      minR = this.settings.minRadFactor * maxR;

      //define gradient
      grad = this.context.createRadialGradient(0, 0, minR, 0, 0, maxR);
      const gradientStart = this.hexToRGBA(
          this.settings.gradientStart,
          this.settings.smokeOpacity,
        ),
        gradientEnd = this.hexToRGBA(
          this.settings.gradientEnd,
          this.settings.smokeOpacity,
        );

      grad.addColorStop(1, gradientStart);
      grad.addColorStop(0, gradientEnd);

      const newCircle = {
        centerX: -maxR,
        centerY: this.displayHeight / 2 - 50,
        maxRad: maxR,
        minRad: minR,
        color: grad, //can set a gradient or solid color here.
        //fillColor: "rgba(0,0,0,1)",
        param: 0,
        changeSpeed: 1 / 250,
        phase: Math.random() * TWO_PI, //the phase to use for a single fractal curve.
        globalPhase: Math.random() * TWO_PI, //the curve as a whole will rise and fall by a sinusoid.
        pointList1: undefined,
        pointList2: undefined,
      };
      this.circles.push(newCircle);
      newCircle.pointList1 = this.setLinePoints(this.settings.iterations);
      newCircle.pointList2 = this.setLinePoints(this.settings.iterations);
    }
  }

  private setLinePoints(iterations) {
    const pointList = {
      first: undefined,
    };
    pointList.first = { x: 0, y: 1 };
    const lastPoint = { x: 1, y: 1 };
    let minY = 1;
    let maxY = 1;
    let point;
    let nextPoint;
    let dx, newX, newY;

    pointList.first.next = lastPoint;
    for (let i = 0; i < iterations; i++) {
      point = pointList.first;
      while (point.next != null) {
        nextPoint = point.next;

        dx = nextPoint.x - point.x;
        newX = 0.5 * (point.x + nextPoint.x);
        newY = 0.5 * (point.y + nextPoint.y);
        newY += dx * (Math.random() * 2 - 1);

        const newPoint = { x: newX, y: newY, next: undefined };

        //min, max
        if (newY < minY) {
          minY = newY;
        } else if (newY > maxY) {
          maxY = newY;
        }

        //put between points
        newPoint.next = nextPoint;
        point.next = newPoint;

        point = nextPoint;
      }
    }

    //normalize to values between 0 and 1
    if (maxY != minY) {
      const normalizeRate = 1 / (maxY - minY);
      point = pointList.first;
      while (point != null) {
        point.y = normalizeRate * (point.y - minY);
        point = point.next;
      }
    }
    //unlikely that max = min, but could happen if using zero iterations. In this case, set all points equal to 1.
    else {
      point = pointList.first;
      while (point != null) {
        point.y = 1;
        point = point.next;
      }
    }

    return pointList;
  }

  private hexToRGBA(hex, opacity) {
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
  }
}
