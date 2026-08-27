import Link from "next/link";

import { rutas } from "@/lib/seo";
import { SITIO } from "@/lib/sitio";

import { Burgee } from "./burgee";

const COLUMNAS = [
  {
    titulo: "Destinos",
    enlaces: [
      { texto: "Mallorca", href: rutas.destino("mallorca") },
      { texto: "Ibiza", href: rutas.destino("ibiza") },
      { texto: "Menorca", href: rutas.destino("menorca") },
      { texto: "Dénia", href: rutas.destino("denia") },
      { texto: "Valencia", href: rutas.destino("valencia") },
      { texto: "Barcelona", href: rutas.destino("barcelona") },
    ],
  },
  {
    titulo: "Tipos de barco",
    enlaces: [
      { texto: "Veleros", href: rutas.tipo("velero") },
      { texto: "Catamaranes", href: rutas.tipo("catamaran") },
      { texto: "Lanchas", href: rutas.tipo("lancha") },
      { texto: "Neumáticas", href: rutas.tipo("neumatica") },
      { texto: "Llaüts", href: rutas.tipo("llaut") },
      { texto: "Yates", href: rutas.tipo("yate") },
    ],
  },
  {
    titulo: "Experiencias",
    enlaces: [
      { texto: "Atardecer", href: rutas.experiencia("atardecer") },
      { texto: "Pesca", href: rutas.experiencia("pesca") },
      { texto: "Calas y snorkel", href: rutas.experiencia("calas-y-snorkel") },
      { texto: "Avistamiento de cetáceos", href: rutas.experiencia("avistamiento-cetaceos") },
      { texto: "Celebraciones", href: rutas.experiencia("celebraciones") },
    ],
  },
  {
    titulo: "Barlovento",
    enlaces: [
      { texto: "Cómo funciona", href: "/como-funciona" },
      { texto: "Publicar mi barco", href: "/registrar-barco" },
      { texto: "Barcos sin licencia", href: rutas.sinLicencia() },
      { texto: "Guías de navegación", href: rutas.blog() },
    ],
  },
];

export function Pie() {
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
              El precio que ves en el buscador es el que pagas. Combustible,
              limpieza, amarre y tasas van dentro desde el primer resultado.
            </p>
          </div>

          {COLUMNAS.map((columna) => (
            <nav key={columna.titulo} aria-label={columna.titulo}>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-texto-tenue">
                {columna.titulo}
              </h2>
              <ul className="mt-3 space-y-2">
                {columna.enlaces.map((enlace) => (
                  <li key={enlace.href}>
                    <Link
                      href={enlace.href}
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
          <p>
            © {new Date().getFullYear()} {SITIO.nombre}. Precios con IVA
            incluido.
          </p>
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
