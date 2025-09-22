import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    target: 'esnext', // Target modern JavaScript only
    sourcemap: false, // Disable sourcemaps in production
    minify: 'esbuild', // Enable esbuild for minification
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },

        entryFileNames: '[hash:21].js',
        chunkFileNames: '[hash:21].js',
        assetFileNames: '[hash:21].[ext]',
        
      },
    },
  },
  // esbuild: {
  //   drop: ['console', 'debugger'],
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
});
