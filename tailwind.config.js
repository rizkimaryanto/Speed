/** @type {import('tailwindcss').Config} */
export default {
  content: ["*"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  safelist: [
    "text-white",
    "text-3xl",
    "font-bold",
    "absolute",
    "top-1/2",
    "left-1/2",
    "-translate-x-1/2",
    "-translate-y-1/2",
  ],
};
