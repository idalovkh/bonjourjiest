/// <reference types="vite/client" />

// vite-imagetools: any image import with query params returns URL string
declare module "*.webp?*" {
  const src: string;
  export default src;
}
declare module "*.png?*" {
  const src: string;
  export default src;
}
declare module "*.jpg?*" {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  // Add VITE_* env vars here when needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
