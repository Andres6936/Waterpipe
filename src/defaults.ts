export type Defaults = {
  gradientStart: string;
  gradientEnd: string;
  smokeOpacity: number;
  radiusSize: number;
  numCircles: number;
  maxMaxRad: number | string;
  minMaxRad: number | string;
  minRadFactor: number;
  iterations: number;
  drawsPerFrame: number;
  lineWidth: number;
  speed: number;
  bgColorInner: string;
  bgColorOuter: string;
};

export const defaults: Defaults = {
  gradientStart: "#000000",
  gradientEnd: "#222222",
  radiusSize: 100,
  smokeOpacity: 0.1,
  numCircles: 1,
  maxMaxRad: "auto",
  minMaxRad: "auto",
  minRadFactor: 0,
  iterations: 8,
  drawsPerFrame: 10,
  lineWidth: 2,
  speed: 1,
  //Background
  bgColorInner: "#ffffff",
  bgColorOuter: "#666666",
};
