/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: 14,
        sm: 16,
        md: 18,
        lg: 20,
        xl: 24,
        "2xl": 32,
      },
      colors: {
        "gray-900": "#121214",
        "gray-800": "#202024",
        "gray-700": "#4F4F4F",
        "gray-400": "#7C7C8A",
        "gray-200": "#C4C4CC",
        "gray-100": "#e1e1e6",

        "cyan-500": "#81D8F7",
        "cyan-300": "#AEE4F8",

        "green-600": "#27AE60",
        "green-500": "#51BB7A",

        "palm-900": "#678433",
        "palm-700": "#789B3D",
        "palm-500": "#89B045",
      },
      fontFamily: {
        sans: "Inter, sans-serif",
        display: "Fredoka, sans-serif",
      },
       backgroundImage: {
        'joinUs': "url('./dist/assets/images/banner_joinUs.jpeg')",
        'homePromotional-1' : "url('./dist/assets/images/header_slide_2.jpg')"
                           
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
