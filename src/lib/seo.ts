/**
 * Constructores de JSON-LD.
 *
 * Ninguna plataforma del sector marca a la vez migas, FAQ, producto y
 * valoración en todas sus landings; es exactamente donde se les puede ganar
 * en resultados enriquecidos. Cada función devuelve un objeto plano listo
 * para volcar en un <script type="application/ld+json">.
 *
 * Las rutas ya no se construyen aquí: viven en `rutas.ts`, que sabe de
 * idiomas. Aquí solo se absolutizan.
 */

import { aDecima } from "./formato";
import { ETIQUETAS, type Idioma } from "./idiomas";
import { ruta } from "./rutas";
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

/** Organización. Va una sola vez, en el layout raíz. */
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

/** Sitio y buscador interno, en el idioma que se está viendo. */
export function sitioJsonLd(idioma: Idioma) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITIO.nombre,
    url: urlAbsoluta(ruta({ tipo: "home" }, idioma)),
    inLanguage: ETIQUETAS[idioma].hreflang,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: urlAbsoluta(
          `${ruta({ tipo: "busqueda" }, idioma)}?destino={search_term_string}`,
        ),
      },
      "query-input": "required name=search_term_string",
    },
  };
}
