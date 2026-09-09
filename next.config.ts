import path from "node:path";
import type { NextConfig } from "next";

import { IDIOMAS, reescriturasLocalizadas, segmento } from "./src/lib/idiomas";

// Destinos que se podaron a propósito (CLAUDE.md): Baleares, Barcelona,
// Málaga, Costa Brava y Valencia. Si algo se indexó antes de la poda, un 301
// lo lleva al buscador del idioma en lugar de a un 404.
const DESTINOS_PODADOS = [
  "mallorca",
  "ibiza",
  "menorca",
  "formentera",
  "barcelona",
  "malaga",
  "costa-brava",
  "valencia",
] as const;

const nextConfig: NextConfig = {
  // Hay un package-lock.json suelto en el perfil del usuario y Turbopack lo
  // toma por la raíz del proyecto. Se la fijamos explícitamente.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },

  async rewrites() {
    return {
      // `afterFiles` se comprueba después de las rutas reales, así que una
      // carpeta que exista de verdad siempre gana a una reescritura.
      //
      // Las reglas se generan desde `src/lib/idiomas.ts`, que es también de
      // donde salen los enlaces de la aplicación: así la URL que se pinta y
      // la que el servidor sabe resolver no pueden discrepar.
      beforeFiles: [],
      afterFiles: reescriturasLocalizadas(),
      fallback: [],
    };
  },

  async redirects() {
    return [...IDIOMAS].flatMap((idioma) =>
      DESTINOS_PODADOS.map((slug) => ({
        source: `/${idioma}/${segmento("alquiler", idioma)}/${slug}`,
        destination: `/${idioma}/${segmento("alquiler", idioma)}`,
        permanent: true,
      })),
    );
  },
};

export default nextConfig;
