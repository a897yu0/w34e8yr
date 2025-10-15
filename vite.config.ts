import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      babelConfig: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
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
  esbuild: {
    drop: (process.env.NODE_ENV === 'production') ? ['console', 'debugger'] : [],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
});
