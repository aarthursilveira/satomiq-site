/** @type {import('tailwindcss').Config} */
// Tokens espelhados de Documents/arthursilveira-ai/remotion/src/theme.ts —
// a marca do perfil profissional. Nenhum hex fora daqui (e do index.css, que
// repete os mesmos valores em variável CSS pro que o Tailwind não alcança).
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0907", // preto quente, nunca #000
        panel: "#1A1512",
        terminal: "#120F0C",
        border: "#2A231C",
        latao: "#A78D51", // acento: a palavra-herói, o que importa
        tijolo: "#B0553C", // fricção, erro, o que dói
        oliva: "#8A9147", // sucesso
        azul: "#6E8FA8", // sistema, meta, link
        texto: "#FFFFFF",
        creme: "#D9CFB8", // conector, apoio
        dim: "#8E8371", // apagado · 5,2:1 sobre bg
        ghost: "#3E362C", // ilegível DE PROPÓSITO
        // superfícies que só existem dentro das ilustrações (celular, comanda, painel)
        aparelho: "#16110D", // carcaça do celular
        moldura: "#2F271F", // aro do celular
        ilha: "#060504", // a ilha da câmera
        tracejado: "#3A3129", // borda de horário livre, caixa vazia
        notificacao: "#2A221B", // cartão de notificação na tela de bloqueio
        papel: "#F4EFE4", // comanda térmica
        "papel-oliva": "#5F6431", // "PIX ✓" impresso: oliva escurecido pra ler no papel
        realce: "#2A2216", // cartão escolhido (latão sobre panel, opaco)
        "realce-leve": "#211B16", // hover do cartão
      },
      fontFamily: {
        // Roboto Flex: a palavra-herói. Largura e peso são o argumento.
        flex: ['"Roboto Flex"', '"Arial Narrow"', "system-ui", "sans-serif"],
        // Recursive: um arquivo, dois papéis. MONO 0 é o corpo, MONO 1 é a máquina.
        sans: ['"Recursive"', "system-ui", "sans-serif"],
        mono: ['"Recursive"', "ui-monospace", "Consolas", "monospace"],
        // Recursive CASL 1: o Arthur falando.
        gente: ['"Recursive Casual"', "system-ui", "sans-serif"],
        // Instrument Serif itálico: o humano, o nome, a pausa.
        serif: ['"Instrument Serif"', "Georgia", "serif"],
      },
      fontSize: {
        rotulo: ["12px", { lineHeight: "1.5" }],
        miudo: ["0.9rem", { lineHeight: "1.6" }],
        corpo: ["1.05rem", { lineHeight: "1.7" }],
        conector: ["clamp(1.15rem,2.2vw,1.6rem)", { lineHeight: "1.3" }],
        titulo: ["clamp(3.2rem,11vw,9rem)", { lineHeight: "0.86", letterSpacing: "-0.03em" }],
      },
      letterSpacing: {
        eyebrow: "0.14em",
      },
      maxWidth: {
        pagina: "1240px",
      },
    },
  },
  plugins: [],
};
