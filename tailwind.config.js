/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rose-gold': '#B76E79',
        'rose-gold-dark': '#9B5A63',
        'rose-gold-light': '#D4949D',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Josefin Sans', 'Segoe UI', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-rose': 'linear-gradient(135deg, #B76E79 0%, #9B5A63 100%)',
      },
      fontSize: {
        'heading-1': ['3.5rem', { lineHeight: '1.2' }],
        'heading-2': ['2.5rem', { lineHeight: '1.3' }],
        'heading-3': ['1.875rem', { lineHeight: '1.4' }],
      },
      boxShadow: {
        'elegance': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'card': '0 10px 30px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
