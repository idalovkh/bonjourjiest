import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";
import path from "path";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // legacy disabled: known to cause iOS Safari white screen; iOS 15+ supports ES modules
    // legacy({ targets: ["iOS >= 15", "Safari >= 15", "defaults"], ... }),
    imagetools({
      // Apply resize transforms automatically by asset path — no query strings in imports
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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "framer-motion";
            if (id.includes("react-dom") || id.includes("react-router")) return "react-vendor";
            if (id.includes("@radix-ui") || id.includes("lucide-react")) return "ui";
            return "vendor";
          }
        },
      },
    },
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
