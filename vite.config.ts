import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// Dynamically import dev-only plugin to avoid CommonJS issues in production
let runtimeErrorOverlay: any = undefined;
if (process.env.NODE_ENV !== "production") {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    runtimeErrorOverlay = require("@replit/vite-plugin-runtime-error-modal");
  } catch {
    // plugin not available or incompatible; ignore in production
  }
}
// In bundled production code, __dirname is undefined; fallback to process.cwd()
const _dirname = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

export default defineConfig({
  plugins: [
    react(),
    ...(runtimeErrorOverlay
      ? [
          (typeof runtimeErrorOverlay === "function"
            ? runtimeErrorOverlay()
            : runtimeErrorOverlay.default
            ? runtimeErrorOverlay.default()
            : [])
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(_dirname, "client", "src"),
      "@shared": path.resolve(_dirname, "shared"),
      "@assets": path.resolve(_dirname, "attached_assets"),
    },
  },
  root: path.resolve(_dirname, "client"),
  build: {
    outDir: path.resolve(_dirname, "client", "dist"), // stays inside client
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
