import react from "@vitejs/plugin-react";
import masterCSS from "@master/css-vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS
    ? `/${process.env.GITHUB_REPOSITORY_NAME}/`
    : "/",
  plugins: [react(), masterCSS({ mode: "static" })],
});
