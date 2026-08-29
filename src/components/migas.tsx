import Link from "next/link";

import type { Idioma } from "@/lib/idiomas";
import { ruta, type Pagina } from "@/lib/rutas";
import { migasJsonLd } from "@/lib/seo";
import { textos } from "@/lib/textos";

import { JsonLd } from "./json-ld";

export interface Miga {
  nombre: string;
  pagina: Pagina;
}

/**
 * Migas de pan visibles y su JSON-LD, siempre juntos: marcar una jerarquía que
 * el usuario no ve es justo lo que penaliza un buscador.
 */
export function Migas({ migas, idioma }: { migas: Miga[]; idioma: Idioma }) {
  const t = textos(idioma);
  const conRuta = migas.map((m) => ({ nombre: m.nombre, ruta: ruta(m.pagina, idioma) }));

  return (
    <>
      <JsonLd datos={migasJsonLd(conRuta)} />
      <nav aria-label={t.migas.etiqueta}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-texto-suave">
          {conRuta.map((miga, i) => {
            const ultima = i === conRuta.length - 1;
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

/** Las dos primeras migas, que se repiten en casi todas las páginas. */
export function migasBase(idioma: Idioma): Miga[] {
  const t = textos(idioma);
  return [
    { nombre: t.migas.inicio, pagina: { tipo: "home" } },
    { nombre: t.migas.alquiler, pagina: { tipo: "busqueda" } },
  ];
}
