import path from "node:path";
import type { NextConfig } from "next";

import { reescriturasLocalizadas } from "./src/lib/idiomas";

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
};

export default nextConfig;
