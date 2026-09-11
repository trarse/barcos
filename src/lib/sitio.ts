/**
 * Configuración única del sitio. Todo lo que aparece en metadatos, JSON-LD,
 * sitemap y cabecera sale de aquí para que no haya dos verdades.
 */

/**
 * La URL pública del sitio.
 *
 * Si apunta a localhost en un despliegue real, el build se detiene. No es una
 * manía: publicar con los `canonical`, el sitemap y el JSON-LD apuntando a
 * localhost es el error de despliegue más caro que puede cometer un sitio que
 * vive del posicionamiento, y no da ninguna señal —la web se ve perfecta—
 * hasta que semanas después no hay nada indexado.
 *
 * En un `npm run build` local solo avisa: `next build` siempre pone
 * NODE_ENV=production, así que fallar ahí impediría compilar en casa. Se
 * distingue por las variables que ponen las plataformas de despliegue.
 */
function enDespliegue(): boolean {
  return Boolean(
    process.env.CI ||
      process.env.VERCEL ||
      process.env.CF_PAGES ||
      process.env.NETLIFY ||
      process.env.ESTRIBOR_DESPLIEGUE,
  );
}

function urlDelSitio(): string {
  const url = process.env.NEXT_PUBLIC_URL?.trim();
  const local = !url || /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)/i.test(url);

  if (local && process.env.NODE_ENV === "production" && !enDespliegue()) {
    console.warn(
      "\n  AVISO: NEXT_PUBLIC_URL apunta a localhost. Este build vale para " +
        "probar, pero NO para publicar: los canonical y el sitemap saldrían " +
        "apuntando a tu ordenador.\n",
    );
  }

  if (enDespliegue()) {
    if (!url) {
      throw new Error(
        "Falta NEXT_PUBLIC_URL. En producción hay que definirla con el dominio " +
          "real (por ejemplo https://estribor.es): de ahí salen el canonical, " +
          "el sitemap, el hreflang y el JSON-LD.",
      );
    }
    if (local) {
      throw new Error(
        `NEXT_PUBLIC_URL apunta a "${url}" en un despliegue. Se publicarían ` +
          "todos los canonical y el sitemap apuntando a tu propio ordenador. " +
          "Define el dominio real antes de desplegar.",
      );
    }
  }

  return url || "https://estribor-preview.netlify.app";
}

export const SITIO = {
  nombre: "Estribor",
  lema: "El precio final, por delante",
  descripcion:
    "Alquiler de barcos en España con el precio final desde el primer resultado: combustible, limpieza, amarre y tasas incluidos. Sin sorpresas al pagar.",
  url: urlDelSitio(),
  idioma: "es-ES",
  correo: "hola@estribor.es",
  telefono: "+34 900 000 000",
} as const;

/** Construye una URL absoluta a partir de una ruta interna. */
export function urlAbsoluta(ruta: string): string {
  return new URL(ruta, SITIO.url).toString();
}

