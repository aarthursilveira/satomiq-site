import React from "react";
import type { ReactNode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App, { rotaDe } from "./App";
import { Inicio } from "./paginas/Inicio";
import "./index.css";

const raiz = document.getElementById("root")!;
const rota = rotaDe(location.pathname);

// O build pré-renderiza o HTML: se já veio o HTML desta página, hidrata em vez
// de jogar fora e redesenhar. Se não veio (dev), ou veio o de outra página (um
// servidor que devolve o index.html pra toda rota), monta do zero.
function monta(pagina: ReactNode) {
  const arvore = (
    <React.StrictMode>
      <App rota={rota}>{pagina}</App>
    </React.StrictMode>
  );
  const veio = raiz.firstElementChild?.getAttribute("data-rota");
  if (veio === rota) hydrateRoot(raiz, arvore);
  else {
    raiz.textContent = "";
    createRoot(raiz).render(arvore);
  }
}

// Os bastidores (lab, diário, processo) são de outro público: quem chega pela
// página de venda não baixa nada disso.
if (rota === "bastidores") import("./paginas/Bastidores").then(({ Bastidores }) => monta(<Bastidores />));
else monta(<Inicio />);
