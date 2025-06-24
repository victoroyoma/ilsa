import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This ensures proper environment variable handling
    'process.env': {}, // Keep this for compatibility with any libraries that might use process.env
  },
});
