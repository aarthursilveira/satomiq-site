import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./estilo.css";

const raiz = document.getElementById("root")!;
const arvore = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// O build pré-renderiza o HTML (prerender.mjs): se ele veio, hidrata em vez
// de jogar fora e redesenhar. Em `npm run dev` não vem, e monta do zero.
if (raiz.firstElementChild) hydrateRoot(raiz, arvore);
else createRoot(raiz).render(arvore);
