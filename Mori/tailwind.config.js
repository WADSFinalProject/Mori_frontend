/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}",
  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  theme: {
    extend: {
      width: {
        'custom': '150rem', 
      },
      height: {
        'custom': '150rem', 
      },
      fontFamily: {
        vietnam: ['"Be Vietnam Pro"', "sans-serif"]
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
