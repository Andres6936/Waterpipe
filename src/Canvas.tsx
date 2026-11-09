import React from "react";
import { Smoke } from "./Smoke";
import { useContext } from "./Context";

const Canvas = () => {
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const context = useContext();

  React.useEffect(
    function startUp() {
      if (!ref.current) return;
      new Smoke(ref.current, context);
    },
    [ref],
  );

  return <canvas style={{ width: "100%", height: "100%" }} ref={ref} />;
};

export { Canvas };
