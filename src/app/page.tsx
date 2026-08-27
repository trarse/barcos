import Link from "next/link";

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
import { rutas } from "@/lib/seo";

export const revalidate = 3600;

export default async function Portada() {
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
            {entero(total)} barcos en 12 destinos de España
          </p>

          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] text-texto sm:text-6xl">
            Alquiler de barcos con el precio final por delante
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-texto-suave">
            Combustible, limpieza, amarre y tasas van dentro desde el primer
            resultado. Lo que ves en el buscador es exactamente lo que pagas.
          </p>

          <div className="mt-9 max-w-4xl">
            <Buscador destinos={destinos} tipos={tipos} />
          </div>

          <p className="mt-4 text-sm text-texto-tenue">
            ¿Sin titulación?{" "}
            <Link href={rutas.sinLicencia()} className="font-medium text-acento hover:underline">
              Hay {entero(sinLicencia)} barcos que puedes llevar sin licencia
            </Link>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------- la tesis del sitio */}
      <ComparativaPrecio />

      {/* -------------------------------------------------------- destinos */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Cabecera
          titulo="Dónde navegar"
          texto="Doce zonas con su flota, sus calas y sus condiciones de navegación explicadas."
          enlace={{ href: rutas.busqueda(), texto: "Ver todos los barcos" }}
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinos.slice(0, 6).map((destino) => (
            <Link
              key={destino.slug}
              href={rutas.destino(destino.slug)}
              className="group relative overflow-hidden rounded-carta border border-borde bg-superficie transition-shadow hover:shadow-[0_2px_20px_-4px_rgb(var(--sombra)/0.18)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-superficie-alt">
                <FotoBarco
                  token={`carta:${destino.slug === "mallorca" ? "velero" : destino.slug === "ibiza" ? "catamaran" : "lancha"}:${destino.orden}`}
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
                  {entero(cuenta.get(destino.slug) ?? 0)} barcos
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------- flota */}
      <section className="border-y border-borde bg-superficie">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Cabecera
            titulo="Los mejor valorados"
            texto="Con el precio completo calculado para las fechas de hoy."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destacados.map((barco, i) => (
              <TarjetaBarco key={barco.slug} barco={barco} prioridad={i < 3} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ tipos */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Cabecera
          titulo="Por tipo de barco"
          texto="Cada casco tiene su consumo, su capacidad y su forma de disfrutarse."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tipos.map((tipo) => (
            <Link
              key={tipo.slug}
              href={rutas.tipo(tipo.slug)}
              className="flex items-start gap-4 rounded-carta border border-borde bg-superficie p-4 transition-colors hover:border-borde-fuerte"
            >
              <div className="h-16 w-20 shrink-0 overflow-hidden rounded bg-superficie-alt">
                <FotoBarco token={`carta:${tipo.slug}:1`} className="h-full w-full" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold text-texto">
                  {tipo.plural}
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
          <Cabecera
            titulo="No solo un barco: un plan"
            texto="Atardecer, pesca, calas o cetáceos. Cada experiencia con su precio y sus barcos."
            enlace={{ href: rutas.experiencias(), texto: "Todas las experiencias" }}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experiencias.map((exp) => (
              <Link
                key={exp.slug}
                href={rutas.experiencia(exp.slug)}
                className="flex flex-col rounded-carta border border-borde bg-fondo p-5 transition-colors hover:border-acento"
              >
                <h3 className="font-display text-xl font-semibold text-texto">
                  {exp.nombre}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-texto-suave">
                  {exp.descripcion}
                </p>
                <p className="mt-4 text-sm font-medium text-acento">
                  {entero(exp._count.barcos)} barcos · unas {exp.horas} h
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * El bloque que explica el producto. Los números son reales: salen de aplicar
 * el motor de precios a una lancha de 250 caballos durante un día.
 */
function ComparativaPrecio() {
  const base = 30_000;
  const combustible = 13_200;
  const limpieza = 8_000;
  const amarre = 4_500;
  const iva = 11_697;
  const total = base + combustible + limpieza + amarre + iva;

  const conceptos = [
    { texto: "Alquiler del barco", importe: base, oculto: false },
    { texto: "Combustible (80 l estimados)", importe: combustible, oculto: true },
    { texto: "Limpieza final", importe: limpieza, oculto: true },
    { texto: "Amarre y tasas", importe: amarre, oculto: true },
    { texto: "IVA", importe: iva, oculto: true },
  ];

  return (
    <section className="border-b border-borde bg-superficie">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-acento">
            Por qué existe Barlovento
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-texto sm:text-4xl">
            Ese barco de 300 € cuesta 674 €
          </h2>
          <p className="mt-4 leading-relaxed text-texto-suave">
            Una lancha de 250 caballos quema unos 40 litros a la hora. Cuatro
            horas de navegación son 132 € de gasóleo. Súmale la limpieza, el
            amarre, las tasas y el IVA y la cifra anunciada se queda a menos de
            la mitad de lo que acabas pagando.
          </p>
          <p className="mt-4 leading-relaxed text-texto-suave">
            No es letra pequeña de una plataforma concreta: es cómo funciona el
            sector entero. Aquí ese cálculo está hecho antes de que abras la
            ficha, y es el número que ordena los resultados.
          </p>

          <Link
            href={rutas.busqueda()}
            className="mt-7 inline-block rounded-md bg-marca px-5 py-3 font-semibold text-fondo transition-opacity hover:opacity-90"
          >
            Buscar con el precio real
          </Link>
        </div>

        <div className="rounded-carta border border-borde bg-fondo p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">
            Un día · Quicksilver Activ 675 · Dénia
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
                      lo suman al pagar
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
              Lo que pagas de verdad
            </span>
            <span className="cifra font-display text-2xl font-semibold text-acento">
              {euro(total)}
            </span>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-texto-tenue">
            La fianza de 1.000 € se bloquea aparte y se devuelve al entregar el
            barco. No forma parte del precio.
          </p>
        </div>
      </div>
    </section>
  );
}

function Cabecera({
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
