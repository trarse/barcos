import type { Metadata } from "next";
import Link from "next/link";

import { urlAbsoluta } from "@/lib/sitio";

export const metadata: Metadata = {
  title: "Pago completado · Estribor",
  description: "Tu pago se ha completado correctamente.",
  alternates: { canonical: urlAbsoluta("/reserva/pagada") },
  robots: { index: false, follow: false },
};

export default async function Pagada({
  searchParams,
}: {
  searchParams: Promise<{ referencia?: string | string[] }>;
}) {
  const { referencia } = await searchParams;
  const ref = typeof referencia === "string" ? referencia : undefined;

  return (
    <main className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-semibold text-texto">
        Pago completado
      </h1>
      <p className="mt-3 leading-relaxed text-texto-suave">
        Gracias. Hemos recibido tu pago
        {ref ? ` (referencia ${ref})` : ""} y confirmaremos tu reserva en breve.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-acento px-5 py-2.5 font-medium text-white"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
