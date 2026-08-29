import Link from "next/link";
import { notFound } from "next/navigation";

import { Buscador } from "@/components/buscador";
import { FotoBarco } from "@/components/foto-barco";
import { TarjetaBarco } from "@/components/tarjeta-barco";
import {
  barcosDestacados,
  contarPorDestino,
  contarSinLicencia,
  listarDestinos,
  listarExperiencias,
  listarTipos,
} from "@/lib/consultas";
import { entero, euro } from "@/lib/formato";
import { esIdioma, type Idioma } from "@/lib/idiomas";
import { ruta } from "@/lib/rutas";
import { textos } from "@/lib/textos";

export const revalidate = 3600;

export default async function Portada(props: PageProps<"/[idioma]">) {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const t = textos(idioma);

  const [destinos, tipos, destacados, experiencias, cuenta, sinLicencia] =
    await Promise.all([
      listarDestinos(),
      listarTipos(),
      barcosDestacados(6),
      listarExperiencias(),
      contarPorDestino(),
      contarSinLicencia(),
    ]);

  const total = [...cuenta.values()].reduce((a, b) => a + b, 0);

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="reticula relative overflow-hidden border-b border-borde">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fondo/40 to-fondo" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-acento">
            {t.portada.contador(entero(total), destinos.length)}
          </p>

          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] text-texto sm:text-6xl">
            {t.portada.titular}
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-texto-suave">
            {t.portada.entradilla}
          </p>

          <div className="mt-9 max-w-4xl">
            <Buscador destinos={destinos} tipos={tipos} idioma={idioma} />
          </div>

          <p className="mt-4 text-sm text-texto-tenue">
            {t.portada.sinTitulacion}{" "}
            <Link
              href={ruta({ tipo: "sinLicencia" }, idioma)}
              className="font-medium text-acento hover:underline"
            >
              {t.portada.barcosSinLicencia(entero(sinLicencia))}
            </Link>
          </p>
        </div>
      </section>

      <ComparativaPrecio idioma={idioma} />

      {/* -------------------------------------------------------- destinos */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <CabeceraSeccion
          titulo={t.portada.dondeNavegar}
          texto={t.portada.dondeNavegarTexto}
          enlace={{
            href: ruta({ tipo: "busqueda" }, idioma),
            texto: t.portada.verTodos,
          }}
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinos.slice(0, 6).map((destino) => (
            <Link
              key={destino.slug}
              href={ruta({ tipo: "destino", destino: destino.slug }, idioma)}
              className="group relative overflow-hidden rounded-carta border border-borde bg-superficie transition-shadow hover:shadow-[0_2px_20px_-4px_rgb(var(--sombra)/0.18)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-superficie-alt">
                <FotoBarco
                  token={`carta:${tipoIlustracion(destino.orden)}:${destino.orden}`}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-texto-tenue">
                  {destino.comunidad}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-texto">
                  {destino.nombre}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-texto-suave">
                  {destino.descripcion}
                </p>
                <p className="mt-3 text-sm font-medium text-acento">
                  {t.portada.nBarcos(entero(cuenta.get(destino.slug) ?? 0))}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------- flota */}
      <section className="border-y border-borde bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <CabeceraSeccion
            titulo={t.portada.mejorValorados}
            texto={t.portada.mejorValoradosTexto}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destacados.map((barco, i) => (
              <TarjetaBarco
                key={barco.slug}
                barco={barco}
                idioma={idioma}
                prioridad={i < 3}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ tipos */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <CabeceraSeccion titulo={t.portada.porTipo} texto={t.portada.porTipoTexto} />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tipos.map((tipo) => (
            <Link
              key={tipo.slug}
              href={ruta({ tipo: "tipoBarco", tipoBarco: tipo.slug }, idioma)}
              className="flex items-start gap-4 rounded-carta border border-borde bg-superficie p-4 transition-colors hover:border-borde-fuerte"
            >
              <div className="h-16 w-20 shrink-0 overflow-hidden rounded bg-superficie-alt">
                <FotoBarco token={`carta:${tipo.slug}:1`} className="h-full w-full" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold text-texto">
                  {t.tiposBarco[tipo.slug as keyof typeof t.tiposBarco] ?? tipo.plural}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-sm leading-relaxed text-texto-suave">
                  {tipo.descripcion}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------- experiencias */}
      <section className="border-t border-borde bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <CabeceraSeccion
            titulo={t.portada.noSoloBarco}
            texto={t.portada.noSoloBarcoTexto}
            enlace={{
              href: ruta({ tipo: "experiencias" }, idioma),
              texto: t.portada.todasExperiencias,
            }}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experiencias.map((exp) => (
              <Link
                key={exp.slug}
                href={ruta({ tipo: "experiencia", slug: exp.slug }, idioma)}
                className="flex flex-col rounded-carta border border-borde bg-fondo p-5 transition-colors hover:border-acento"
              >
                <h3 className="font-display text-xl font-semibold text-texto">
                  {t.actividades[exp.slug as keyof typeof t.actividades] ?? exp.nombre}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-texto-suave">
                  {exp.descripcion}
                </p>
                <p className="mt-4 text-sm font-medium text-acento">
                  {t.portada.nBarcosHoras(entero(exp._count.barcos), exp.horas)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/** Varía la silueta de las tarjetas de destino para que no se repitan. */
function tipoIlustracion(orden: number): string {
  const siluetas = ["velero", "catamaran", "lancha", "llaut", "neumatica", "yate"];
  return siluetas[orden % siluetas.length];
}

/**
 * El bloque que explica el producto. Los números son reales: salen de aplicar
 * el motor de precios a una lancha de 250 caballos durante un día.
 */
function ComparativaPrecio({ idioma }: { idioma: Idioma }) {
  const t = textos(idioma);

  const base = 30_000;
  const combustible = 13_200;
  const limpieza = 8_000;
  const amarre = 4_500;
  const iva = 11_697;
  const total = base + combustible + limpieza + amarre + iva;

  const conceptos = [
    { texto: t.portada.alquilerBarco, importe: base, oculto: false },
    { texto: t.portada.combustibleEstimado(80), importe: combustible, oculto: true },
    { texto: t.portada.limpiezaFinal, importe: limpieza, oculto: true },
    { texto: t.portada.amarreTasas, importe: amarre, oculto: true },
    { texto: t.portada.iva, importe: iva, oculto: true },
  ];

  return (
    <section className="border-b border-borde bg-superficie">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-acento">
            {t.portada.porQue}
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-texto sm:text-4xl">
            {t.portada.tesisTitular}
          </h2>
          <p className="mt-4 leading-relaxed text-texto-suave">{t.portada.tesisUno}</p>
          <p className="mt-4 leading-relaxed text-texto-suave">{t.portada.tesisDos}</p>

          <Link
            href={ruta({ tipo: "busqueda" }, idioma)}
            className="mt-7 inline-block rounded-md bg-marca px-5 py-3 font-semibold text-fondo transition-opacity hover:opacity-90"
          >
            {t.portada.buscarPrecioReal}
          </Link>
        </div>

        <div className="rounded-carta border border-borde bg-fondo p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
            {t.portada.ejemploCabecera}
          </p>

          <ul className="mt-5 space-y-3">
            {conceptos.map((c) => (
              <li key={c.texto} className="flex items-baseline justify-between gap-4">
                <span
                  className={`text-sm ${c.oculto ? "text-texto-suave" : "font-medium text-texto"}`}
                >
                  {c.texto}
                  {c.oculto && (
                    <span className="ml-2 text-xs text-acento">
                      {t.portada.loSumanAlPagar}
                    </span>
                  )}
                </span>
                <span className="cifra shrink-0 text-sm font-medium text-texto">
                  {euro(c.importe)}
                </span>
              </li>
            ))}
          </ul>

          <div className="isobata my-5" />

          <div className="flex items-baseline justify-between gap-4">
            <span className="font-display text-lg font-semibold text-texto">
              {t.portada.loQuePagas}
            </span>
            <span className="cifra font-display text-2xl font-semibold text-acento">
              {euro(total)}
            </span>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-texto-tenue">
            {t.portada.notaFianza}
          </p>
        </div>
      </div>
    </section>
  );
}

function CabeceraSeccion({
  titulo,
  texto,
  enlace,
}: {
  titulo: string;
  texto: string;
  enlace?: { href: string; texto: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-xl">
        <h2 className="font-display text-3xl font-semibold text-texto">{titulo}</h2>
        <p className="mt-2 leading-relaxed text-texto-suave">{texto}</p>
      </div>
      {enlace && (
        <Link
          href={enlace.href}
          className="shrink-0 text-sm font-semibold text-acento hover:underline"
        >
          {enlace.texto} →
        </Link>
      )}
    </div>
  );
}
