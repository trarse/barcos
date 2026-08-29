import Link from "next/link";

import { IDIOMA_POR_DEFECTO } from "@/lib/idiomas";
import { ruta } from "@/lib/rutas";
import { textos } from "@/lib/textos";

/**
 * Página 404.
 *
 * No puede leer los parámetros de la ruta —Next la renderiza fuera del
 * contexto de la página que ha fallado—, así que va en castellano, que es el
 * idioma por defecto del sitio. Los enlaces apuntan a esa versión.
 */
export default function NoEncontrada() {
  const idioma = IDIOMA_POR_DEFECTO;
  const t = textos(idioma);

  return (
    <div className="reticula flex min-h-[60vh] items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <p className="cifra font-display text-6xl font-semibold text-borde-fuerte">404</p>

        <h1 className="mt-4 font-display text-3xl font-semibold text-texto">
          {t.error.titulo}
        </h1>

        <p className="mt-3 leading-relaxed text-texto-suave">{t.error.texto}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={ruta({ tipo: "busqueda" }, idioma)}
            className="rounded-md bg-marca px-5 py-3 font-semibold text-fondo transition-opacity hover:opacity-90"
          >
            {t.portada.verTodos}
          </Link>
          <Link
            href={ruta({ tipo: "home" }, idioma)}
            className="rounded-md border border-borde-fuerte px-5 py-3 font-semibold text-texto transition-colors hover:bg-superficie-alt"
          >
            {t.comun.volverPortada}
          </Link>
        </div>
      </div>
    </div>
  );
}
