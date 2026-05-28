/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        elec: '#0ea5e9',
        gold: '#f59e0b',
        navy: '#050d1a',
      },
      animation: {
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        spotlight: {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -40%) scale(1)' },
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
        logo: ['Syncopate', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

