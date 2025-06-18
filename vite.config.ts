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
        // Manual chunking for better code splitting
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-accordion',
            '@radix-ui/react-tabs'
          ],
          // Solana related chunks
          'solana-core': [
            '@solana/web3.js',
            '@solana/spl-token'
          ],
          'solana-wallet': [
            '@solana/wallet-adapter-base',
            '@solana/wallet-adapter-react',
            '@solana/wallet-adapter-react-ui',
            '@solana/wallet-adapter-wallets'
          ],
          'metaplex': ['@metaplex-foundation/js'],
          // Utility chunks
          'utils': [
            'clsx',
            'class-variance-authority',
            'tailwind-merge',
            'date-fns',
            'zod'
          ],
          // Crypto polyfills
          'crypto-polyfills': [
            'crypto-browserify',
            'stream-browserify',
            'buffer',
            'assert',
            'events',
            'util'
          ]
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      ignoreDynamicRequires: true,
    },
    sourcemap: mode === 'development',
  },
}));
