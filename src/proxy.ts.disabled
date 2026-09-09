import { NextResponse, type NextRequest } from "next/server";

import { esIdioma, IDIOMA_POR_DEFECTO, IDIOMAS, type Idioma } from "@/lib/idiomas";

/**
 * Reparte la raíz del sitio al idioma que le toca a cada visitante.
 *
 * Solo actúa en `/`: todo lo demás ya lleva su prefijo. Se usa `307` y no un
 * redirect permanente porque el destino depende de la cabecera del navegador,
 * y un 301 se quedaría cacheado con el idioma del primer visitante.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const yaTieneIdioma = IDIOMAS.some(
    (idioma) => pathname === `/${idioma}` || pathname.startsWith(`/${idioma}/`),
  );
  if (yaTieneIdioma) return NextResponse.next();

  if (pathname !== "/") return NextResponse.next();

  const destino = request.nextUrl.clone();
  destino.pathname = `/${negociar(request.headers.get("accept-language"))}`;
  return NextResponse.redirect(destino, 307);
}

/**
 * Elige idioma a partir de `Accept-Language`, respetando los factores de
 * calidad. Ante la duda, castellano: es el mercado principal.
 */
export function negociar(cabecera: string | null): Idioma {
  if (!cabecera) return IDIOMA_POR_DEFECTO;

  const preferencias = cabecera
    .split(",")
    .map((trozo) => {
      const [etiqueta, ...parametros] = trozo.trim().split(";");
      const q = parametros
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="));
      const peso = q ? Number.parseFloat(q.slice(2)) : 1;
      return {
        idioma: etiqueta.trim().toLowerCase().split("-")[0],
        peso: Number.isFinite(peso) ? peso : 0,
      };
    })
    .filter((p) => p.peso > 0)
    .sort((a, b) => b.peso - a.peso);

  for (const { idioma } of preferencias) {
    if (esIdioma(idioma)) return idioma;
  }
  return IDIOMA_POR_DEFECTO;
}

export const config = {
  // Se deja fuera todo lo que no es una página: estáticos, imágenes y los
  // ficheros de metadatos, que no tienen idioma.
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
};
