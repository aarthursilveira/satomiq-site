// Escreve o HTML de verdade dentro de cada página do dist/.
//
// Motivo medido: satomiq.com no ar devolvia só o <title> — um SPA entrega
// casca vazia, e a primeira passada do Google (e TODO scraper de link, incluindo
// o do WhatsApp) só lê o HTML bruto. A segunda passada, que executa JS, pode
// demorar horas ou dias.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const { render, pendencias } = await import("./dist-ssr/entry-server.js");
const casca = readFileSync("dist/index.html", "utf8");

const ALVO = '<div id="root"></div>';
if (!casca.includes(ALVO)) throw new Error("âncora do root não encontrada no dist/index.html");

const PAGINAS = [
  { rota: "inicio", arquivo: "dist/index.html" },
  {
    rota: "bastidores",
    arquivo: "dist/bastidores/index.html",
    titulo: "Bastidores · Arthur Silveira · SAtomiq",
    descricao: "Por dentro dos sistemas do Arthur Silveira: a decisão técnica de cada um, um lab de peças interativas e o diário de commits.",
    url: "https://satomiq.com/bastidores/",
  },
];

for (const p of PAGINAS) {
  const corpo = render(p.rota);
  if (corpo.length < 2000) throw new Error(`${p.rota}: HTML renderizado curto demais (${corpo.length} bytes)`);
  let html = casca.replace(ALVO, `<div id="root">${corpo}</div>`);
  if (p.titulo) {
    html = html
      .replace(/<title>[^<]*<\/title>/, `<title>${p.titulo}</title>`)
      .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${p.descricao}$2`)
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${p.url}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${p.url}$2`)
      .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${p.titulo}$2`);
  }
  mkdirSync(p.arquivo.replace(/\/[^/]+$/, ""), { recursive: true });
  writeFileSync(p.arquivo, html);
  console.log(`prerender: ${p.arquivo} · ${(corpo.length / 1024).toFixed(1)} KB de HTML`);
}

// O que ainda falta pro site ficar completo (lib/material.ts).
const falta = pendencias();
if (falta.length) console.log(`\nmaterial pendente (${falta.length}):\n${falta.map((f) => `  · ${f}`).join("\n")}\n`);
