import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { imagetools } from "vite-imagetools";
import path from "node:path";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
const buildTs = Date.now();

export default defineConfig({
  define: {
    __BUILD_TS__: JSON.stringify(buildTs),
  },
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url) => {
        const filePath = fileURLToPath(url);
        if (filePath.includes("/assets/teachers/")) {
          return new URLSearchParams("w=600&format=webp");
        }
        
        return new URLSearchParams();
      },
    }),
  ],
  build: {
    target: ["es2020", "safari14"],
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        banner: `/* build: ${buildTs} */`,
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "framer-motion";
            if (id.includes("embla-carousel")) return "embla";
            if (id.includes("react-dom") || id.includes("react/")) return "react-vendor";
            if (id.includes("@radix-ui")) return "radix";
            if (id.includes("lucide-react")) return "lucide";
          }
        },
      },
    },
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    // Локально /api/* проксируется на прод API; на VPS nginx проксирует /api на bonjour-api:3002
    proxy: {
      "/api": {
        target: process.env.VITE_API_ORIGIN ?? "https://bonjourjiest.com",
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
