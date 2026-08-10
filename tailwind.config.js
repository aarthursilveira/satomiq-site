/** @type {import('tailwindcss').Config} */
// Tokens espelhados de Documents/satomiq-brand/tokens.css.
// A marca é dark-first: o escuro é o padrão, não um "modo".
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // espinha estrutural — compartilhada pela família
        ink: "#141A1A", // fundo
        surface: "#1C2424", // cartão, 1ª elevação
        raised: "#26302F", // 2ª elevação, hover
        line: "#36585A", // régua e borda
        sea: "#7FA0A2", // rótulo, metadado · 6,25:1
        mist: "#B4C2C5", // texto secundário · 9,61:1
        paper: "#DDE5E7", // texto principal · 13,78:1

        // acentos — um por marca, NUNCA misturados na mesma dobra
        cobre: "#BC784B", // SAtomiq, institucional · 4,97:1
        latao: "#D9A43D", // Maarkio · 7,82:1
        aco: "#5E8ECC", // Nectarq · 5,21:1

        ok: "#6FA986",
        warn: "#C9A24B",
        bad: "#C9635B",
      },
      fontFamily: {
        sans: ['"Geist"', "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        eyebrow: "0.16em",
      },
      keyframes: {
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
      },
    },
  },
  plugins: [],
};
