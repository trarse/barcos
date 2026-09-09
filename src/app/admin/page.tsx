import type { Metadata } from "next";

import { PanelAdmin } from "@/components/panel-admin";
import { urlAbsoluta } from "@/lib/sitio";

export const metadata: Metadata = {
  title: "Panel · Estribor",
  description: "Panel de administración de reservas de Estribor.",
  alternates: { canonical: urlAbsoluta("/admin") },
  robots: { index: false, follow: false },
};

export default function Admin() {
  return <PanelAdmin />;
}
