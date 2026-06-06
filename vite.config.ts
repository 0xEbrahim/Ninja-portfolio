import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Keep "/" for 0xEbrahim.github.io. Change to "/portfolio/" for a project site.
  base: "/",
});
