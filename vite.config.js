import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Increase timeout for large builds
    timeout: 0,
    // Disable source maps for faster builds (optional)
    sourcemap: false,
    // Optimize dependencies
    rollupOptions: {
      // Externalize problematic dependencies if needed
      external: []
    }
  },
  server: {
    // Increase timeout for server start
    timeout: 100000,
    // Disable host checking if needed
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyRequest) => {
            proxyRequest.setHeader('Origin', 'http://127.0.0.1:8787')
          })
        },
      },
      '/media': {
        target: 'http://127.0.0.1:8787',
      },
    },
  }
})
