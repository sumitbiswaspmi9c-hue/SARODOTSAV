/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sharodiya: {
          dark: '#0B0707',
          maroon: '#180B0D',
          crimson: '#6B141C',
          gold: '#D4AF37',
          'gold-muted': '#B38F4D',
          'gold-light': '#E8D2A6',
          cream: '#F7F4EB',
          ivory: '#EDE7D9',
          border: 'rgba(212, 175, 55, 0.18)',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Cinzel', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        bengali: ['"Hind Siliguri"', '"Tiro Bangla"', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.35em',
        'mega-wide': '0.5em',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
