/* eslint-env node */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5174,
  },
  plugins: [react()],
  resolve: {
    alias: [{ find: "@app", replacement: path.resolve(__dirname, "src") }],
  },
});
