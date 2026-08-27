import { rutas } from "@/lib/seo";

interface Opcion {
  slug: string;
  nombre: string;
}

/**
 * Buscador principal.
 *
 * Es un formulario GET normal contra la página de resultados: los nombres de
 * los campos coinciden con los que lee `leerFiltros`, así que la búsqueda
 * funciona antes de que hidrate nada y la URL resultante se puede compartir.
 */
export function Buscador({
  destinos,
  tipos,
  destinoFijo,
  tipoFijo,
  compacto = false,
}: {
  destinos: Opcion[];
  tipos: Opcion[];
  destinoFijo?: string;
  tipoFijo?: string;
  compacto?: boolean;
}) {
  return (
    <form
      action={rutas.busqueda()}
      method="get"
      className={`grid gap-2 rounded-carta border border-borde bg-superficie p-2 shadow-[0_4px_24px_-8px_rgb(var(--sombra)/0.25)] ${
        compacto ? "sm:grid-cols-[1fr_1fr_auto]" : "sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_auto]"
      }`}
    >
      <Campo etiqueta="Destino" htmlFor="q-destino">
        <select
          id="q-destino"
          name="destino"
          defaultValue={destinoFijo ?? ""}
          className="w-full bg-transparent text-base font-medium text-texto outline-none"
        >
          <option value="">Cualquier destino</option>
          {destinos.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.nombre}
            </option>
          ))}
        </select>
      </Campo>

      <Campo etiqueta="Tipo de barco" htmlFor="q-tipo">
        <select
          id="q-tipo"
          name="tipo"
          defaultValue={tipoFijo ?? ""}
          className="w-full bg-transparent text-base font-medium text-texto outline-none"
        >
          <option value="">Cualquier tipo</option>
          {tipos.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.nombre}
            </option>
          ))}
        </select>
      </Campo>

      {!compacto && (
        <Campo etiqueta="Personas" htmlFor="q-capacidad">
          <select
            id="q-capacidad"
            name="capacidad"
            defaultValue=""
            className="w-full bg-transparent text-base font-medium text-texto outline-none"
          >
            <option value="">Las que sean</option>
            {[2, 4, 6, 8, 10, 12].map((n) => (
              <option key={n} value={n}>
                {n} o más
              </option>
            ))}
          </select>
        </Campo>
      )}

      <button
        type="submit"
        className="rounded-md bg-marca px-6 py-3.5 text-base font-semibold text-fondo transition-opacity hover:opacity-90"
      >
        Ver barcos
      </button>
    </form>
  );
}

function Campo({
  etiqueta,
  htmlFor,
  children,
}: {
  etiqueta: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md px-3.5 py-2 transition-colors focus-within:bg-superficie-alt">
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold uppercase tracking-wider text-texto-tenue"
      >
        {etiqueta}
      </label>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}
