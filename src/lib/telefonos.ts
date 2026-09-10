/**
 * Prefijos telefónicos internacionales y el país al que corresponden.
 * Se usa en el panel para saber de dónde viene cada cliente sin adivinar.
 */

const PREFIJOS: Record<string, { pais: string; bandera: string }> = {
  "34": { pais: "España", bandera: "🇪🇸" },
  "33": { pais: "Francia", bandera: "🇫🇷" },
  "44": { pais: "Reino Unido", bandera: "🇬🇧" },
  "49": { pais: "Alemania", bandera: "🇩🇪" },
  "39": { pais: "Italia", bandera: "🇮🇹" },
  "31": { pais: "Países Bajos", bandera: "🇳🇱" },
  "32": { pais: "Bélgica", bandera: "🇧🇪" },
  "351": { pais: "Portugal", bandera: "🇵🇹" },
  "353": { pais: "Irlanda", bandera: "🇮🇪" },
  "46": { pais: "Suecia", bandera: "🇸🇪" },
  "47": { pais: "Noruega", bandera: "🇳🇴" },
  "45": { pais: "Dinamarca", bandera: "🇩🇰" },
  "358": { pais: "Finlandia", bandera: "🇫🇮" },
  "354": { pais: "Islandia", bandera: "🇮🇸" },
  "41": { pais: "Suiza", bandera: "🇨🇭" },
  "43": { pais: "Austria", bandera: "🇦🇹" },
  "30": { pais: "Grecia", bandera: "🇬🇷" },
  "48": { pais: "Polonia", bandera: "🇵🇱" },
  "420": { pais: "Chequia", bandera: "🇨🇿" },
  "36": { pais: "Hungría", bandera: "🇭🇺" },
  "40": { pais: "Rumanía", bandera: "🇷🇴" },
  "380": { pais: "Ucrania", bandera: "🇺🇦" },
  "1": { pais: "EE. UU. / Canadá", bandera: "🇺🇸" },
  "52": { pais: "México", bandera: "🇲🇽" },
  "54": { pais: "Argentina", bandera: "🇦🇷" },
  "56": { pais: "Chile", bandera: "🇨🇱" },
  "57": { pais: "Colombia", bandera: "🇨🇴" },
  "51": { pais: "Perú", bandera: "🇵🇪" },
  "593": { pais: "Ecuador", bandera: "🇪🇨" },
  "55": { pais: "Brasil", bandera: "🇧🇷" },
  "61": { pais: "Australia", bandera: "🇦🇺" },
  "64": { pais: "Nueva Zelanda", bandera: "🇳🇿" },
  "81": { pais: "Japón", bandera: "🇯🇵" },
  "86": { pais: "China", bandera: "🇨🇳" },
  "7": { pais: "Rusia", bandera: "🇷🇺" },
};

/** País y bandera que corresponden a un teléfono, o null si no se reconoce. */
export function paisDeTelefono(
  telefono: string | null | undefined,
): { pais: string; bandera: string } | null {
  if (!telefono) return null;
  const prefijo = telefono.replace(/[^\d+]/g, "").match(/^\+(\d+)/)?.[1];
  if (!prefijo) return null;

  // Se prueban primero los prefijos más largos (+351 antes que +35).
  const claves = Object.keys(PREFIJOS).sort((a, b) => b.length - a.length);
  for (const clave of claves) {
    if (prefijo.startsWith(clave)) return PREFIJOS[clave];
  }
  return null;
}
