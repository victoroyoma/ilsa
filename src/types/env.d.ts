/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEETS_WEBHOOK_URL: string;
  readonly VITE_APP_PAYSTACK_PUBLIC_KEY: string;
  readonly VITE_APP_PAYSTACK_SECRET_KEY: string;
  readonly VITE_APP_GOOGLE_SHEETS_API_KEY: string;
  readonly VITE_APP_SHEET_ID: string;
  readonly VITE_APP_CLOUDINARY_URL: string;
  readonly VITE_AIRTABLE_API_KEY: string;
  readonly VITE_AIRTABLE_BASE_ID: string;
  readonly VITE_AIRTABLE_TABLE_NAME: string;
  // Add any other Vite env variables you need here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
