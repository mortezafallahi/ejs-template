/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ejs,html,js}"],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "1rem",
        },
        center: true,
      },

      fontFamily: {
        primary: ["YekanBakh", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        light: {
          // sample color
          primary: "#F7941D",
          "primary-content": "#fff",
          secondary: "#F35858",
          "secondary-content": "#fff",
        },
      },
    ],
  },
};
