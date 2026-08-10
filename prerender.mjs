// Escreve o HTML de verdade dentro do dist/index.html.
//
// Motivo medido: satomiq.com no ar hoje devolve só o <title> — um SPA entrega
// casca vazia, e a primeira passada do Google (e TODO scraper de link, incluindo
// o do WhatsApp) só lê o HTML bruto. A segunda passada, que executa JS, pode
// demorar horas ou dias.
import { readFileSync, writeFileSync } from "node:fs";

const { render } = await import("./dist-ssr/entry-server.js");
const html = readFileSync("dist/index.html", "utf8");
const corpo = render();

const ALVO = '<div id="root"></div>';
if (!html.includes(ALVO)) throw new Error("âncora do root não encontrada no dist/index.html");
if (corpo.length < 2000) throw new Error(`HTML renderizado curto demais (${corpo.length} bytes)`);

writeFileSync("dist/index.html", html.replace(ALVO, `<div id="root">${corpo}</div>`));
console.log(`prerender: ${(corpo.length / 1024).toFixed(1)} KB de HTML dentro do #root`);
