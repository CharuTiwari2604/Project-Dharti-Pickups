import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  base: "./", // Optional: for relative asset paths if needed

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


// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     proxy: {
//       "/api": {
//         target: "http://localhost:5000",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });


