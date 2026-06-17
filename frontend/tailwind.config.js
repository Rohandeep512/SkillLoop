/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
    
        bg: { light: '#F9FAFB', dark: '#030712' }, 
        
      
        surface: { light: '#FFFFFF', dark: '#111827' },
        
       
        border: { light: '#E5E7EB', dark: '#1F2937' },
        
        
        accent: { light: '#2563EB', dark: '#3B82F6' },
        
        
        primary: { light: '#111827', dark: '#F9FAFB' },
        muted: { light: '#6B7280', dark: '#9CA3AF' },
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
}