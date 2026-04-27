/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5d7',
          100: '#ffefb8',
          200: '#ffe999',
          300: '#ffe37a',
          400: '#ffdd5b',
          500: '#feb300',
          600: '#e5a200',
          700: '#cc9000',
          800: '#b37f00',
          900: '#996d00',
        },
        accent: {
          50: '#ffaaab',
          100: '#ff9a9b',
          200: '#ff8a8b',
          300: '#ff7a7b',
          400: '#ff6a6b',
          500: '#ff5e6c',
          600: '#e65462',
          700: '#cc4a58',
          800: '#b3404e',
          900: '#993644',
        },
        beige: '#fff5d7',
        coral: '#ff5e6c',
        yellow: '#feb300',
        pink: '#ffaaab',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(254, 179, 0, 0.5), 0 0 10px rgba(254, 179, 0, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(254, 179, 0, 0.8), 0 0 30px rgba(254, 179, 0, 0.5)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
