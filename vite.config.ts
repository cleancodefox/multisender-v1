import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    nodePolyfills({
      // Enable polyfills for specific globals and modules
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      // Enable polyfills for all Node.js modules
      protocolImports: true,
    }),
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
      // Node.js polyfills for problematic modules
      http: 'stream-http',
      https: 'https-browserify',
      url: 'url',
      zlib: 'browserify-zlib',
      vm: 'vm-browserify',
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {},
    'process.version': JSON.stringify(process.version),
  },
  optimizeDeps: {
    include: [
      'buffer',
      'crypto-browserify',
      'stream-browserify',
      'stream-http',
      'https-browserify',
      'url',
      'browserify-zlib',
      'vm-browserify',
      'assert',
      'events',
      'util',
      '@solana/web3.js',
      '@solana/wallet-adapter-base',
      '@solana/wallet-adapter-react',
      '@solana/spl-token',
      '@metaplex-foundation/js'
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: [],
      output: {
        globals: {
          global: 'globalThis',
        },
        // Let Vite handle all chunking automatically to avoid circular dependency issues
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      ignoreDynamicRequires: true,
    },
    sourcemap: mode === 'development',
  },
}));
