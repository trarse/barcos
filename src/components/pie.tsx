import Link from "next/link";

import { paginaLegal } from "@/datos/legales";
import { listarDestinos, listarExperiencias, listarLugares } from "@/lib/consultas";

import type { Idioma } from "@/lib/idiomas";
import { ruta, type Pagina } from "@/lib/rutas";
import { SITIO } from "@/lib/sitio";
import { textos } from "@/lib/textos";

import { Burgee } from "./burgee";

const TIPOS = ["velero", "catamaran", "lancha", "neumatica", "llaut", "yate"];


/**
 * Pie del sitio.
 *
 * Los destinos, lugares y actividades se leen de la base y no de una lista
 * escrita a mano: el pie sale en todas las páginas, así que una lista que no
 * cuadre con el catálogo son enlaces rotos en el sitio entero. Ya pasó al
 * podar el catálogo a la Costa Blanca.
 */
export async function Pie({ idioma }: { idioma: Idioma }) {
  const [destinos, lugares, actividades] = await Promise.all([
    listarDestinos(),
    listarLugares(),
    listarExperiencias(),
  ]);

  const t = textos(idioma);

  const columnas: { titulo: string; enlaces: { texto: string; pagina: Pagina }[] }[] = [
    {
      titulo: t.pie.destinos,
      enlaces: destinos.slice(0, 8).map((d) => ({
        texto: d.nombre,
        pagina: { tipo: "destino", destino: d.slug } as Pagina,
      })),
    },
    {
      titulo: t.pie.tipos,
      enlaces: TIPOS.map((slug) => ({
        texto: t.tiposBarco[slug as keyof typeof t.tiposBarco],
        pagina: { tipo: "tipoBarco", tipoBarco: slug } as Pagina,
      })),
    },
    {
      titulo: t.pie.experiencias,
      enlaces: actividades.map((a) => ({
        texto: t.actividades[a.slug as keyof typeof t.actividades] ?? a.nombre,
        pagina: { tipo: "experiencia", slug: a.slug } as Pagina,
      })),
    },
    {
      titulo: t.pie.destinosNombre,
      enlaces: lugares.map((l) => ({
        texto: l.nombre,
        pagina: { tipo: "lugar", slug: l.slug } as Pagina,
      })),
    },
    {
      titulo: t.pie.marca,
      enlaces: [
        { texto: t.pie.comoFunciona, pagina: { tipo: "comoFunciona" } },
        { texto: t.pie.publicar, pagina: { tipo: "publicar" } },
        { texto: t.pie.sinLicencia, pagina: { tipo: "sinLicencia" } },
        { texto: t.pie.guias, pagina: { tipo: "guias" } },
        { texto: t.pie.ocasiones, pagina: { tipo: "ocasiones" } },
        { texto: t.pie.blog, pagina: { tipo: "blog" } },
        { texto: paginaLegal(idioma, "avisoLegal").titulo, pagina: { tipo: "avisoLegal" } },
        { texto: paginaLegal(idioma, "privacidad").titulo, pagina: { tipo: "privacidad" } },
        { texto: paginaLegal(idioma, "cookies").titulo, pagina: { tipo: "cookies" } },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-borde bg-superficie">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <Burgee className="h-7 w-7 text-marca" />
              <span className="font-display text-xl font-semibold text-texto">
                {SITIO.nombre}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-texto-suave">
              {t.pie.lema}
            </p>
          </div>

          {columnas.map((columna) => (
            <nav key={columna.titulo} aria-label={columna.titulo}>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                {columna.titulo}
              </h2>
              <ul className="mt-3 space-y-2">
                {columna.enlaces.map((enlace) => (
                  <li key={enlace.texto}>
                    <Link
                      href={ruta(enlace.pagina, idioma)}
                      className="text-sm text-texto-suave transition-colors hover:text-acento"
                    >
                      {enlace.texto}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="isobata mt-12" />

        <div className="mt-6 flex flex-col gap-3 text-sm text-texto-tenue sm:flex-row sm:items-center sm:justify-between">
          <p>{t.pie.derechos(new Date().getFullYear(), SITIO.nombre)}</p>
          <p>
            <a href={`mailto:${SITIO.correo}`} className="hover:text-acento">
              {SITIO.correo}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
