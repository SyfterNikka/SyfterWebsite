// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scrollUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      animation: {
        scrollUp: 'scrollUp 10s linear infinite',
      },
      colors: {
        syfterBlue: '#69bdff',
        darkBlue: '#1e3a5f',
        midBlue: '#3b82f6',
      },
    },
  },
  plugins: [],
};
