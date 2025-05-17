/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-750': '#374151',
      },
      screens: {
        'xl': '1280px',
        '1.5xl': '1340px',
        '2xl': '1536px',
      },
      fontSize: {
        '2.5xl': '1.75rem',
        '3.5xl': '2.125rem',
        '4.5xl': '2.5rem',
        '5.5xl': '3.25rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem', // 120px
        '34': '8.5rem', // 136px
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};