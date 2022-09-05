/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    container: {
      center: true,
      padding: "5rem",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
