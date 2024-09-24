///  <reference types="vite/client" />

// types for env variables on .env files
export interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_TEST: string
  // more env variables...
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
