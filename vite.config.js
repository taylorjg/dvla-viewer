import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/dvla-viewer",
  define: {
    __BUNDLED_DEV__: "false",
    __SERVER_FORWARD_CONSOLE__: JSON.stringify({ enabled: false }),
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@app", replacement: path.resolve(import.meta.dirname, "src") },
    ],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setup-files.js",
  },
});
