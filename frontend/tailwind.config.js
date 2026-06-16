/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light: Off-white background, not blue-tinted
        // Dark: Deep, almost-black charcoal, not pure black
        bg: { light: '#F9FAFB', dark: '#030712' }, 
        
        // Surface: Crisp white vs Deep slate
        surface: { light: '#FFFFFF', dark: '#111827' },
        
        // Border: Subtler, less "thick"
        border: { light: '#E5E7EB', dark: '#1F2937' },
        
        // Accent: Using a more vibrant "Electric" color
        accent: { light: '#2563EB', dark: '#3B82F6' },
        
        // Text: High contrast
        primary: { light: '#111827', dark: '#F9FAFB' },
        muted: { light: '#6B7280', dark: '#9CA3AF' },
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      // Added: This helps with the "dull" look by creating soft layers
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
}