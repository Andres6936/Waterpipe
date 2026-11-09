import react from "@vitejs/plugin-react";
import masterCSS from "@master/css-vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), masterCSS({ mode: "static" })],
});
