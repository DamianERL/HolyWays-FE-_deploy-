/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary :'#C32424',
        psecond :'#E8E8E8',
        pthird :'#FF416C',
      },
    },
  },
  plugins: [],
}