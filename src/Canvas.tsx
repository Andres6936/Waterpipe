import { useRef } from "react";
import { Smoke } from "./Smoke";

const Canvas = () => {
  return (
    <canvas
      style={{ width: "100%", height: "100%" }}
      ref={(ref) => {
        if (!ref) return null;
        const smoke = new Smoke(ref, {});
      }}
    />
  );
};

export { Canvas };
