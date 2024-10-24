/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "primary": ['Rammetto One', 'sans-serif']
      },
      backgroundImage: {
         'squares': "url('./assets/square.png')"
      }
    },
  },
  plugins: [],
}