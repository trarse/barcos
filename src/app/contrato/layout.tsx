import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";

import "../globals.css";

/**
 * Layout del contrato. Vive fuera de `[idioma]`, así que carga aquí el mismo
 * CSS y las mismas fuentes.
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

export default function ContratoLayout({
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
