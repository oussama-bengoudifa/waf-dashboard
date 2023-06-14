/** @type {import('tailwindcss').Config} */

const themeConstants = {
  paper: "#FFFFFF",
  primary: "#2A564E",
  primaryDark: "#22453E",
  secondary: "#9E9E9E",
  black: "#000000",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: themeConstants.paper,
        primary: themeConstants.primary,
        primaryDark: themeConstants.primaryDark,
        secondary: themeConstants.secondary,
        black: themeConstants.black,
      },
    },
  },
  plugins: [],
};
