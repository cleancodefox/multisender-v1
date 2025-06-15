/// <reference types="vite/client" />

import { Buffer } from 'buffer';

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
  
  var Buffer: typeof Buffer;
  var global: typeof globalThis;
}
