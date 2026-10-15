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
    // MSW 3 + jsdom: default document URL is http://localhost/, so axios requests
    // to the API host look cross-origin and fail with "Network Error". Match the API base.
    environmentOptions: {
      jsdom: {
        url: "https://jen123ryri.execute-api.us-east-1.amazonaws.com/",
      },
    },
    setupFiles: "./src/setup-files.js",
    include: ["src/**/*.{test,spec}.{js,jsx}"],
  },
});
