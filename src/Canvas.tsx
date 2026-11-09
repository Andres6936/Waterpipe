import React from "react";
import { useContext } from "./Context";

const Canvas = () => {
  const context = useContext();
  const ref = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(
    function startUp() {
      if (!ref.current) return;
      context.setCanvas(ref.current);
    },
    [ref],
  );

  React.useEffect(function animation() {
    context.start();
    return () => context.stop();
  }, []);

  return <canvas style={{ width: "100%", height: "100%" }} ref={ref} />;
};

export { Canvas };
