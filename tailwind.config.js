/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');


module.exports = {
  darkMode: 'class', // Enables class-based dark mode

  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add all relevant file types
  ],
  theme: {

    extend: {

      animation: {
        floating: 'floating 2.6s infinite linear',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
      transformOrigin: {
        '3d': '50% 50% 0',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
      perspective: {
        '1000': '1000px',
      },


      colors: {
        customRed: "#E23744", // Add a custom name for your color
        customWhite: "#F4F4F2", // Add a custom name for your color
      },
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'], // Add the Inter font
        poppins: ['"Poppins"', 'sans-serif'], // Add the Poppins font

        sui: ['"Sui Generis"', ...defaultTheme.fontFamily.sans],


      },
    },

  },
  plugins: [],
};
