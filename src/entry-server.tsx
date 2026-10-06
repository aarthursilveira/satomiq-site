import { renderToString } from "react-dom/server";
import App from "./App";

export { pendencias } from "./material";

/** Usado só no build, por prerender.mjs. Nunca entra no bundle do cliente. */
export function render() {
  return renderToString(<App />);
}
