"use client";

function euros(centimos: number): string {
  return (centimos / 100).toLocaleString("es-ES", { style: "currency", currency: "EUR" });
}

/** Media orientativa de ingresos por barco y año en el chárter de la Costa Blanca. */
const MEDIA_PROVINCIAL_POR_BARCO = 1_500_000; // 15.000 €/barco/año

/**
 * Compara la rentabilidad por barco del armador con la media provincial
 * (censo orientativo del sector). Los números del armador son reales; la
 * referencia provincial es una estimación de mercado para contextualizar.
 */
export function ComparativaProvincial({ ingresosCents, numBarcos }: { ingresosCents: number; numBarcos: number }) {
  if (numBarcos === 0) return null;

  const porBarco = ingresosCents / numBarcos;
  const dif = MEDIA_PROVINCIAL_POR_BARCO > 0 ? ((porBarco - MEDIA_PROVINCIAL_POR_BARCO) / MEDIA_PROVINCIAL_POR_BARCO) * 100 : 0;
  const porEncima = dif >= 0;

  return (
    <div className="overflow-hidden rounded-carta border border-borde bg-superficie">
      <div className="border-b border-borde px-4 py-3">
        <h3 className="text-sm font-semibold text-texto">Comparativa provincial</h3>
        <p className="mt-0.5 text-xs text-texto-suave">Tu rentabilidad por barco frente a la media estimada del chárter en la Costa Blanca.</p>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        <div className="rounded-md border border-borde bg-fondo p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Tu flota · por barco</p>
          <p className="cifra mt-1 font-display text-2xl font-semibold text-texto">{euros(porBarco)}</p>
          <p className="mt-0.5 text-xs text-texto-suave">{numBarcos} {numBarcos === 1 ? "barco" : "barcos"} (ingresos realizados)</p>
        </div>
        <div className="rounded-md border border-borde bg-fondo p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Media Costa Blanca · por barco</p>
          <p className="cifra mt-1 font-display text-2xl font-semibold text-texto">{euros(MEDIA_PROVINCIAL_POR_BARCO)}</p>
          <p className="mt-0.5 text-xs text-texto-suave">referencia orientativa por temporada</p>
        </div>
      </div>
      <p className={`px-4 pb-4 text-sm font-semibold ${porEncima ? "text-emerald-600" : "text-amber-600"}`}>
        {porEncima
          ? `Estás un ${dif.toFixed(0)} % por encima de la media provincial.`
          : `Estás un ${Math.abs(dif).toFixed(0)} % por debajo de la media provincial.`}
      </p>
    </div>
  );
}
