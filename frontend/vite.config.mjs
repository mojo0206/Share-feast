import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: This enables React Router to work
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {},
  },
  resolve: {
    alias: {},
  },
  // THIS LINE FIXES EVERYTHING:
  appType: 'spa',
});
