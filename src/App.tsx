import { useEffect } from "react";
import type { ReactNode } from "react";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { ZapFlutuante } from "./components/ZapFlutuante";
import { useReveal } from "./components/ui/Reveal";
import { ligaPonteDoZap } from "./lib/zap";
import { ligaRolagem } from "./lib/rolagem";

export type Rota = "inicio" | "bastidores";

export const rotaDe = (caminho: string): Rota => (caminho.replace(/\/+$/, "") === "/bastidores" ? "bastidores" : "inicio");

/** A casca comum. A página vem de fora: main.tsx carrega os bastidores só quando precisa. */
export default function App({ rota, children }: { rota: Rota; children: ReactNode }) {
  useReveal();
  useEffect(ligaPonteDoZap, []);
  useEffect(ligaRolagem, []);

  return (
    <div className="relative" data-rota={rota}>
      <div className="grao" aria-hidden />
      <div className="vinheta" aria-hidden />
      <a href="#conteudo" className="pular">
        Pular para o conteúdo
      </a>
      <Nav rota={rota} />
      <main id="conteudo">{children}</main>
      <Footer rota={rota} />
      <ZapFlutuante />
    </div>
  );
}
