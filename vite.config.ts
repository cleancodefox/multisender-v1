import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert',
      events: 'events',
      util: 'util',
      buffer: 'buffer',
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  optimizeDeps: {
    include: [
      'buffer',
      'crypto-browserify',
      'stream-browserify',
      'assert',
      'events',
      'util'
    ],
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        globals: {
          global: 'globalThis',
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
