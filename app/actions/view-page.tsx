import type { Handle, RemixNode } from "remix/component";
import { css, clientEntry } from "remix/component";

import { Document } from "./document";
import { Canvas } from "~/ui/canvas.client";
import { Controls } from "~/ui/controls.client";

export function ViewPage() {
  return () => (
    <Document head={<Head />}>
      <Controls />
      <Canvas />
    </Document>
  );
}

function Head() {
  return () => <link rel="stylesheet" href="css/style.css" />;
}
