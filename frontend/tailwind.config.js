/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: { light: '#F0F4F8', dark: '#0C0F0D' },
        surface: { light: '#FFFFFF', dark: '#131A15' },
        border: { light: '#CCDAE8', dark: '#1C2B20' },
        accent: { light: '#1A7A4A', dark: '#2ECC71' },
        primary: { light: '#0D1820', dark: '#F0F7F2' },
        muted: { light: '#5A7080', dark: '#6B8F74' },
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
    },
  },
  plugins: [],
}