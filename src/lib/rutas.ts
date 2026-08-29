/**
 * Construcción de rutas.
 *
 * Una página no se identifica por su URL sino por lo que es: «la landing de
 * Mallorca», «la ficha de este barco». De esa identidad se deriva la URL en
 * cualquier idioma, y de ahí salen solos el canónico y los `hreflang`.
 *
 * Escribir las URL a mano en cada plantilla es lo que acaba produciendo un
 * `hreflang` que apunta a una página que no existe.
 */

import {
  esIdioma,
  ETIQUETAS,
  IDIOMAS,
  segmento,
  segmentoTipo,
  tipoDesdeSegmento,
  tipoInterno,
  tipoSimple,
  type Idioma,
} from "./idiomas";

export type Pagina =
  | { tipo: "home" }
  | { tipo: "busqueda" }
  | { tipo: "destino"; destino: string }
  | { tipo: "destinoTipo"; destino: string; tipoBarco: string }
  | { tipo: "tipoBarco"; tipoBarco: string }
  | { tipo: "barco"; slug: string }
  | { tipo: "experiencias" }
  | { tipo: "experiencia"; slug: string }
  | { tipo: "sinLicencia" }
  | { tipo: "sinLicenciaDestino"; destino: string }
  | { tipo: "lugares" }
  | { tipo: "lugar"; slug: string }
  | { tipo: "blog" }
  | { tipo: "articulo"; slug: string }
  | { tipo: "comoFunciona" }
  | { tipo: "publicar" }
  | { tipo: "comparar" };

/** URL pública de una página en un idioma. Nunca termina en barra. */
export function ruta(pagina: Pagina, idioma: Idioma): string {
  const raiz = `/${idioma}`;
  const alquiler = segmento("alquiler", idioma);

  switch (pagina.tipo) {
    case "home":
      return raiz;
    case "busqueda":
      return `${raiz}/${alquiler}`;
    case "destino":
      return `${raiz}/${alquiler}/${pagina.destino}`;
    case "destinoTipo":
      return `${raiz}/${alquiler}/${pagina.destino}/${tipoSimple(pagina.tipoBarco, idioma)}`;
    case "tipoBarco":
      return `${raiz}/${segmentoTipo(pagina.tipoBarco, idioma)}`;
    case "barco":
      return `${raiz}/${segmento("barco", idioma)}/${pagina.slug}`;
    case "experiencias":
      return `${raiz}/${segmento("experiencias", idioma)}`;
    case "experiencia":
      return `${raiz}/${segmento("experiencias", idioma)}/${pagina.slug}`;
    case "sinLicencia":
      return `${raiz}/${segmento("sinLicencia", idioma)}`;
    case "sinLicenciaDestino":
      return `${raiz}/${segmento("sinLicencia", idioma)}/${pagina.destino}`;
    case "lugares":
      return `${raiz}/${segmento("lugares", idioma)}`;
    case "lugar":
      return `${raiz}/${segmento("lugares", idioma)}/${pagina.slug}`;
    case "blog":
      return `${raiz}/${segmento("blog", idioma)}`;
    case "articulo":
      return `${raiz}/${segmento("blog", idioma)}/${pagina.slug}`;
    case "comoFunciona":
      return `${raiz}/${segmento("comoFunciona", idioma)}`;
    case "publicar":
      return `${raiz}/${segmento("publicar", idioma)}`;
    case "comparar":
      return `${raiz}/${segmento("comparar", idioma)}`;
  }
}

/**
 * Camino inverso: de una URL a la identidad de la página.
 *
 * Es lo que permite que el selector de idioma lleve a *la misma página* en
 * otra lengua y no a la portada. Sin esto, cambiar de idioma en la ficha de un
 * barco te echa al inicio, que es lo que hace media competencia.
 *
 * Devuelve `null` si la ruta no se reconoce; quien llama decide qué hacer.
 */
