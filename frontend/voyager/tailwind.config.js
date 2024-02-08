/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      esm: "300px",
      sm: "480px",
      emd: "600px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    extend: {},
  },
  plugins: [],
};
