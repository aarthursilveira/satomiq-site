/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F4F1EC",
        "paper-2": "#ECE7DF",
        ink: "#141414",
        "ink-soft": "#2A2A2A",
        // único acento — vermelho "red-team", dessaturado (não neon)
        accent: {
          DEFAULT: "#C8462F",
          soft: "#D9694F",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "serif"],
        sans: ['"Geist"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        eyebrow: "0.28em",
      },
      boxShadow: {
        // sombras tingidas no tom do fundo (nunca preto duro)
        paper: "0 30px 60px -28px rgba(20,20,20,0.18)",
        lift: "0 40px 80px -34px rgba(20,20,20,0.28)",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
