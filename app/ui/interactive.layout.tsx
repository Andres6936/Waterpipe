import { css, clientEntry } from "remix/component";

import { Canvas } from "~/ui/canvas.client";
import { Controls, ControlContext } from "~/ui/controls.client";

export const Interactive = clientEntry(import.meta.url, function Interactive() {
  return () => (
    <ControlContext>
      <Controls />
      <Canvas />
    </ControlContext>
  );
});
