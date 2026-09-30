// Gera src/lib/diario.json a partir dos repositórios que moram ao lado deste.
//
//   node scripts/diario.mjs
//
// Roda na máquina do Arthur, não no build da VPS: lá os repositórios não
// existem. O JSON gerado é commitado junto. Quando os repos estiverem no GitHub
// com token de leitura, isto vira uma chamada de API no build.
//
// Commit menciona cliente pelo nome e variável de ambiente pelo nome. Nada
// disso pode ir pro ar: a mensagem só entra se passar pelo filtro abaixo.
import { execFileSync } from "node:child_process";
import { writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(aqui, "..", "..");

// pasta → nome público
const REPOS = {
  maarkio: "maarkio",
  "nectar-backend": "nectarq",
  "nectar-painel": "nectarq",
  gluten: "gluten",
  uo: "outreach",
  up: "outreach",
  "ai-cockpit": "cockpit",
  "sih-modas": "sih",
  "satomiq-site": "este site",
};

const DESDE = "2026-04-01";

// Nome de gente, de cliente, e qualquer coisa com cara de segredo.
const PROIBIDO = [
  /tain[aá]/i,
  /caselatto/i,
  /dombe/i,
  /pizzaria/i,
  /\b[A-Z][A-Z0-9]*_[A-Z0-9_]+\b/, // NOME_DE_ENV
  /token|senha|secret|password|\bkey\b|\.env/i,
  /^merge\b/i,
  /^wip\b/i,
];

const log = (pasta) => {
  const dir = resolve(raiz, pasta);
  if (!existsSync(resolve(dir, ".git"))) return [];
  const saida = execFileSync("git", ["-C", dir, "log", `--since=${DESDE}`, "--no-merges", "--format=%cs%x09%s"], {
    encoding: "utf8",
  });
  return saida
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      const [data, ...resto] = l.split("\t");
      return { repo: REPOS[pasta], data, msg: resto.join("\t").trim() };
    });
};

const todos = Object.keys(REPOS).flatMap(log).sort((a, b) => (a.data < b.data ? 1 : -1));

const porDia = {};
const porRepo = {};
for (const c of todos) {
  porDia[c.data] = (porDia[c.data] ?? 0) + 1;
  porRepo[c.repo] = (porRepo[c.repo] ?? 0) + 1;
}

const limpa = (m) => m.replace(/\s*\((?:A|B|F|M)\d[^)]*\)\s*$/, "").replace(/\s+/g, " ");
const recentes = todos
  .filter((c) => !PROIBIDO.some((re) => re.test(c.msg)))
  .map((c) => ({ ...c, msg: limpa(c.msg) }))
  .filter((c) => c.msg.length >= 18 && c.msg.length <= 110)
  .slice(0, 40);

const json = {
  geradoEm: new Date().toISOString().slice(0, 10),
  desde: DESDE,
  total: todos.length,
  porRepo,
  porDia,
  recentes,
};

writeFileSync(resolve(aqui, "..", "src", "lib", "diario.json"), JSON.stringify(json, null, 2) + "\n");
console.log(`diario: ${todos.length} commits, ${recentes.length} mensagens publicáveis`);
