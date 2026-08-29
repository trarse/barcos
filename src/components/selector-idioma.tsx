"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ETIQUETAS, IDIOMAS, type Idioma } from "@/lib/idiomas";
import { traducirRuta } from "@/lib/rutas";
import { textos } from "@/lib/textos";

/**
 * Selector de idioma.
 *
 * Cada opción apunta a *la misma página* en el otro idioma, no a la portada:
 * cambiar de lengua desde la ficha de un barco y acabar en el inicio es un
 * clásico que obliga a repetir toda la búsqueda.
 *
 * Va con `<details>` nativo: se abre sin JavaScript, el navegador ya gestiona
 * el teclado y el foco, y los enlaces están en el HTML para que se rastreen.
 */
export function SelectorIdioma({ idioma }: { idioma: Idioma }) {
  const pathname = usePathname();
  const t = textos(idioma);

  return (
    <details className="relative">
      <summary
        className="flex cursor-pointer list-none items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium text-texto-suave transition-colors hover:bg-superficie-alt hover:text-texto marker:content-none"
        aria-label={t.nav.cambiarIdioma}
      >
        <Globo />
        <span className="uppercase">{idioma}</span>
      </summary>

      <ul
        className="absolute right-0 z-50 mt-1 min-w-40 overflow-hidden rounded-md border border-borde bg-superficie py-1 shadow-[0_8px_24px_-8px_rgb(var(--sombra)/0.3)]"
        aria-label={t.nav.idioma}
      >
        {IDIOMAS.map((otro) => (
          <li key={otro}>
            <Link
              href={traducirRuta(pathname, otro)}
              hrefLang={otro}
              lang={otro}
              aria-current={otro === idioma ? "true" : undefined}
              className={`block px-3.5 py-2 text-sm transition-colors hover:bg-superficie-alt ${
                otro === idioma ? "font-semibold text-acento" : "text-texto"
              }`}
            >
              {ETIQUETAS[otro].nombre}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

function Globo() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4.5 w-4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="7.5" />
      <path d="M2.5 10h15M10 2.5c1.9 2 3 4.7 3 7.5s-1.1 5.5-3 7.5c-1.9-2-3-4.7-3-7.5s1.1-5.5 3-7.5Z" />
    </svg>
  );
}
