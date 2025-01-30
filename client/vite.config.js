import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://expense-tracker-backend-va7x.onrender.com",
        changeOrigin: true, // Important for Render backend
        secure: true, // Ensures HTTPS requests work
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove `/api` prefix if not needed in backend
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
