import type { Handle, RemixNode } from "remix/component";
import { css, ref, clientEntry } from "remix/component";
import { CommentDirectiveType } from "typescript/unstable/ast";
import { Smoke } from "~/actions/public/Smoke";

export const Canvas = clientEntry(import.meta.url, function Canvas() {
  return () => (
    <canvas
      mix={[
        css({ width: "100%", height: "100%" }),
        ref((node) => {
          const smoke = new Smoke(node, {});
        }),
      ]}
    />
  );
});
