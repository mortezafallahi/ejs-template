import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import data from "./src/data";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
  },
  plugins: [
    ViteEjsPlugin(data)
  ],
});
