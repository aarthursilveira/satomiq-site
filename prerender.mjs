// Escreve o HTML de verdade dentro do dist/index.html.
//
// Motivo medido: satomiq.com no ar devolvia só o <title>. Um SPA entrega
// casca vazia, e a primeira passada do Google (e TODO leitor de link,
// inclusive o do WhatsApp) só lê o HTML bruto.
import { readFileSync, writeFileSync } from "node:fs";

const { render, pendencias } = await import("./dist-ssr/entry-server.js");
const casca = readFileSync("dist/index.html", "utf8");

const ALVO = '<div id="root"></div>';
if (!casca.includes(ALVO)) throw new Error("âncora do root não encontrada no dist/index.html");

const corpo = render();
if (corpo.length < 4000) throw new Error(`HTML renderizado curto demais (${corpo.length} bytes)`);
writeFileSync("dist/index.html", casca.replace(ALVO, `<div id="root">${corpo}</div>`));
console.log(`prerender: dist/index.html · ${(corpo.length / 1024).toFixed(1)} KB de HTML`);

// O que ainda falta pro site ficar completo (src/material.ts).
const falta = pendencias();
if (falta.length) console.log(`\nmaterial pendente (${falta.length}):\n${falta.map((f) => `  · ${f}`).join("\n")}\n`);
