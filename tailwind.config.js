const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ['Atkinson Hyperlegible', ...defaultTheme.fontFamily.sans],
        'header': ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      ...colors,
      'primary': {
        DEFAULT: '#F5BC92',
        50: '#FEF5EF',
        100: '#FCEADD',
        200: '#F8D3B7',
        300: '#F5BC92',
        400: '#F09C5F',
        500: '#EC7D2B',
        600: '#CC6113',
        700: '#99490E',
        800: '#653009',
        900: '#321805'
      },
      'secondary': {
        200: '#495765',
        400: '#36414F',
        600: '#293240',
        800: '#202836',
        900: '#161C25',
        950: '#10141B',
      }
    }
  },
  plugins: [],
}