export function analizarRuta(
  pathname: string,
): { idioma: Idioma; pagina: Pagina } | null {
  const trozos = pathname.split("/").filter(Boolean);
  const [prefijo, ...resto] = trozos;

  if (!prefijo || !esIdioma(prefijo)) return null;
  const idioma = prefijo;
  const con = (pagina: Pagina) => ({ idioma, pagina });

  if (resto.length === 0) return con({ tipo: "home" });

  const [primero, segundo, tercero] = resto;

  // Landing de tipo: /es/alquiler-velero. Se comprueba después del segmento
  // de alquiler, que es una cadena distinta y no puede confundirse.
  if (resto.length === 1) {
    if (primero === segmento("alquiler", idioma)) return con({ tipo: "busqueda" });
    if (primero === segmento("experiencias", idioma)) return con({ tipo: "experiencias" });
    if (primero === segmento("blog", idioma)) return con({ tipo: "blog" });
    if (primero === segmento("lugares", idioma)) return con({ tipo: "lugares" });
    if (primero === segmento("sinLicencia", idioma)) return con({ tipo: "sinLicencia" });
    if (primero === segmento("comoFunciona", idioma)) return con({ tipo: "comoFunciona" });
    if (primero === segmento("publicar", idioma)) return con({ tipo: "publicar" });
    if (primero === segmento("comparar", idioma)) return con({ tipo: "comparar" });

    const tipoBarco = tipoDesdeSegmento(primero, idioma);
    if (tipoBarco) return con({ tipo: "tipoBarco", tipoBarco });
    return null;
  }

  if (resto.length === 2) {
    if (primero === segmento("alquiler", idioma)) {
      return con({ tipo: "destino", destino: segundo });
    }
    if (primero === segmento("barco", idioma)) {
      return con({ tipo: "barco", slug: segundo });
    }
    if (primero === segmento("experiencias", idioma)) {
      return con({ tipo: "experiencia", slug: segundo });
    }
    if (primero === segmento("blog", idioma)) {
      return con({ tipo: "articulo", slug: segundo });
    }
    if (primero === segmento("sinLicencia", idioma)) {
      return con({ tipo: "sinLicenciaDestino", destino: segundo });
    }
    if (primero === segmento("lugares", idioma)) {
      return con({ tipo: "lugar", slug: segundo });
    }
    return null;
  }

  if (resto.length === 3 && primero === segmento("alquiler", idioma)) {
    const tipoBarco = tipoInterno(tercero, idioma);
    if (!tipoBarco) return null;
    return con({ tipo: "destinoTipo", destino: segundo, tipoBarco });
  }

  return null;
}

/**
 * La misma URL en otro idioma. Si la ruta no se reconoce, se devuelve la
 * portada del idioma destino: mejor eso que un enlace roto.
 */
export function traducirRuta(pathname: string, destino: Idioma): string {
  const analizada = analizarRuta(pathname);
  if (!analizada) return ruta({ tipo: "home" }, destino);
  return ruta(analizada.pagina, destino);
}

/** La misma página en todos los idiomas. Es la base del `hreflang`. */
export function todasLasRutas(pagina: Pagina): Record<Idioma, string> {
  return Object.fromEntries(
    IDIOMAS.map((idioma) => [idioma, ruta(pagina, idioma)]),
  ) as Record<Idioma, string>;
}

/**
 * Bloque `alternates` de los metadatos: el canónico del idioma actual más un
 * `hreflang` por versión y el `x-default`, que apunta al castellano por ser
 * el mercado principal.
 */
export function alternativas(pagina: Pagina, idioma: Idioma) {
  const rutas = todasLasRutas(pagina);

  const languages: Record<string, string> = {};
  for (const otro of IDIOMAS) {
    languages[ETIQUETAS[otro].hreflang] = rutas[otro];
  }
  languages["x-default"] = rutas.es;

  return { canonical: rutas[idioma], languages };
}
