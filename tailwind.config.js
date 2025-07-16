// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Add this line just in case (for /app directory support)
  ],
  theme: {
    extend: {}, // Always leave this for future utility extension
  },
  plugins: [],
};
