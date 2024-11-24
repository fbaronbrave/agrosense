import animations from '@midudev/tailwind-animations'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,astro}",
    "./components/**/*.{ts,tsx,astro}",
    "./app/**/*.{ts,tsx,astro,js}",
    "./src/**/*.{ts,tsx,astro,css,js}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f68909",
          50: "#fffbed",
          100: "#fff6d4",
          200: "#ffe8a9",
          300: "#ffd672",
          400: "#feb939",
          500: "#fca013",
          600: "#f68909",
          700: "#c56509",
          800: "#9c4f10",
          900: "#7e4210",
          950: "#441f06",
        },
        secondary: {
          DEFAULT: "#20725F",
          50: "#f2fbf8",
          100: "#d2f5e8",
          200: "#a6e9d2",
          300: "#71d7b7",
          400: "#44bd9b",
          500: "#2ba182",
          600: "#20816a",
          700: "#20725f",
          800: "#1c5348",
          900: "#1b463c",
          950: "#0a2923",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography"), animations],
};
