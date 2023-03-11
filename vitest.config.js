import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
   plugins: [react()],
   test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test/setupTests.js',
      coverage: {
         provider: 'istanbul', // or 'c8'
      },
   },
   clearScreen: true,
});
