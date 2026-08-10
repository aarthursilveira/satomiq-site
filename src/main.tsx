import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const raiz = document.getElementById("root")!;
const arvore = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// O build pré-renderiza o HTML: se já veio conteúdo do servidor, hidrata em vez
// de jogar fora e redesenhar. Se não veio (dev), monta do zero.
if (raiz.hasChildNodes()) hydrateRoot(raiz, arvore);
else createRoot(raiz).render(arvore);
