import type { Metadata } from "next";

import { PanelArmador } from "@/components/panel-armador";
import { urlAbsoluta } from "@/lib/sitio";

export const metadata: Metadata = {
  title: "Área del armador · Estribor",
  description: "Gestiona tus barcos y reservas en Estribor.",
  alternates: { canonical: urlAbsoluta("/armador") },
  robots: { index: false, follow: false },
};

export default function Armador() {
  return <PanelArmador />;
}
