import { Hero } from "../components/Hero";
import { Dia } from "../components/Dia";
import { Testa } from "../components/Testa";
import { Casos } from "../components/Casos";
import { Como } from "../components/Como";
import { Preco } from "../components/Preco";
import { Arthur } from "../components/Arthur";
import { Duvidas } from "../components/Duvidas";
import { Contato } from "../components/Contato";

/**
 * A página de quem contrata. A ordem é a da conversa de venda: a promessa,
 * o dia dele, ele testando, a prova, como funciona, quanto custa, quem faz,
 * as dúvidas, o convite.
 */
export function Inicio() {
  return (
    <>
      <Hero />
      <Dia />
      <Testa />
      <Casos />
      <Como />
      <Preco />
      <Arthur />
      <Duvidas />
      <Contato />
    </>
  );
}
