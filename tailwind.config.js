/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
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
      backgroundImage: {
        "header-img": "url('./assets/images/headerbg.svg')",
      },
      colors: {
        white: "#ffff",
        "first-primary": "#1A637D",
        black: "#000000",
        primary: "#2FB3E3",
        pri1: "#EAF7FC",
        pri9: "#1C6B88",
        sec10: "#06212B",
        darkblue: "#1A6884",
        background:
          "linear-gradient(90deg, rgba(47,179,227,1) 0%, rgba(26,104,132,1) 100%",
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
  plugins: [require("tailwindcss-animate")],
};

export default config;