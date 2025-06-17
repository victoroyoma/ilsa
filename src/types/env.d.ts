/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEETS_WEBHOOK_URL: string;
  // Add any other Vite env variables you need here
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_PAYSTACK_PUBLIC_KEY: string;
    REACT_APP_GOOGLE_SHEETS_API_KEY: string;
    REACT_APP_SHEET_ID: string;
    REACT_APP_CLOUDINARY_URL: string;
  }
}
