import Link from "next/link";

import { NAVEGACION, SITIO } from "@/lib/sitio";

import { BotonTema } from "./boton-tema";
import { Burgee } from "./burgee";

export function Cabecera() {
  return (
    <header className="sticky top-0 z-40 border-b border-borde bg-fondo/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${SITIO.nombre}, ir a la portada`}
        >
          <Burgee className="h-7 w-7 text-marca" />
          <span className="font-display text-xl font-semibold tracking-tight text-texto">
            {SITIO.nombre}
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden flex-1 md:block">
          <ul className="flex items-center gap-1">
            {NAVEGACION.map((enlace) => (
              <li key={enlace.href}>
                <Link
                  href={enlace.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-texto-suave transition-colors hover:bg-superficie-alt hover:text-texto"
                >
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <BotonTema />
          <Link
            href="/registrar-barco"
            className="hidden rounded-md border border-borde-fuerte px-3.5 py-2 text-sm font-medium text-texto transition-colors hover:bg-superficie-alt sm:block"
          >
            Publicar mi barco
          </Link>
          <Link
            href="/alquiler-barcos"
            className="rounded-md bg-marca px-3.5 py-2 text-sm font-semibold text-fondo transition-opacity hover:opacity-90"
          >
            Buscar
          </Link>
        </div>
      </div>

      {/* Navegación en móvil, debajo de la barra */}
      <nav aria-label="Principal, móvil" className="border-t border-borde md:hidden">
        <ul className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-1.5">
          {NAVEGACION.map((enlace) => (
            <li key={enlace.href} className="shrink-0">
              <Link
                href={enlace.href}
                className="block rounded-md px-2.5 py-1.5 text-sm font-medium text-texto-suave"
              >
                {enlace.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
