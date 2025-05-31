import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/upsc/", // Set the base path for assets
  build: {
    outDir: "dist", // Ensure the build output directory is `dist`
  },
});
