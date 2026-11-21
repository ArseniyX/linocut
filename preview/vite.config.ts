import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwind from "@tailwindcss/vite"
import path from "node:path"

export default defineConfig({
  root: __dirname,
  base: "./", // relative assets so it works under /linocut/ on GitHub Pages
  plugins: [react(), tailwind()],
  resolve: { alias: { "@": path.resolve(__dirname, "../registry") } },
})
