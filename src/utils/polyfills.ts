import { Buffer } from 'buffer';
import process from 'process';

// Make Buffer and process available globally for Solana libraries
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
  (window as any).global = window;
  (window as any).process = process;
  
  // Additional polyfills for Solana wallet adapters
  if (!window.global) {
    (window as any).global = window;
  }
  
  // Ensure process.env exists
  if (!process.env) {
    process.env = {};
  }
} 