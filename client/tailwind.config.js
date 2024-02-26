/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        stroke: '0 0 0 4px rgba(255, 255, 255, 0.5)', // Adjust the color and size as needed
      }
    },
  },
  plugins: [],
}

