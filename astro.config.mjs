// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

export default defineConfig({
  // Site en SSR : chaque page est créée à chaque visite, avec les données à jour de PocketBase
  output: "server",
  // Adaptateur Node : le site tourne comme un serveur Node.js (sur le VPS)
  adapter: node({ mode: "standalone" }),

  image: {
    // Autorise les images servies par PocketBase (en local et en ligne)
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1", port: "8090" },
      { protocol: "https", hostname: "pb.linabenmabrouk.fr" },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});