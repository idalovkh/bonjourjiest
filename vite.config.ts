import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    // Локально /api/* проксируется на прод (Vercel); на деплое прокси не используется
    proxy: {
      "/api": {
        target: process.env.VITE_API_ORIGIN ?? "https://deshar-school-landing.vercel.app",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "framer-motion",
      "embla-carousel-react",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-accordion",
    ],
  },
});
