/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ig-primary': { bg: '#FFFFFF', dark: '#000000' },
        'ig-secondary': { bg: '#FAFAFA', dark: '#121212' },
        'ig-elevated': { bg: '#FFFFFF', dark: '#1C1C1C' },
        'ig-border': '#DBDBDB',
        'ig-border-dark': '#262626',
        'ig-text': { primary: '#000000', secondary: '#737373', 'dark-primary': '#F5F5F5', 'dark-secondary': '#A8A8A8' },
        'ig-blue': '#0095F6',
        'ig-blue-hover': '#1877F2',
        'ig-red': '#FF3040',
        'ig-green': '#00BA88',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      screens: {
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
};
