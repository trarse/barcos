import { redirect } from "next/navigation";

import { IDIOMA_POR_DEFECTO } from "@/lib/idiomas";

/** La raíz redirige al idioma por defecto: / → /es. */
export default function Raiz() {
  redirect(`/${IDIOMA_POR_DEFECTO}`);
}
