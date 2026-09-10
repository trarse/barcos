"use client";

/** Botón de imprimir/guardar PDF que desaparece al imprimir. */
export function BotonImprimir() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-md bg-acento px-5 py-2.5 font-medium text-white print:hidden"
    >
      Imprimir / Guardar PDF
    </button>
  );
}
