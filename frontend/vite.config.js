import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteFaviconsPlugin } from 'vite-plugin-favicon2';
import path from 'path'; // ← nécessaire si tu utilises des alias

export default defineConfig({
  plugins: [
    react(),
    ViteFaviconsPlugin({
      logo: './public/vibrate_logo.png',
      inject: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,           // ← permet l’accès depuis d’autres appareils du réseau
    port: 5173,           // ← ou un autre si déjà utilisé
  },
});
