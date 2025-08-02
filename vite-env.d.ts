/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_BASE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
