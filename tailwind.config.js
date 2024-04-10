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
    "w-1/3",
    "bg-purple-500",
    "text-center",
    "rounded",
    "absolute",
    "top-1/2",
    "top-1/3",
    "left-1/2",
    "-translate-x-1/2",
    "-translate-y-1/2",
  ],
};
