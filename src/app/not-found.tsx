import Link from "next/link";

import { rutas } from "@/lib/seo";

export default function NoEncontrada() {
  return (
    <div className="reticula flex min-h-[60vh] items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <p className="cifra font-display text-6xl font-semibold text-borde-fuerte">404</p>

        <h1 className="mt-4 font-display text-3xl font-semibold text-texto">
          Aquí no hay fondeadero
        </h1>

        <p className="mt-3 leading-relaxed text-texto-suave">
          Esta página no existe o el barco que buscabas ya no está publicado.
          Prueba a buscar por destino.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={rutas.busqueda()}
            className="rounded-md bg-marca px-5 py-3 font-semibold text-fondo transition-opacity hover:opacity-90"
          >
            Ver todos los barcos
          </Link>
          <Link
            href={rutas.home()}
            className="rounded-md border border-borde-fuerte px-5 py-3 font-semibold text-texto transition-colors hover:bg-superficie-alt"
          >
            Volver a la portada
          </Link>
        </div>
      </div>
    </div>
  );
}
