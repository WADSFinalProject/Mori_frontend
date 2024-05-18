/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      width: {
        custom: "150rem", // Custom width
      },
      height: {
        custom: "150rem", // Custom height
      },
      fontFamily: {
        vietnam: ['"Be Vietnam Pro"', "sans-serif"], // Custom font family
      },
      spacing: {
        90: "90px", // Define custom spacing value for `90px`
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(-100%)" }, // Starts from the left of the screen
          "100%": { transform: "translateX(0%)" }, // Moves to cover the screen
        },
      },
      animation: {
        slideInRight: "slideInRight 0.5s ease-out forwards",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"), // Flowbite plugin
  ],
};
