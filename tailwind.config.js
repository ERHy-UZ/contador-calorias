/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coffee' : {
          100: '#E9E2DE',
          200: '#D3C3BC',
          300: '#4C2936',
          400: '#45242D',
          500: '#28151C'
        },
        'panter': '#D2ADE7',
        'neon': '#C8F230',
        'typeofblue': '#296CF2'
      },
      fontFamily: {
        dosis: ['Dosis', 'sans-serif'],
      },
      screens: {
        'tablet': '600px'
      },
    },
  },
  plugins: [],
}

