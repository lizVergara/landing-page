/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-bg": "#111317",
        "form-bg": "#1A1D24",
        "input-bg": "#272A33",
        secondary: "#9396A5",
        "button-color": "#FCB115",
        "modal-bg": "#435260",
        "white-text": "#e4e2e2",
        light: "#d7dde3",
      },
      animation: {
        spin: "spin 1s linear infinite",
      },
    },
  },
  plugins: [],
};
