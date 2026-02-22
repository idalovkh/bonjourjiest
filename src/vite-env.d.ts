/// <reference types="vite/client" />

declare const __BUILD_TS__: string;

interface ImportMetaEnv {
  // Add VITE_* env vars here when needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
