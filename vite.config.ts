import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three'))
            return 'three';
          if (id.includes('node_modules/gsap')) return 'gsap';
          if (id.includes('node_modules/framer-motion')) return 'framer';
          if (id.includes('node_modules/lucide-react')) return 'icons';
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 700,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
