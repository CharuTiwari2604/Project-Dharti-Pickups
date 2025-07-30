import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // ✅ Add this plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ✅ Make sure this is included
  ],
  base: "./", // Optional: supports relative asset paths
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
