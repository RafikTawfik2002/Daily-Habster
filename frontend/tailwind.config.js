/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      borderWidth: {
        '0.3': '0.3px',  // Custom class for 0.5px border width
      },
      lineHeight: {
        'extra-tight': '0.9', // Custom value smaller than 1
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

