import type { Metadata, Viewport } from "next";
import { Archivo, Fraunces } from "next/font/google";

import { Cabecera } from "@/components/cabecera";
import { BarraComparar } from "@/components/comparador/barra-comparar";
import { JsonLd } from "@/components/json-ld";
import { Pie } from "@/components/pie";
import { organizacionJsonLd, sitioJsonLd } from "@/lib/seo";
import { SITIO } from "@/lib/sitio";

import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: {
    default: `${SITIO.nombre} · Alquiler de barcos en España`,
    template: `%s · ${SITIO.nombre}`,
  },
  description: SITIO.descripcion,
  applicationName: SITIO.nombre,
  authors: [{ name: SITIO.nombre }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: SITIO.nombre,
    title: `${SITIO.nombre} · Alquiler de barcos en España`,
    description: SITIO.descripcion,
    url: SITIO.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITIO.nombre} · Alquiler de barcos en España`,
    description: SITIO.descripcion,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SIN_PARPADEO }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <JsonLd datos={organizacionJsonLd()} />
        <JsonLd datos={sitioJsonLd()} />
        <Cabecera />
        <main className="flex-1">{children}</main>
        <Pie />
        <BarraComparar />
      </body>
    </html>
  );
}
