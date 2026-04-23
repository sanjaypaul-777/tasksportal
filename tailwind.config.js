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
        vault: "#0a0e17",
        neon: "#00f2ff",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Montserrat", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(16, 185, 129, 0.35)",
        neon: "0 0 32px rgba(0, 242, 255, 0.35), 0 0 64px rgba(0, 242, 255, 0.12)",
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
    },
  },
  plugins: [],
};
