import type { Idioma } from "../idiomas";

import { de } from "./de";
import { en } from "./en";
import { es, type Textos } from "./es";

const CATALOGO: Record<Idioma, Textos> = { es, en, de };

/** Textos de la interfaz en un idioma. */
export function textos(idioma: Idioma): Textos {
  return CATALOGO[idioma];
}

export type { Textos };
