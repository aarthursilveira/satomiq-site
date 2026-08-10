import { ARTHUR_BIO, LINKS } from "../lib/content";
import { Secao } from "./ui/Secao";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";

/**
 * O nome dele é um <h2> de verdade e aparece no JSON-LD como Person — é assim
 * que "Arthur Silveira" entra no índice, não com a palavra escondida no rodapé.
 */
export function Arthur() {
  return (
    <Secao id="arthur" rotulo={ARTHUR_BIO.eyebrow}>
      <Reveal>
        <h2 className="text-[clamp(1.9rem,4.2vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-paper">
          {ARTHUR_BIO.nome}
        </h2>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-cobre">
          {ARTHUR_BIO.papel}
        </p>
        <div className="mt-9 flex max-w-[62ch] flex-col gap-5 text-[1.05rem] leading-relaxed text-mist">
          {ARTHUR_BIO.paragrafos.map((t) => (
            <p key={t.slice(0, 24)}>{t}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button href={LINKS.contato} variant="ghost" icon="whatsapp">
            {ARTHUR_BIO.cta}
          </Button>
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-sea transition-colors hover:text-paper"
          >
            {LINKS.instagramHandle}
          </a>
        </div>
      </Reveal>
    </Secao>
  );
}
