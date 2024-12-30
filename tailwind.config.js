/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './custom-components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        "circling": "circling var(--duration, 20s) linear infinite",
      },
      keyframes: {
        "circling": {
          "0%": {
            transform:
              "rotate(calc(var(--offset, 0) * 1deg)) translateX(calc(var(--radius, 150px))) rotate(calc(var(--offset, 0) * -1deg))",
          },
          "100%": {
            transform:
              "rotate(calc(360deg + (var(--offset, 0) * 1deg))) translateX(calc(var(--radius, 150px))) rotate(calc(-360deg + (var(--offset, 0) * -1deg)))",
          },
        },
      },
    },
  },
  plugins: [],
} 