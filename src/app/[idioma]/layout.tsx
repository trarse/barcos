import type { Metadata, Viewport } from "next";
import { Archivo, Fraunces } from "next/font/google";
import { notFound } from "next/navigation";

import { Cabecera } from "@/components/cabecera";
import { BarraComparar } from "@/components/comparador/barra-comparar";
import { Consentimiento } from "@/components/consentimiento";
import { JsonLd } from "@/components/json-ld";
import { Pie } from "@/components/pie";
import { esIdioma, ETIQUETAS, IDIOMAS } from "@/lib/idiomas";
import { alternativas } from "@/lib/rutas";
import { organizacionJsonLd, sitioJsonLd } from "@/lib/seo";
import { SITIO } from "@/lib/sitio";
import { textos } from "@/lib/textos";

import "../globals.css";

/**
 * Layout raíz.
 *
 * Vive dentro de `[idioma]` porque el atributo `lang` del documento depende
 * del idioma, y ese atributo importa: es lo que le dice al lector de pantalla
 * en qué lengua leer y al buscador en qué índice colocar la página.
 */

const display = Fraunces({
  subsets: ["latin"],
  variable: "--fuente-display",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const sans = Archivo({
  subsets: ["latin"],
  variable: "--fuente-sans",
  display: "swap",
});

export function generateStaticParams() {
  return IDIOMAS.map((idioma) => ({ idioma }));
}

export async function generateMetadata(
  props: LayoutProps<"/[idioma]">,
): Promise<Metadata> {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) return {};

  const t = textos(idioma);
  const titulo = `${SITIO.nombre} · ${t.busqueda.titulo}`;

  return {
    metadataBase: new URL(SITIO.url),
    title: { default: titulo, template: `%s · ${SITIO.nombre}` },
    description: t.portada.entradilla,
    applicationName: SITIO.nombre,
    alternates: alternativas({ tipo: "home" }, idioma),
    openGraph: {
      type: "website",
      locale: ETIQUETAS[idioma].locale,
      siteName: SITIO.nombre,
      title: titulo,
      description: t.portada.entradilla,
      url: alternativas({ tipo: "home" }, idioma).canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: t.portada.entradilla,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#061a20" },
  ],
};

/**
 * Se ejecuta antes de pintar para que quien tenga elegido un tema no vea el
 * contrario durante un fotograma. Va en línea a propósito.
 */
const SIN_PARPADEO = `try{var t=localStorage.getItem("tema");if(t==="claro"||t==="oscuro")document.documentElement.dataset.tema=t}catch(e){}`;

export default async function LayoutRaiz(props: LayoutProps<"/[idioma]">) {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) notFound();

  return (
    <html
      lang={idioma}
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SIN_PARPADEO }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <JsonLd datos={organizacionJsonLd()} />
        <JsonLd datos={sitioJsonLd(idioma)} />
        <Cabecera idioma={idioma} />
        <main className="flex-1">{props.children}</main>
        <Pie idioma={idioma} />
        <BarraComparar idioma={idioma} />
        <Consentimiento idioma={idioma} />
      </body>
    </html>
  );
}
