/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '*': { boxSizing: 'border-box' },
        '*':{overflow:'overflow-x-hidden'},
        '::before': { boxSizing: 'border-box' },
        '::after': { boxSizing: 'border-box' },
      });
    },
  ],
}

