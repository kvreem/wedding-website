/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        "circling": "circling calc(var(--duration)*1s) linear infinite",
      },
      keyframes: {
        "circling": {
          "0%": {
            transform:
              "rotate(calc(var(--offset) * 1deg)) translateX(var(--radius)) rotate(calc(var(--offset) * -1deg))",
          },
          "100%": {
            transform:
              "rotate(calc(360deg + (var(--offset) * 1deg))) translateX(var(--radius)) rotate(calc(-360deg + (var(--offset) * -1deg)))",
          },
        },
      },
    },
  },
  plugins: [],
} 