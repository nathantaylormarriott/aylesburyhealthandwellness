/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        /* Gradient sweep inspired by the-big-green-tent SupportFab shimmer */
        'book-now-shimmer': {
          '0%': { transform: 'translate3d(-130%, 0, 0) skewX(-12deg)' },
          '45%': { transform: 'translate3d(230%, 0, 0) skewX(-12deg)' },
          '55%, 100%': { transform: 'translate3d(230%, 0, 0) skewX(-12deg)' },
        },
      },
      animation: {
        'book-now-shimmer': 'book-now-shimmer 3.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
