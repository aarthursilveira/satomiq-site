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
        // Borda que DEFINE um componente precisa de 3:1 (WCAG 1.4.11).
        // O #36585A antigo dava 2,26:1 sobre ink e 2,03:1 sobre surface — nunca
        // tinha sido medido, porque a rodada 02 só mediu cor de texto.
        line: "#4A797C", // borda estrutural · 3,62:1 ink · 3,25:1 surface
        linesoft: "#36585A", // régua decorativa (separa, não delimita)
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
      // Uma escala só. Antes eram treze tamanhos avulsos escritos direto na
      // classe — 1,6 e 1,75rem para o mesmo h3, 0,9 / 0,94 / 1 / 1,05 para o
      // mesmo parágrafo. Diferença que ninguém lê como intenção, só como ruído.
      // Razão ~1,35 entre os três níveis de manchete.
      fontSize: {
        display: ["clamp(2.5rem,7.5vw,5.6rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        fecho: ["clamp(2.2rem,5.6vw,4.2rem)", { lineHeight: "1.0", letterSpacing: "-0.035em" }],
        secao: ["clamp(1.9rem,4.2vw,3.1rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        citacao: ["clamp(1.25rem,2.4vw,1.7rem)", { lineHeight: "1.35", letterSpacing: "-0.02em" }],
        cartao: ["1.7rem", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
        tese: ["1.15rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        corpo: ["1.05rem", { lineHeight: "1.7" }],
        miudo: ["0.94rem", { lineHeight: "1.65" }],
        rotulo: ["11px", { lineHeight: "1.5" }],
        botao: ["12px", { lineHeight: "1" }],
      },
      letterSpacing: {
        eyebrow: "0.14em",
        botao: "0.12em",
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
