import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteFaviconsPlugin } from 'vite-plugin-favicon2';

export default defineConfig({
  plugins: [
    react(),
    ViteFaviconsPlugin({
      logo: './public/celebrise_logo.png', // Chemin vers ton logo
      inject: true,
    }),
  ],
});
