/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        retro: ["Tahoma", "Verdana", "Arial", "sans-serif"],
      },
      boxShadow: {
        retro: "3px 3px 0 rgba(0, 0, 0, 0.45)",
      },
      colors: {
        retro: {
          desktop: "var(--retro-desktop)",
          titlebar: "var(--retro-titlebar)",
          gray: "var(--retro-window-gray)",
          light: "var(--retro-border-light)",
          dark: "var(--retro-border-dark)",
          text: "var(--retro-text)",
        },
      },
    },
  },
  plugins: [],
};
