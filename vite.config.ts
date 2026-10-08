import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const srcPath = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": srcPath },
  },
  css: {
    preprocessorOptions: {
      // Lets modules write `@use "tokens"` and `@use "mixins"`.
      scss: { loadPaths: [`${srcPath}/styles`] },
    },
  },
  test: {
    environment: "jsdom",
    globals: false,
    passWithNoTests: true,
  },
});
