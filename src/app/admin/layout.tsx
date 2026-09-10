import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";

import "../globals.css";

/**
 * Layout del panel de administración.
 *
 * El panel vive fuera de `[idioma]`, así que no hereda el layout raíz del
 * sitio (que está en `[idioma]/layout.tsx`). Este layout propio carga el
 * mismo CSS y las mismas fuentes para que el panel no se vea sin estilo.
 */

const display = Fraunces({
  subsets: ["latin"],
  variable: "--fuente-display",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const sans = Archivo({
  subsets: ["latin"],
  variable: "--fuente-sans",
  display: "swap",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
