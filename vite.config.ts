import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
  },
  build: {
    manifest: true,
    outDir: "dist", // ✅ This is required for Vercel to find the output folder
    rollupOptions: {
      input: "./index.html", // ✅ Ensure this points to your actual index.html location
    },
  },
});
