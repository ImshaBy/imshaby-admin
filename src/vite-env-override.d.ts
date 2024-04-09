interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_SENTRY_DSN: string
  readonly VITE_API_URL: string
  readonly VITE_FUSION_ADDRESS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

