/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#10b981",
          600: "#059669",
        },
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        ticker: "ticker 22s linear infinite",
      },
      boxShadow: {
        glow: "0 0 30px rgba(16, 185, 129, 0.35)",
      },
    },
  },
  plugins: [],
};
