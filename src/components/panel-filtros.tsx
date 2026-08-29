import Link from "next/link";

import { contarActivos, type Filtros, type Orden } from "@/lib/filtros";
import { euro } from "@/lib/formato";
import type { Idioma } from "@/lib/idiomas";
import { textos } from "@/lib/textos";

interface Opcion {
  slug: string;
  nombre: string;
}

const TOPES = [15_000, 30_000, 60_000, 120_000, 250_000];

/**
 * Filtros como formulario GET.
 *
 * Sin estado de cliente: al enviar, el navegador construye la query y la
 * página se vuelve a renderizar en el servidor. Funciona sin JavaScript, la
 * URL resultante es compartible y cada combinación es rastreable.
 */
export function PanelFiltros({
  filtros,
  tipos,
  equipamiento,
  accion,
  idioma,
  /** Cuando la ruta ya fija el destino, va oculto para no perderlo al filtrar. */
  destinoFijo,
}: {
  filtros: Filtros;
  tipos: Opcion[];
  equipamiento: { slug: string; nombre: string; grupo: string }[];
  accion: string;
  idioma: Idioma;
  destinoFijo?: string;
}) {
  const t = textos(idioma);
  const activos = contarActivos(filtros);

  const ordenes: { valor: Orden; texto: string }[] = [
    { valor: "recomendados", texto: t.filtros.ordenes.recomendados },
    { valor: "precio-asc", texto: t.filtros.ordenes.precioAsc },
    { valor: "precio-desc", texto: t.filtros.ordenes.precioDesc },
    { valor: "valoracion", texto: t.filtros.ordenes.valoracion },
  ];

  return (
    <form action={accion} method="get" className="text-sm">
      {destinoFijo && <input type="hidden" name="destino" value={destinoFijo} />}
      {!destinoFijo && filtros.destino && (
        <input type="hidden" name="destino" value={filtros.destino} />
      )}

      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-lg font-semibold text-texto">
          {t.filtros.titulo}
        </h2>
        {activos > 0 && (
          <Link
            href={destinoFijo ? `${accion}?destino=${destinoFijo}` : accion}
            className="text-xs font-medium text-acento hover:underline"
          >
            {t.filtros.quitar(activos)}
          </Link>
        )}
      </div>

      <Grupo titulo={t.filtros.tipoBarco}>
        <select
          name="tipo"
          defaultValue={filtros.tipo ?? ""}
          className="w-full rounded-md border border-borde bg-superficie px-3 py-2 text-texto"
        >
          <option value="">{t.filtros.cualquiera}</option>
          {tipos.map((tipo) => (
            <option key={tipo.slug} value={tipo.slug}>
              {t.tiposBarcoSingular[tipo.slug as keyof typeof t.tiposBarcoSingular] ??
                tipo.nombre}
            </option>
          ))}
        </select>
      </Grupo>

      <Grupo titulo={t.filtros.personas}>
        <select
          name="capacidad"
          defaultValue={filtros.capacidadMinima ?? ""}
          className="w-full rounded-md border border-borde bg-superficie px-3 py-2 text-texto"
        >
          <option value="">{t.filtros.lasQueSean}</option>
          {[2, 4, 6, 8, 10, 12].map((n) => (
            <option key={n} value={n}>
              {t.filtros.oMas(n)}
            </option>
          ))}
        </select>
      </Grupo>

      <Grupo titulo={t.filtros.precioMaximo}>
        <select
          name="precio"
          defaultValue={filtros.precioMaximo ?? ""}
          className="w-full rounded-md border border-borde bg-superficie px-3 py-2 text-texto"
        >
          <option value="">{t.filtros.sinTope}</option>
          {TOPES.map((tope) => (
            <option key={tope} value={tope}>
              {t.filtros.hasta(euro(tope))}
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-xs leading-relaxed text-texto-tenue">
          {t.filtros.notaPrecio}
        </p>
      </Grupo>

      <Grupo titulo={t.filtros.condiciones}>
        <div className="space-y-2.5">
          <Casilla
            nombre="sin-licencia"
            marcada={filtros.sinLicencia}
            texto={t.filtros.puedoSinTitulacion}
          />
          <Casilla
            nombre="patron"
            marcada={filtros.conPatron}
            texto={t.filtros.conPatron}
          />
          <Casilla
            nombre="instantanea"
            marcada={filtros.reservaInstantanea}
            texto={t.filtros.reservaInmediata}
          />
        </div>
      </Grupo>

      <Grupo titulo={t.filtros.equipamiento}>
        <fieldset className="space-y-2.5">
          <legend className="sr-only">{t.filtros.equipamientoLeyenda}</legend>
          {equipamiento.map((pieza) => (
            <label key={pieza.slug} className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                name="equipo"
                value={pieza.slug}
                defaultChecked={filtros.equipamiento.includes(pieza.slug)}
                className="h-4 w-4 accent-[var(--acento)]"
              />
              <span className="text-texto">{pieza.nombre}</span>
            </label>
          ))}
        </fieldset>
        <p className="mt-2 text-xs leading-relaxed text-texto-tenue">
          {t.filtros.notaEquipamiento}
        </p>
      </Grupo>

      <Grupo titulo={t.filtros.ordenarPor}>
        <select
          name="orden"
          defaultValue={filtros.orden}
          className="w-full rounded-md border border-borde bg-superficie px-3 py-2 text-texto"
        >
          {ordenes.map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.texto}
            </option>
          ))}
        </select>
      </Grupo>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-marca px-5 py-3 font-semibold text-fondo transition-opacity hover:opacity-90"
      >
        {t.filtros.aplicar}
      </button>
    </form>
  );
}

function Grupo({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-t border-borde pt-5">
      <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-texto-tenue">
        {titulo}
      </h3>
      {children}
    </div>
  );
}

function Casilla({
  nombre,
  marcada,
  texto,
}: {
  nombre: string;
  marcada: boolean;
  texto: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      {/* El valor "1" es lo que espera `leerFiltros`. */}
      <input
        type="checkbox"
        name={nombre}
        value="1"
        defaultChecked={marcada}
        className="h-4 w-4 accent-[var(--acento)]"
      />
      <span className="text-texto">{texto}</span>
    </label>
  );
}
