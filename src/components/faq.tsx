import type { Idioma } from "@/lib/idiomas";
import { faqJsonLd, type ParFaq } from "@/lib/seo";
import { textos } from "@/lib/textos";

import { JsonLd } from "./json-ld";

/**
 * Preguntas frecuentes con su marcado.
 *
 * Se usa `<details>` nativo: se abre sin JavaScript, el navegador ya gestiona
 * el teclado y —lo importante— el texto de la respuesta está en el HTML
 * aunque esté plegado, así que un buscador lo lee.
 */
export function Faq({
  preguntas,
  idioma,
  titulo,
}: {
  preguntas: ParFaq[];
  idioma: Idioma;
  titulo?: string;
}) {
  if (preguntas.length === 0) return null;
  const encabezado = titulo ?? textos(idioma).faq.titulo;

  return (
    <section aria-labelledby="faq">
      <JsonLd datos={faqJsonLd(preguntas)} />

      <h2 id="faq" className="font-display text-2xl font-semibold text-texto sm:text-3xl">
        {encabezado}
      </h2>

      <div className="mt-6 divide-y divide-borde border-y border-borde">
        {preguntas.map((p) => (
          <details key={p.pregunta} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left font-medium text-texto marker:content-none">
              <span>{p.pregunta}</span>
              <svg
                viewBox="0 0 20 20"
                className="mt-1 h-4 w-4 shrink-0 text-texto-tenue transition-transform group-open:rotate-45"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path strokeLinecap="round" d="M10 4v12M4 10h12" />
              </svg>
            </summary>
            <p className="pb-5 pr-8 leading-relaxed text-texto-suave">{p.respuesta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
