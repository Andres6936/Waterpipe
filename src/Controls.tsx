import { useContext } from "./Context";

const Controls = () => {
  const context = useContext();

  return (
    <div className="absolute (top:2%) (bottom:2%) (left:2%) (width:220px) flex flex-col sidebar-wrapper">
      <div className="intro">
        <h1>waterpipe.js</h1>
        <div className="created-by">
          by
          <a href="http://www.dragdropsite.com" target="_blank">
            dragdropsite.com
          </a>
        </div>
      </div>

      <div className="flex grow(1) generator-form-wrap">
        <form className="generator-params">
          <h2>Smoke style</h2>
          <div className="input-group">
            <label htmlFor="gradientStart">Gradient start:</label>
            <input
              type="color"
              id="gradientStart"
              name="gradientStart"
              value={context.gradientStart}
              className="color-picker gradient-start"
            />
          </div>
          <div className="input-group">
            <label htmlFor="gradientEnd">Gradient end:</label>
            <input
              type="color"
              id="gradientEnd"
              name="gradientEnd"
              className="color-picker gradient-end"
              value={context.gradientEnd}
            />
          </div>
          <div className="input-group">
            <label htmlFor="smokeOpacity">
              Opacity: <span className="value">10%</span>
            </label>
            <input
              type="range"
              id="smokeOpacity"
              name="smokeOpacity"
              className="smokeOpacity-slider"
              min="0"
              max="100"
              step="5"
              value={context.smokeOpacity}
            />
          </div>
          <div className="input-group">
            <label htmlFor="radiusSize">
              Smoke size: <span className="value">100%</span>
            </label>
            <input
              type="range"
              id="radiusSize"
              name="radiusSize"
              className="radiusSize-slider"
              min="10"
              max="300"
              step="1"
              value={context.radiusSize}
            />
          </div>
          <div className="input-group">
            <label htmlFor="lineWidth">
              Line width: <span className="value">2px</span>
            </label>
            <input
              type="range"
              id="lineWidth"
              name="lineWidth"
              className="lineWidth-slider"
              min="0.1"
              max="10"
              step="0.1"
              value={context.lineWidth}
            />
          </div>
          <div className="input-group">
            <label htmlFor="numCircles">
              Smokes #: <span className="value">1</span>
            </label>
            <input
              type="range"
              id="numCircles"
              name="numCircles"
              className="numCircles-slider"
              min="1"
              max="5"
              step="1"
              value={context.numCircles}
            />
          </div>
          <h2>Background style</h2>
          <div className="input-group">
            <label htmlFor="bgColorOuter">Outer color:</label>
            <input
              type="color"
              id="bgColorOuter"
              name="bgColorOuter"
              className="color-picker color-outer"
              value={context.bgColorOuter}
            />
          </div>
          <div className="input-group">
            <label htmlFor="bgColorInner">Inner color:</label>
            <input
              type="color"
              id="bgColorInner"
              name="bgColorInner"
              className="color-picker color-inner"
              value={context.bgColorInner}
            />
          </div>
          <h2>Download size</h2>
          <div className="input-group">
            <label htmlFor="downloadWidth">Width (px):</label>
            <input type="text" id="downloadWidth" name="downloadWidth" />
          </div>
          <div className="input-group">
            <label htmlFor="downloadHeight">Height (px):</label>
            <input type="text" id="downloadHeight" name="downloadHeight" />
          </div>
          <h2 id="samples-section">Samples (click to generate)</h2>
          <div className="input-group samples">
            <a href="#" className="sample-smoke" data-id="0">
              <img src="img/samples/small/sample-1.jpg" alt="" />
            </a>
            <a href="#" className="sample-smoke" data-id="1">
              <img src="img/samples/small/sample-2.jpg" alt="" />
            </a>
            <a href="#" className="sample-smoke" data-id="2">
              <img src="img/samples/small/sample-3.jpg" alt="" />
            </a>
            <a href="#" className="sample-smoke" data-id="3">
              <img src="img/samples/small/sample-4.jpg" alt="" />
            </a>
            <a href="#" className="sample-smoke" data-id="4">
              <img src="img/samples/small/sample-5.jpg" alt="" />
            </a>
            <a href="#" className="sample-smoke" data-id="5">
              <img src="img/samples/small/sample-6.jpg" alt="" />
            </a>
            <a href="#" className="sample-smoke" data-id="6">
              <img src="img/samples/small/sample-7.jpg" alt="" />
            </a>
            <a href="#" className="sample-smoke" data-id="7">
              <img src="img/samples/small/sample-8.jpg" alt="" />
            </a>
            <a href="#" className="sample-smoke" data-id="8">
              <img src="img/samples/small/sample-9.jpg" alt="" />
            </a>
            <a href="#" className="sample-smoke" data-id="9">
              <img src="img/samples/small/sample-10.jpg" alt="" />
            </a>
            <a href="#" className="sample-smoke" data-id="10">
              <img src="img/samples/small/sample-11.jpg" alt="" />
            </a>
            <a href="#" className="sample-smoke" data-id="11">
              <img src="img/samples/small/sample-12.jpg" alt="" />
            </a>
          </div>
        </form>
      </div>

      <div className="buttons-wrap">
        <div className="btn btn-grey btn-samples">Samples</div>
        <div className="btn btn-grey btn-generate">Generate</div>
        <div className="btn btn-grey btn-download">Download</div>
      </div>
    </div>
  );
};

export { Controls };
