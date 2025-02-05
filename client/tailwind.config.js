/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Raleway']
      },
      boxShadow: {
        'navLink': '0 0 20px 10px rgb(20 184 166) !important;'
      }
    },
  },
  plugins: [],
}

