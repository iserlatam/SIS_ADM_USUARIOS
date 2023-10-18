/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cake-blue': {
          900: '#1d6ab5',
          800: '#217bd2',
          700: '#358bdf',
          600: '#529ce4',
          500: '#6face8',
          400: '#8cbded',
          300: '#a8cdf1',
          200: '#c5def6',
          100: '#e2eefa',
          50: '#f9f9f9'
        }
      }
    }
  },
  variants: {
    borderWidth: ['responsive', 'hover', 'focus'],
  },
}

