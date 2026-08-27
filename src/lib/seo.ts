/**
 * Constructores de JSON-LD.
 *
 * Ninguna plataforma del sector marca a la vez migas, FAQ, producto y
 * valoración en todas sus landings; es exactamente donde se les puede ganar
 * en resultados enriquecidos. Cada función devuelve un objeto plano listo
 * para volcar en un <script type="application/ld+json">.
 */

import { aDecima } from "./formato";
import { SITIO, urlAbsoluta } from "./sitio";

export interface Miga {
  nombre: string;
  ruta: string;
}

/** Migas de pan. La última no lleva `item`: es la página actual. */
export function migasJsonLd(migas: Miga[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: migas.map((miga, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: miga.nombre,
      ...(i < migas.length - 1 ? { item: urlAbsoluta(miga.ruta) } : {}),
    })),
  };
}

export interface ParFaq {
  pregunta: string;
  respuesta: string;
}

export function faqJsonLd(preguntas: ParFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preguntas.map((p) => ({
      "@type": "Question",
      name: p.pregunta,
      acceptedAnswer: { "@type": "Answer", text: p.respuesta },
    })),
  };
}

export interface ProductoBarco {
  nombre: string;
  descripcion: string;
  ruta: string;
  imagenes: string[];
  fabricante: string;
  /** Precio con todo incluido por día, en céntimos. */
  precioDia: number;
  valoracion: number;
  numOpiniones: number;
  disponible: boolean;
}

/**
 * Ficha de barco como producto alquilable. El precio que se declara es el
 * total por día, no la tarifa base: declarar uno y cobrar otro es lo que
 * acaba en una penalización manual.
 */
export function barcoJsonLd(barco: ProductoBarco) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: barco.nombre,
    description: barco.descripcion,
    image: barco.imagenes.map((img) => (img.startsWith("http") ? img : urlAbsoluta(img))),
    brand: { "@type": "Brand", name: barco.fabricante },
    offers: {
      "@type": "Offer",
      url: urlAbsoluta(barco.ruta),
      priceCurrency: "EUR",
      price: (barco.precioDia / 100).toFixed(2),
      availability: barco.disponible
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: SITIO.nombre },
    },
    ...(barco.numOpiniones > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: aDecima(barco.valoracion).toFixed(1),
            reviewCount: barco.numOpiniones,
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
  };
}

export interface ElementoLista {
  nombre: string;
  ruta: string;
}

/** Listado de resultados de una landing de destino o de tipo. */
export function listaJsonLd(nombre: string, elementos: ElementoLista[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: nombre,
    numberOfItems: elementos.length,
    itemListElement: elementos.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.nombre,
      url: urlAbsoluta(e.ruta),
    })),
  };
}

/** Organización y buscador del sitio. Va una sola vez, en el layout raíz. */
export function organizacionJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITIO.nombre,
    url: SITIO.url,
    description: SITIO.descripcion,
    email: SITIO.correo,
    areaServed: { "@type": "Country", name: "España" },
  };
}

export function sitioJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITIO.nombre,
    url: SITIO.url,
    inLanguage: SITIO.idioma,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: urlAbsoluta("/alquiler-barcos?destino={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Rutas canónicas. Se centralizan aquí para que enlaces internos, sitemap y
 * `canonical` no puedan divergir nunca: una URL con y sin barra final son dos
 * páginas distintas para un buscador.
 */
export const rutas = {
  home: () => "/",
  busqueda: () => "/alquiler-barcos",
  destino: (destino: string) => `/alquiler-barcos/${destino}`,
  destinoTipo: (destino: string, tipo: string) => `/alquiler-barcos/${destino}/${tipo}`,
  tipo: (tipo: string) => `/alquiler-${tipo}`,
  barco: (slug: string) => `/barco/${slug}`,
  experiencias: () => "/experiencias",
  experiencia: (slug: string) => `/experiencias/${slug}`,
  sinLicencia: () => "/sin-licencia",
  blog: () => "/blog",
  articulo: (slug: string) => `/blog/${slug}`,
} as const;
