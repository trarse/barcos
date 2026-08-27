"use client";

/**
 * Alterna el tema.
 *
 * No guarda el tema en estado de React a propósito. La fuente de la verdad es
 * el atributo `data-tema` del documento, que el script del layout ya ha puesto
 * antes de pintar; leerlo en un efecto para copiarlo al estado provocaría un
 * render en cascada y, peor, un desajuste de hidratación.
 *
 * Los dos iconos se pintan siempre y es el CSS quien enseña el que toca, con
 * la misma lógica de tres estados que los tokens de color.
 */
export function BotonTema() {
  function alternar() {
    const raiz = document.documentElement;
    const actual =
      raiz.dataset.tema ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "oscuro" : "claro");
    const siguiente = actual === "oscuro" ? "claro" : "oscuro";

    raiz.dataset.tema = siguiente;
    try {
      localStorage.setItem("tema", siguiente);
    } catch {
      // Navegación privada: el tema vale para esta sesión y ya está.
    }
  }

  return (
    <button
      type="button"
      onClick={alternar}
      className="rounded-md p-2 text-texto-suave transition-colors hover:bg-superficie-alt hover:text-texto"
      aria-label="Cambiar entre tema claro y oscuro"
    >
      <IconoSol />
      <IconoLuna />
    </button>
  );
}

function IconoSol() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="icono-claro h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="3.6" />
      <path
        strokeLinecap="round"
        d="M10 1.6v2M10 16.4v2M18.4 10h-2M3.6 10h-2M15.9 4.1l-1.4 1.4M5.5 14.5l-1.4 1.4M15.9 15.9l-1.4-1.4M5.5 5.5L4.1 4.1"
      />
    </svg>
  );
}

function IconoLuna() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="icono-oscuro h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path strokeLinejoin="round" d="M17 12.3A7.4 7.4 0 0 1 7.7 3a7.4 7.4 0 1 0 9.3 9.3Z" />
    </svg>
  );
}
