import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";
import path from "path";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url) => {
        const filePath = fileURLToPath(url);
        if (filePath.includes("/assets/teachers/")) {
          return new URLSearchParams("w=600&format=webp");
        }
        if (filePath.includes("emblem.webp")) {
          return new URLSearchParams("w=720&format=webp");
        }
        if (filePath.includes("logo.webp")) {
          return new URLSearchParams("w=280&format=webp");
        }
        return new URLSearchParams();
      },
    }),
  ],
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
