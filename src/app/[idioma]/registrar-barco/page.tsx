import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Faq } from "@/components/faq";
import { Migas } from "@/components/migas";
import { paginasFijas } from "@/datos/paginas";
import { entero, euro } from "@/lib/formato";
import { esIdioma, IDIOMAS } from "@/lib/idiomas";
import { alternativas } from "@/lib/rutas";
import { SITIO } from "@/lib/sitio";
import { textos } from "@/lib/textos";

export function generateStaticParams() {
  return IDIOMAS.map((idioma) => ({ idioma }));
}

export async function generateMetadata(
  props: PageProps<"/[idioma]/registrar-barco">,
): Promise<Metadata> {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) return {};
  const p = paginasFijas(idioma).publicar;

  return {
    title: p.titulo,
    description: p.descripcion,
    alternates: alternativas({ tipo: "publicar" }, idioma),
  };
}

export default async function RegistrarBarco(
  props: PageProps<"/[idioma]/registrar-barco">,
) {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const t = textos(idioma);
  const p = paginasFijas(idioma).publicar;

  // Ejemplo con cifras del propio motor de precios, en céntimos.
  const tarifaDia = 30_000;
  const dias = 60;
  const bruto = tarifaDia * dias;
  const comision = Math.round(bruto * 0.12);

  return (
    <>
      <section className="reticula border-b border-borde">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Migas
            migas={[
              { nombre: t.migas.inicio, pagina: { tipo: "home" } },
              { nombre: t.migas.publicar, pagina: { tipo: "publicar" } },
            ]}
            idioma={idioma}
          />

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-acento">
            {p.eyebrow}
          </p>

          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-texto sm:text-5xl">
            {p.titulo}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto-suave">
            {p.entradilla}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              {p.ventajas.map((ventaja) => (
                <div
                  key={ventaja.titulo}
                  className="rounded-carta border border-borde bg-superficie p-5"
                >
                  <h2 className="font-display text-lg font-semibold text-texto">
                    {ventaja.titulo}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-texto-suave">
                    {ventaja.texto}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Faq preguntas={p.faq} idioma={idioma} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-carta border border-borde bg-superficie p-6">
              <h2 className="font-display text-xl font-semibold text-texto">
                {p.ejemploTitulo}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-texto-suave">
                {p.ejemploTexto(entero(dias), euro(tarifaDia))}
              </p>

              <dl className="mt-5 space-y-3">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-texto-suave">{p.ingresoBruto}</dt>
                  <dd className="cifra text-sm font-medium text-texto">{euro(bruto)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-texto-suave">{p.comision}</dt>
                  <dd className="cifra text-sm font-medium text-texto">
                    −{euro(comision)}
                  </dd>
                </div>
              </dl>

              <div className="isobata my-5" />

              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-lg font-semibold text-texto">
                  {p.paraTi}
                </span>
                <span className="cifra font-display text-2xl font-semibold text-acento">
                  {euro(bruto - comision)}
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-texto-tenue">
                {p.notaComision}
              </p>

              <Link
                href={`mailto:${SITIO.correo}?subject=${encodeURIComponent(p.asunto)}`}
                className="mt-6 block rounded-md bg-marca px-5 py-3.5 text-center font-semibold text-fondo transition-opacity hover:opacity-90"
              >
                {p.empezar}
              </Link>

              <p className="mt-3 text-center text-xs text-texto-tenue">{p.respuesta}</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
