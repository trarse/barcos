import Link from "next/link";

import type { Idioma } from "@/lib/idiomas";
import { ruta, type Pagina } from "@/lib/rutas";
import { SITIO } from "@/lib/sitio";
import { textos } from "@/lib/textos";

import { Burgee } from "./burgee";

const DESTINOS = ["mallorca", "ibiza", "menorca", "denia", "valencia", "barcelona"];
const TIPOS = ["velero", "catamaran", "lancha", "neumatica", "llaut", "yate"];
const ACTIVIDADES = [
  "atardecer",
  "pesca",
  "calas-y-snorkel",
  "avistamiento-cetaceos",
  "celebraciones",
];

/** Nombre visible de un destino: el slug capitalizado sirve para todos. */
const NOMBRES_DESTINO: Record<string, string> = {
  mallorca: "Mallorca",
  ibiza: "Ibiza",
  menorca: "Menorca",
  denia: "Dénia",
  valencia: "Valencia",
  barcelona: "Barcelona",
};

export function Pie({ idioma }: { idioma: Idioma }) {
  const t = textos(idioma);

  const columnas: { titulo: string; enlaces: { texto: string; pagina: Pagina }[] }[] = [
    {
      titulo: t.pie.destinos,
      enlaces: DESTINOS.map((slug) => ({
        texto: NOMBRES_DESTINO[slug] ?? slug,
        pagina: { tipo: "destino", destino: slug } as Pagina,
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
      enlaces: ACTIVIDADES.map((slug) => ({
        texto: t.actividades[slug as keyof typeof t.actividades],
        pagina: { tipo: "experiencia", slug } as Pagina,
      })),
    },
    {
      titulo: t.pie.marca,
      enlaces: [
        { texto: t.pie.comoFunciona, pagina: { tipo: "comoFunciona" } },
        { texto: t.pie.publicar, pagina: { tipo: "publicar" } },
        { texto: t.pie.sinLicencia, pagina: { tipo: "sinLicencia" } },
        { texto: t.pie.guias, pagina: { tipo: "guias" } },
        { texto: t.pie.destinosNombre, pagina: { tipo: "lugares" } },
        { texto: t.pie.blog, pagina: { tipo: "blog" } },
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
