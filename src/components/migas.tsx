import Link from "next/link";

import { migasJsonLd, type Miga } from "@/lib/seo";

import { JsonLd } from "./json-ld";

/**
 * Migas de pan visibles y su JSON-LD, siempre juntos: marcar una jerarquía que
 * el usuario no ve es justo lo que penaliza un buscador.
 */
export function Migas({ migas }: { migas: Miga[] }) {
  return (
    <>
      <JsonLd datos={migasJsonLd(migas)} />
      <nav aria-label="Migas de pan">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-texto-suave">
          {migas.map((miga, i) => {
            const ultima = i === migas.length - 1;
            return (
              <li key={miga.ruta} className="flex items-center gap-1.5">
                {i > 0 && (
                  <span aria-hidden="true" className="text-texto-tenue">
                    /
                  </span>
                )}
                {ultima ? (
                  <span aria-current="page" className="text-texto">
                    {miga.nombre}
                  </span>
                ) : (
                  <Link href={miga.ruta} className="transition-colors hover:text-acento">
                    {miga.nombre}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
