import diario from "../lib/diario.json";
import { DIARIO_TXT } from "../conteudo";
import { Janela } from "./Janela";

// ──────────────────────────────────────────────────────────────
// O diário: um ponto por dia, do primeiro commit ao dia em que o JSON foi
// gerado (scripts/diario.mjs). Semanas em colunas, de domingo a sábado nas
// linhas, como a grade de contribuições do GitHub, só que em pontos, que é
// a régua do site inteiro.
//
// A lista embaixo são as mensagens de commit de verdade, que já passaram
// pelo filtro de nome de cliente do script. O Gluten (delivery) não é mais
// oferta do site, então as mensagens dele ficam fora da lista; os commits
// continuam contando no total, porque foram trabalho de verdade.
// ──────────────────────────────────────────────────────────────

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const NOME_REPO: Record<string, string> = { maarkio: "maarkio", nectarq: "bela", "este site": "site", cockpit: "cockpit", sih: "sih", outreach: "outreach" };

type Dia = { iso: string; n: number; mes: number; dia: number } | null;

function montaGrade() {
  const chaves = Object.keys(diario.porDia).sort();
  const porDia = diario.porDia as Record<string, number>;
  const inicio = new Date(`${chaves[0] ?? diario.desde}T12:00:00Z`);
  const fim = new Date(`${diario.geradoEm}T12:00:00Z`);
  // Volta até o domingo, pra cada coluna ser uma semana inteira.
  const cursor = new Date(inicio);
  cursor.setUTCDate(cursor.getUTCDate() - cursor.getUTCDay());
  const semanas: Dia[][] = [];
  while (cursor <= fim) {
    const semana: Dia[] = [];
    for (let d = 0; d < 7; d++) {
      const iso = cursor.toISOString().slice(0, 10);
      semana.push(cursor < inicio || cursor > fim ? null : { iso, n: porDia[iso] ?? 0, mes: cursor.getUTCMonth(), dia: cursor.getUTCDate() });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    semanas.push(semana);
  }
  return semanas;
}

const SEMANAS = montaGrade();
const nivel = (n: number) => (n === 0 ? 0 : n <= 2 ? 1 : n <= 5 ? 2 : n <= 9 ? 3 : 4);
// Pra quem não é dev, o prefixo "feat(widget):" é ruído: fica só a frase. Os
// commits de documentação saem da lista pelo mesmo motivo.
const RECENTES = diario.recentes
  .filter((c) => c.repo !== "gluten" && !/^docs\b/.test(c.msg))
  .map((c) => ({ ...c, msg: c.msg.replace(/^\w+(\([^)]*\))?!?:\s*/, "") }))
  .slice(0, 9);
const curta = (iso: string) => iso.split("-").reverse().slice(0, 2).join("/");

export function Diario() {
  return (
    <Janela titulo={DIARIO_TXT.janela} className="diario-janela">
      <div className="diario-grade" role="img" aria-label={`Um ponto por dia de trabalho, de ${DIARIO_TXT.rodape}. ${diario.total} alterações de código no total.`}>
        <div className="diario-meses" aria-hidden="true" style={{ "--semanas": SEMANAS.length } as React.CSSProperties}>
          {SEMANAS.map((s, i) => {
            // O mês aparece na semana em que ele começa (ou na primeira coluna).
            const vira = s.find((d) => d && (d.dia === 1 || i === 0));
            return <span key={i}>{vira ? MESES[vira.mes] : ""}</span>;
          })}
        </div>
        <div className="diario-pontos" aria-hidden="true" style={{ "--semanas": SEMANAS.length } as React.CSSProperties}>
          {SEMANAS.map((s, i) => (
            <div key={i} className="diario-semana">
              {s.map((d, j) => (
                <i key={j} className={d ? `n${nivel(d.n)}` : "fora"} title={d && d.n ? `${curta(d.iso)}: ${d.n}` : undefined} data-diario-ponto="" />
              ))}
            </div>
          ))}
        </div>
      </div>
      <ol className="diario-lista">
        {RECENTES.map((c, i) => (
          <li key={i}>
            <time dateTime={c.data}>{curta(c.data)}</time>
            <span className="diario-repo">{NOME_REPO[c.repo] ?? c.repo}</span>
            <span className="diario-msg">{c.msg}</span>
          </li>
        ))}
      </ol>
      <p className="diario-pe">
        <span>{DIARIO_TXT.rodape}</span>
        <span className="diario-escala" aria-hidden="true">
          menos <i className="n1" /><i className="n2" /><i className="n3" /><i className="n4" /> mais
        </span>
      </p>
    </Janela>
  );
}

/** As três últimas mensagens, pra janela do topo. */
export const ULTIMOS = RECENTES.slice(0, 4).map((c) => ({ data: curta(c.data), repo: NOME_REPO[c.repo] ?? c.repo, msg: c.msg }));
