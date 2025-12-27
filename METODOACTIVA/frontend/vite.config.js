import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress', // Best compression
      ext: '.br',
      threshold: 1024
    }),
    viteCompression({
      algorithm: 'gzip', // Fallback
      ext: '.gz',
      threshold: 1024
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo.jpg', 'book-cover.jpg'],
      manifest: {
        name: 'Método Activa',
        short_name: 'Método Activa',
        description: 'Musicoterapia para Salud y Bienestar',
        theme_color: '#EC008C',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'logo.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/functions', 'firebase/app-check'],
          'vendor-ui': ['framer-motion', 'lucide-react', 'clsx', 'tailwind-merge', 'sonner']
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://metodo-activa-brain-v2-6tbh2ch5wa-uc.a.run.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1')
      }
    }
  }
})
