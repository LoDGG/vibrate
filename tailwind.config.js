/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          heading: ['Montserrat', 'sans-serif'],
          body: ['Inter', 'sans-serif'],
        },
        colors: {
          black: '#0A0A0A',
          pink: '#FF2EBC',
          cyan: '#00F0FF',
          softWhite: '#F8F8F8',
        },
        boxShadow: {
          neon: '0 0 8px #FF2EBC, 0 0 16px #FF2EBC',
          neonCyan: '0 0 8px #00F0FF, 0 0 16px #00F0FF',
        }
      },
    },
    plugins: [],
  }
  