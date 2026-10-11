/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_FORM_ENDPOINT?: string
  readonly VITE_BOOKING_URL?: string
  readonly VITE_COMPANY_PROFILE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
