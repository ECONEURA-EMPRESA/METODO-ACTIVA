import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {

      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://us-central1-project-c465bc45-299b-470d-8b6.cloudfunctions.net',
        changeOrigin: true,
        rewrite: (path) => {
          if (path === '/api/chat') return '/chatWithGemini';
          if (path === '/api/dashboard') return '/getDashboardData';
          return path;
        }
      }
    }
  }
})
