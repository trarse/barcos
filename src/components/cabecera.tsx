import Link from "next/link";

import type { Idioma } from "@/lib/idiomas";
import { ruta, type Pagina } from "@/lib/rutas";
import { SITIO } from "@/lib/sitio";
import { textos } from "@/lib/textos";

import { BotonTema } from "./boton-tema";
import { Burgee } from "./burgee";
import { SelectorIdioma } from "./selector-idioma";

export function Cabecera({ idioma }: { idioma: Idioma }) {
  const t = textos(idioma);

  const navegacion: { pagina: Pagina; texto: string }[] = [
    { pagina: { tipo: "busqueda" }, texto: t.nav.alquilar },
    { pagina: { tipo: "experiencias" }, texto: t.nav.experiencias },
    { pagina: { tipo: "sinLicencia" }, texto: t.nav.sinLicencia },
    { pagina: { tipo: "blog" }, texto: t.nav.guias },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-borde bg-fondo/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          href={ruta({ tipo: "home" }, idioma)}
          className="flex shrink-0 items-center gap-2.5"
          aria-label={t.nav.irPortada(SITIO.nombre)}
        >
          <Burgee className="h-7 w-7 text-marca" />
          <span className="font-display text-xl font-semibold tracking-tight text-texto">
            {SITIO.nombre}
          </span>
        </Link>

        <nav aria-label={t.nav.principal} className="hidden flex-1 md:block">
          <ul className="flex items-center gap-1">
            {navegacion.map((enlace) => (
              <li key={enlace.texto}>
                <Link
                  href={ruta(enlace.pagina, idioma)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-texto-suave transition-colors hover:bg-superficie-alt hover:text-texto"
                >
                  {enlace.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <SelectorIdioma idioma={idioma} />
          <BotonTema />
          <Link
            href={ruta({ tipo: "publicar" }, idioma)}
            className="hidden rounded-md border border-borde-fuerte px-3.5 py-2 text-sm font-medium text-texto transition-colors hover:bg-superficie-alt lg:block"
          >
            {t.nav.publicar}
          </Link>
          <Link
            href={ruta({ tipo: "busqueda" }, idioma)}
            className="rounded-md bg-marca px-3.5 py-2 text-sm font-semibold text-fondo transition-opacity hover:opacity-90"
          >
            {t.nav.buscar}
          </Link>
        </div>
      </div>

      {/* Navegación en móvil, debajo de la barra */}
      <nav aria-label={t.nav.principal} className="border-t border-borde md:hidden">
        <ul className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-1.5">
          {navegacion.map((enlace) => (
            <li key={enlace.texto} className="shrink-0">
              <Link
                href={ruta(enlace.pagina, idioma)}
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
