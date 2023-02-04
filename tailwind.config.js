const defaultTheme = require('tailwindcss/defaultTheme')

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
    }
  },
  plugins: [],
}
