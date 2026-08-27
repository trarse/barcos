import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hay un package-lock.json suelto en el perfil del usuario y Turbopack lo
  // toma por la raíz del proyecto. Se la fijamos explícitamente.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },

  async rewrites() {
    return {
      // `afterFiles` se comprueba después de las rutas reales, así que
      // /alquiler-barcos sigue siendo la página de búsqueda y solo el resto
      // de /alquiler-* cae en la landing de tipo de barco.
      beforeFiles: [],
      afterFiles: [{ source: "/alquiler-:tipo", destination: "/tipos/:tipo" }],
      fallback: [],
    };
  },
};

export default nextConfig;
