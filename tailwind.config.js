/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // AIMS brand = red (logo, active menu, links)
        brand: {
          50: "#fdecee",
          100: "#f9d3d7",
          500: "#c1121f",
          600: "#a20f1a",
          700: "#800b14",
        },
        // action buttons = green (Save / Search / Add)
        success: { 500: "#4a9d3f", 600: "#3f8a36", 700: "#356f2e" },
        // section title bars
        dark: { DEFAULT: "#2f3b4c", 700: "#26303e" },
        // form sub-headers
        teal: { 600: "#0d8a86", 700: "#0b716e" },
        sidebar: { DEFAULT: "#171a21", hover: "#242a36" },
        ink: "#0f172a",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,.06)",
      },
    },
  },
  plugins: [],
};
