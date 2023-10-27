/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Cinzel", "serif"],
      body: ["Fauna one", "serif"],
    },
    extend: {
      scale: {
        '60': '0.6',
        '65': '0.65',
        '80': '0.8',
        '85': '0.85',
      }
    }
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}