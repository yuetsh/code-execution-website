import { defineConfig } from "vite"
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
  plugins: [react(), legacy({ targets: ["chrome 66", "not IE 11"] })],
})
