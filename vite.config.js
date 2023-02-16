import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import react from "@vitejs/plugin-react"
import legacy from "@vitejs/plugin-legacy"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          ui: ["@mantine/core", "@mantine/hooks", "@emotion/react"],
          file: ["file-saver", "client-zip"],
        },
      },
    },
  },
  plugins: [
    react(),
    legacy({ targets: ["defaults", "not IE 11"] }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "徐越的自测猫",
        short_name: "自测猫",
        description: "徐越的自测猫",
        theme_color: "rgb(40, 42, 54)",
        display: "standalone",
        scope: "./",
        related_applications: [
          {
            platform: "webapp",
            url: "https://code.hyyz.izhai.net/manifest.json",
          },
        ],
        icons: [
          {
            src: "/icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
})
