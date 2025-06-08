/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",
        secondary: "#3b82f6",
        accent: "#fbbf24",
        success: "#22c55e",
        danger: "#ef4444",
      },
    },
  },
  plugins: [],
};
