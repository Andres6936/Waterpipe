import type { Handle, RemixNode } from "remix/component";
import { css, clientEntry } from "remix/component";

import { Document } from "./document";
import { Interactive } from "~/ui/interactive.layout";

export function ViewPage() {
  return () => (
    <Document head={<Head />}>
      <Interactive />
    </Document>
  );
}

function Head() {
  return () => <link rel="stylesheet" href="css/style.css" />;
}
