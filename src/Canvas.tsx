import React from "react";
import { Smoke } from "./Smoke";
import { useContext } from "./Context";

const Canvas = () => {
  const context = useContext();
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const smoke = React.useRef(new Smoke(context));

  React.useEffect(
    function startUp() {
      if (!ref.current || !smoke.current) return;
      smoke.current.drawAt(ref.current);
    },
    [ref],
  );

  React.useEffect(
    function animation() {
      if (!smoke.current) return;
      setInterval(() => smoke.current.onTimer(), 1);
    },
    [smoke],
  );

  return <canvas style={{ width: "100%", height: "100%" }} ref={ref} />;
};

export { Canvas };
