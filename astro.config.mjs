// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  image: {
    // Autorise les images servies par PocketBase en local
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1", port: "8090" },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
