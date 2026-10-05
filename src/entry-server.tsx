import { renderToString } from "react-dom/server";
import App from "./App";
import type { Rota } from "./App";
import { Inicio } from "./paginas/Inicio";
import { Bastidores } from "./paginas/Bastidores";

export { pendencias } from "./lib/material";

/** Usado só no build, por prerender.mjs. Nunca entra no bundle do cliente. */
export function render(rota: Rota) {
  return renderToString(<App rota={rota}>{rota === "bastidores" ? <Bastidores /> : <Inicio />}</App>);
}
