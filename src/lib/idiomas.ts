/**
 * Idiomas y segmentos de URL localizados.
 *
 * Las tres versiones llevan prefijo (`/es`, `/en`, `/de`). Dejar el castellano
 * sin prefijo obliga a tratarlo como caso especial en el enrutado y es la
 * fuente clásica de contenido duplicado; con prefijo, cada página tiene una
 * sola URL canónica y el `hreflang` sale sin ambigüedad.
 *
 * Los segmentos se traducen de verdad: un usuario alemán busca "bootsverleih
 * mallorca", no "alquiler barcos mallorca". Traducir la interfaz y dejar la
 * URL en castellano tira a la basura la mitad del beneficio.
 */

export const IDIOMAS = ["es", "en", "de"] as const;
export type Idioma = (typeof IDIOMAS)[number];

export const IDIOMA_POR_DEFECTO: Idioma = "es";

export const ETIQUETAS: Record<Idioma, { nombre: string; hreflang: string; locale: string }> = {
  es: { nombre: "Español", hreflang: "es-ES", locale: "es_ES" },
  en: { nombre: "English", hreflang: "en", locale: "en_GB" },
  de: { nombre: "Deutsch", hreflang: "de", locale: "de_DE" },
};

export function esIdioma(valor: string): valor is Idioma {
  return (IDIOMAS as readonly string[]).includes(valor);
}

/**
 * Segmentos fijos de la ruta, por idioma. La clave es el nombre interno que
 * usa el código; el valor, lo que ve el usuario en la barra de direcciones.
 */
export const SEGMENTOS = {
  alquiler: { es: "alquiler-barcos", en: "boat-rental", de: "bootsverleih" },
  barco: { es: "barco", en: "boat", de: "boot" },
  experiencias: { es: "experiencias", en: "experiences", de: "erlebnisse" },
  comparar: { es: "comparar", en: "compare", de: "vergleichen" },
  sinLicencia: {
    es: "sin-licencia",
    en: "boat-hire-without-licence",
    de: "boot-mieten-ohne-fuehrerschein",
  },
  blog: { es: "blog", en: "guides", de: "ratgeber" },
  comoFunciona: { es: "como-funciona", en: "how-it-works", de: "so-funktioniert-es" },
  publicar: { es: "registrar-barco", en: "list-your-boat", de: "boot-vermieten" },
  lugares: { es: "destinos", en: "destinations", de: "reiseziele" },
} as const satisfies Record<string, Record<Idioma, string>>;

export type ClaveSegmento = keyof typeof SEGMENTOS;

export function segmento(clave: ClaveSegmento, idioma: Idioma): string {
  return SEGMENTOS[clave][idioma];
}

/**
 * Slug de cada tipo de barco por idioma. El slug interno (el de la base) es
 * siempre el castellano; esto es solo lo que se pinta en la URL.
 */
export const TIPOS_LOCALIZADOS: Record<string, Record<Idioma, string>> = {
  velero: { es: "velero", en: "sailboat", de: "segelboot" },
  catamaran: { es: "catamaran", en: "catamaran", de: "katamaran" },
  lancha: { es: "lancha", en: "motorboat", de: "motorboot" },
  neumatica: { es: "neumatica", en: "rib", de: "schlauchboot" },
  yate: { es: "yate", en: "yacht", de: "yacht" },
  llaut: { es: "llaut", en: "llaut", de: "llaut" },
  "casa-flotante": { es: "casa-flotante", en: "houseboat", de: "hausboot" },
};

/**
 * La landing de tipo lleva la palabra clave delante en cada idioma:
 * `/es/alquiler-velero`, `/en/sailboat-rental`, `/de/segelboot-mieten`.
 */
export const PATRON_TIPO: Record<Idioma, (slug: string) => string> = {
  es: (slug) => `alquiler-${slug}`,
  en: (slug) => `${slug}-rental`,
  de: (slug) => `${slug}-mieten`,
};

/** URL del tipo en un idioma, a partir del slug interno (castellano). */
export function segmentoTipo(slugInterno: string, idioma: Idioma): string {
  const localizado = TIPOS_LOCALIZADOS[slugInterno]?.[idioma] ?? slugInterno;
  return PATRON_TIPO[idioma](localizado);
}

/**
 * Camino inverso: de lo que viene en la URL al slug interno. Lo necesita la
 * reescritura y cualquier página que reciba el segmento ya localizado.
 */
export function tipoDesdeSegmento(segmentoUrl: string, idioma: Idioma): string | null {
  for (const [interno, traducciones] of Object.entries(TIPOS_LOCALIZADOS)) {
    if (PATRON_TIPO[idioma](traducciones[idioma]) === segmentoUrl) return interno;
  }
  return null;
}

/** Slug del tipo a secas, sin el patrón de la landing: `velero` → `sailboat`. */
export function tipoSimple(slugInterno: string, idioma: Idioma): string {
  return TIPOS_LOCALIZADOS[slugInterno]?.[idioma] ?? slugInterno;
}

/** De `sailboat` a `velero`. Devuelve `null` si no lo reconoce. */
export function tipoInterno(slugLocalizado: string, idioma: Idioma): string | null {
  for (const [interno, traducciones] of Object.entries(TIPOS_LOCALIZADOS)) {
    if (traducciones[idioma] === slugLocalizado) return interno;
  }
  return null;
}

/**
 * Todas las reescrituras que hacen falta para servir las URL bonitas desde
 * las carpetas internas. Se genera aquí para que `next.config.ts` y la
 * aplicación no puedan discrepar.
 */
export function reescriturasLocalizadas(): { source: string; destination: string }[] {
  const reglas: { source: string; destination: string }[] = [];

  for (const idioma of IDIOMAS) {
    // Landings de tipo: /en/sailboat-rental → /en/tipos/velero
    for (const interno of Object.keys(TIPOS_LOCALIZADOS)) {
      reglas.push({
        source: `/${idioma}/${segmentoTipo(interno, idioma)}`,
        destination: `/${idioma}/tipos/${interno}`,
      });
    }

    // Segmentos fijos que difieren del nombre de la carpeta interna.
    const carpetas: Record<ClaveSegmento, string> = {
      alquiler: "alquiler-barcos",
      barco: "barco",
      experiencias: "experiencias",
      comparar: "comparar",
      sinLicencia: "sin-licencia",
      blog: "blog",
      comoFunciona: "como-funciona",
      publicar: "registrar-barco",
      lugares: "destinos",
    };

    for (const [clave, carpeta] of Object.entries(carpetas) as [ClaveSegmento, string][]) {
      const publico = segmento(clave, idioma);
      if (publico === carpeta) continue;
      reglas.push({
        source: `/${idioma}/${publico}`,
        destination: `/${idioma}/${carpeta}`,
      });
      reglas.push({
        source: `/${idioma}/${publico}/:resto*`,
        destination: `/${idioma}/${carpeta}/:resto*`,
      });
    }
  }

  return reglas;
}
