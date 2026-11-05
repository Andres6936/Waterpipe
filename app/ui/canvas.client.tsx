import type { Handle, RemixNode } from "remix/component";
import { css, clientEntry } from "remix/component";

export const Canvas = clientEntry(import.meta.url, function Canvas() {
  return () => (
    <div id="wavybg-wrapper" mix={css({ with: "100%", overflow: "hidden" })} />
  );
});
