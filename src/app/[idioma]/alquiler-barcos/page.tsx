import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Migas, migasBase } from "@/components/migas";
import { Paginacion } from "@/components/paginacion";
import { PanelFiltros } from "@/components/panel-filtros";
import { TarjetaBarco } from "@/components/tarjeta-barco";
import {
  buscarBarcos,
  listarDestinos,
  listarEquipamiento,
  listarTipos,
} from "@/lib/consultas";
import { aParams, leerFiltros } from "@/lib/filtros";
import { entero } from "@/lib/formato";
import { esIdioma } from "@/lib/idiomas";
import { alternativas, ruta } from "@/lib/rutas";
import { textos } from "@/lib/textos";

export async function generateMetadata(
  props: PageProps<"/[idioma]/alquiler-barcos">,
): Promise<Metadata> {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) return {};
  const t = textos(idioma);

  return {
    title: t.busqueda.titulo,
    description: t.portada.entradilla,
    alternates: alternativas({ tipo: "busqueda" }, idioma),
  };
}

export default async function Busqueda(
  props: PageProps<"/[idioma]/alquiler-barcos">,
) {
  const { idioma } = await props.params;
  if (!esIdioma(idioma)) notFound();

  const query = await props.searchParams;
  const t = textos(idioma);
  const filtros = leerFiltros(aParams(query));

  const [{ barcos, total, paginas }, tipos, equipamiento, destinos] =
    await Promise.all([
      buscarBarcos(filtros),
      listarTipos(),
      listarEquipamiento(),
      listarDestinos(),
    ]);

  const destino = destinos.find((d) => d.slug === filtros.destino);
  const tipo = tipos.find((x) => x.slug === filtros.tipo);

  // El titular se compone de dos piezas para que cada idioma coloque el
  // sustantivo y el complemento donde le corresponde.
  const encabezado = tipo
    ? t.busqueda.tituloConTipo(
        t.tiposBarco[tipo.slug as keyof typeof t.tiposBarco] ?? tipo.plural,
      )
    : t.busqueda.tituloGenerico;
  const lugar = destino
    ? t.busqueda.enDestino(destino.nombre)
    : t.busqueda.enEspana;
  const titulo = `${encabezado} ${lugar}`;

  const base = ruta({ tipo: "busqueda" }, idioma);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <Migas migas={migasBase(idioma)} idioma={idioma} />

      <h1 className="mt-6 font-display text-3xl font-semibold text-texto sm:text-4xl">
        {titulo}
      </h1>
      <p className="mt-2 text-texto-suave">
        {t.busqueda.resumen(entero(total), total === 1)}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
        <div>
          <details className="lg:hidden">
            <summary className="cursor-pointer rounded-md border border-borde bg-superficie px-4 py-3 font-medium text-texto">
              {t.busqueda.filtrarOrdenar}
            </summary>
            <div className="mt-4">
              <PanelFiltros
                filtros={filtros}
                tipos={tipos}
                equipamiento={equipamiento}
                accion={base}
                idioma={idioma}
              />
            </div>
          </details>

          <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <PanelFiltros
              filtros={filtros}
              tipos={tipos}
              equipamiento={equipamiento}
              accion={base}
              idioma={idioma}
            />
          </aside>
        </div>

        <div>
          {barcos.length === 0 ? (
            <div className="rounded-carta border border-borde bg-superficie p-10 text-center">
              <h2 className="font-display text-xl font-semibold text-texto">
                {t.busqueda.sinResultados}
              </h2>
              <p className="mx-auto mt-2 max-w-sm leading-relaxed text-texto-suave">
                {t.busqueda.sinResultadosTexto}
              </p>
              <Link
                href={base}
                className="mt-6 inline-block rounded-md bg-marca px-5 py-3 font-semibold text-fondo transition-opacity hover:opacity-90"
              >
                {t.portada.verTodos}
              </Link>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {barcos.map((barco, i) => (
                  <TarjetaBarco
                    key={barco.slug}
                    barco={barco}
                    idioma={idioma}
                    prioridad={i < 3}
                  />
                ))}
              </div>
              <Paginacion
                filtros={filtros}
                paginas={paginas}
                base={base}
                idioma={idioma}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
