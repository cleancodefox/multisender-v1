import { Buffer } from 'buffer';
import process from 'process';

// Make Buffer and process available globally for Solana libraries
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
  (window as any).global = window;
  (window as any).process = process;
} 