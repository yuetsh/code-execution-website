import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          antd: ['antd']
        }
      }
    }
  },
  plugins: [
    react(), 
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
})
