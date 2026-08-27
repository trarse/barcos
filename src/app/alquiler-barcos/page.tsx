import type { Metadata } from "next";
import Link from "next/link";

import { Migas } from "@/components/migas";
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
import { rutas } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Alquiler de barcos en España",
  description:
    "Busca entre toda la flota con el precio final calculado: combustible, limpieza, amarre, tasas e IVA incluidos. Filtra por destino, tipo, capacidad y equipamiento.",
  alternates: { canonical: rutas.busqueda() },
};

export default async function Busqueda(props: PageProps<"/alquiler-barcos">) {
  const params = await props.searchParams;
  const filtros = leerFiltros(aParams(params));

  const [{ barcos, total, paginas }, tipos, equipamiento, destinos] =
    await Promise.all([
      buscarBarcos(filtros),
      listarTipos(),
      listarEquipamiento(),
      listarDestinos(),
    ]);

  const destino = destinos.find((d) => d.slug === filtros.destino);
  const tipo = tipos.find((t) => t.slug === filtros.tipo);

  const titulo = [
    tipo ? `Alquiler de ${tipo.plural.toLowerCase()}` : "Alquiler de barcos",
    destino ? `en ${destino.nombre}` : "en España",
  ].join(" ");

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <Migas
        migas={[
          { nombre: "Inicio", ruta: rutas.home() },
          { nombre: "Alquiler de barcos", ruta: rutas.busqueda() },
        ]}
      />

      <h1 className="mt-6 font-display text-3xl font-semibold text-texto sm:text-4xl">
        {titulo}
      </h1>
      <p className="mt-2 text-texto-suave">
        {entero(total)} {total === 1 ? "barco" : "barcos"} con el precio
        completo calculado. Sin extras al pagar.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
        {/* Filtros: plegados en móvil, fijos en escritorio */}
        <div>
          <details className="lg:hidden" open={false}>
            <summary className="cursor-pointer rounded-md border border-borde bg-superficie px-4 py-3 font-medium text-texto">
              Filtrar y ordenar
            </summary>
            <div className="mt-4">
              <PanelFiltros
                filtros={filtros}
                tipos={tipos}
                equipamiento={equipamiento}
                accion={rutas.busqueda()}
              />
            </div>
          </details>

          <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <PanelFiltros
              filtros={filtros}
              tipos={tipos}
              equipamiento={equipamiento}
              accion={rutas.busqueda()}
            />
          </aside>
        </div>

        <div>
          {barcos.length === 0 ? (
            <SinResultados />
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {barcos.map((barco, i) => (
                  <TarjetaBarco key={barco.slug} barco={barco} prioridad={i < 3} />
                ))}
              </div>
              <Paginacion filtros={filtros} paginas={paginas} base={rutas.busqueda()} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SinResultados() {
  return (
    <div className="rounded-carta border border-borde bg-superficie p-10 text-center">
      <h2 className="font-display text-xl font-semibold text-texto">
        Ningún barco cumple todo eso
      </h2>
      <p className="mx-auto mt-2 max-w-sm leading-relaxed text-texto-suave">
        Prueba a subir el tope de precio o a quitar alguna pieza de
        equipamiento: suelen ser los filtros que más estrechan la búsqueda.
      </p>
      <Link
        href={rutas.busqueda()}
        className="mt-6 inline-block rounded-md bg-marca px-5 py-3 font-semibold text-fondo transition-opacity hover:opacity-90"
      >
        Ver todos los barcos
      </Link>
    </div>
  );
}
