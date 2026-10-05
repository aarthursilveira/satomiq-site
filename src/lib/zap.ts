// ──────────────────────────────────────────────────────────────
// Ponte site → WhatsApp.
//
// Quem chega pelo Instagram está no navegador DE DENTRO do app. Ali um link
// wa.me não vira app: carrega a página intermediária do WhatsApp dentro do
// Instagram, e o "continuar para a conversa" cai no WhatsApp Web pedindo QR
// code. É o último passo do funil, o único que paga a conta.
//
// Nesses navegadores o clique tenta o esquema do app direto (whatsapp:// no
// iPhone, intent:// no Android). Se em 2,5s a página continuar na tela, o app
// não abriu: segue pro wa.me de sempre e lembra disso na sessão, pra não fazer
// a pessoa esperar de novo. Fora de app (Safari, Chrome, desktop) nada muda.
// ──────────────────────────────────────────────────────────────

export const NUMERO = "5519984185278"; // WhatsApp comercial (Arthur)

export const wa = (texto: string) => `https://wa.me/${NUMERO}?text=${encodeURIComponent(texto)}`;

const NO_APP = /Instagram|FBAN|FBAV|FB_IAB|Barcelona|Threads|musical_ly|BytedanceWebview|LinkedInApp/i;
const MEMORIA = "zap-direto-falhou";

const lembra = () => {
  try {
    sessionStorage.setItem(MEMORIA, "1");
  } catch {}
};
const jaFalhou = () => {
  try {
    return sessionStorage.getItem(MEMORIA) === "1";
  } catch {
    return false;
  }
};

/** Liga a ponte pra todo link wa.me da página. Devolve a função de desligar. */
export function ligaPonteDoZap() {
  const ua = navigator.userAgent;
  const android = /Android/i.test(ua);
  const iphone = /iPhone|iPad|iPod/i.test(ua);
  if (!NO_APP.test(ua) || !(android || iphone)) return () => {};

  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
    const link = (e.target as HTMLElement)?.closest<HTMLAnchorElement>('a[href^="https://wa.me/"]');
    if (!link || jaFalhou()) return;

    const url = new URL(link.href);
    const fone = url.pathname.replace(/\D/g, "");
    const texto = url.searchParams.get("text") ?? "";
    const q = `phone=${fone}&text=${encodeURIComponent(texto)}`;
    const direto = android
      ? `intent://send/?${q}#Intent;scheme=whatsapp;S.browser_fallback_url=${encodeURIComponent(link.href)};end`
      : `whatsapp://send?${q}`;

    e.preventDefault();
    let saiu = false;
    const marca = () => (saiu = true);
    const vigia = () => document.visibilityState === "hidden" && marca();
    document.addEventListener("visibilitychange", vigia);
    window.addEventListener("pagehide", marca, { once: true });
    window.addEventListener("blur", marca, { once: true });

    window.location.href = direto;
    window.setTimeout(() => {
      document.removeEventListener("visibilitychange", vigia);
      window.removeEventListener("pagehide", marca);
      window.removeEventListener("blur", marca);
      if (saiu) return;
      lembra();
      window.location.href = link.href;
    }, 2500);
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
