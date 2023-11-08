/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        'category-item-gradient':
          'linear-gradient(45deg, #5033C3 0%, rgba(80, 51, 195, 0.2) 100%)',
      },

      colors: {
        background: '#f6f6f6',
        primary: '#8162ff',
        accent: '#1a1a1a',
        'dark-background': '#0b0b0b',
        'dark-primary': '#5033C3',
        'light-accent': '#e8e8e8',
        'light-active-accent': '#b8b8b8',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
