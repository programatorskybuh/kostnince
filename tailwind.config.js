/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors:{
        bila: "#FFFDE4",
        fialova: "#382985"
      }
    },
  },
  plugins: [],
}

