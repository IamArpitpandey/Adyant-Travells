/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E4C97B',
          dark: '#A07830',
        },
        royal: {
          DEFAULT: '#1a0a2e',
          purple: '#2D1B69',
          soft: '#4A3580',
        },
        cream: '#FDF6EC',
        colors: {
          primary: '#111827',
          secondary: '#FACC15',
        }
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Jost', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { transform: 'translateY(20px)', opacity: 0 }, to: { transform: 'translateY(0)', opacity: 1 } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      backgroundImage: {
        'royal-gradient': 'linear-gradient(135deg, #1a0a2e 0%, #2D1B69 50%, #4A3580 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E4C97B 50%, #A07830 100%)',
      }
    },
  },
  plugins: [],
};
