/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: 'var(--dark)',
        primary: 'var(--color-primary)'
      }
    },
    screens: {
      tablet: { max: '768px' }
    }
  },
  plugins: []
}
