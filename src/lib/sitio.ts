/**
 * Configuración única del sitio. Todo lo que aparece en metadatos, JSON-LD,
 * sitemap y cabecera sale de aquí para que no haya dos verdades.
 */

export const SITIO = {
  nombre: "Barlovento",
  lema: "El precio final, por delante",
  descripcion:
    "Alquiler de barcos en España con el precio final desde el primer resultado: combustible, limpieza, amarre y tasas incluidos. Sin sorpresas al pagar.",
  url: process.env.NEXT_PUBLIC_URL ?? "https://barlovento.es",
  idioma: "es-ES",
  correo: "hola@barlovento.es",
  telefono: "+34 900 000 000",
} as const;

/** Construye una URL absoluta a partir de una ruta interna. */
export function urlAbsoluta(ruta: string): string {
  return new URL(ruta, SITIO.url).toString();
}

export const NAVEGACION = [
  { href: "/alquiler-barcos", texto: "Alquilar" },
  { href: "/experiencias", texto: "Experiencias" },
  { href: "/sin-licencia", texto: "Sin licencia" },
  { href: "/blog", texto: "Guías" },
] as const;
