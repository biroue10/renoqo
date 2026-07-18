import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: { jsx: "automatic" },
  test: { environment: "jsdom", include: ["tests/**/*.test.{ts,tsx}"] },
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
});
