import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// add the beginning of your app entry
// import 'vite/modulepreload-polyfill'
export default defineConfig({
  server: {
    cors: true, // Enable CORS without specifying origin
  },
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: './src/main.tsx', // Ensure this path points to the correct entry file
    },
  },
})