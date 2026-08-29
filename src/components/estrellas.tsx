import { entero, valoracion as formatearNota } from "@/lib/formato";
import type { Idioma } from "@/lib/idiomas";
import { textos } from "@/lib/textos";

/**
 * Valoración media. El relleno parcial se hace con un degradado sobre la misma
 * estrella en lugar de recortar con máscaras: sobrevive mejor al zoom.
 */
export function Estrellas({
  nota,
  opiniones,
  idioma,
  tamano = "normal",
}: {
  nota: number;
  opiniones?: number;
  idioma: Idioma;
  tamano?: "normal" | "grande";
}) {
  const t = textos(idioma);
  const grande = tamano === "grande";
  const px = grande ? "h-4.5 w-4.5" : "h-3.5 w-3.5";

  return (
    <span className="flex items-center gap-1.5">
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Estrella key={i} relleno={Math.min(1, Math.max(0, nota - i))} className={px} />
        ))}
      </span>
      <span
        className={`cifra font-medium text-texto ${grande ? "text-base" : "text-sm"}`}
      >
        {formatearNota(nota)}
      </span>
      {opiniones !== undefined && (
        <span className={`text-texto-tenue ${grande ? "text-sm" : "text-xs"}`}>
          ({entero(opiniones)})
        </span>
      )}
      <span className="sr-only">
        {opiniones === undefined
          ? t.comun.sobreCinco(formatearNota(nota))
          : t.comun.sobreCincoConOpiniones(formatearNota(nota), entero(opiniones))}
      </span>
    </span>
  );
}

function Estrella({ relleno, className }: { relleno: number; className: string }) {
  const id = `estrella-${Math.round(relleno * 100)}`;
  const punta =
    "M8 1.2l2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 11.9 3.8 14.2l.8-4.7L1.2 6.2l4.7-.7z";

  if (relleno >= 1) {
    return (
      <svg viewBox="0 0 16 16" className={`${className} fill-acento`} aria-hidden="true">
        <path d={punta} />
      </svg>
    );
  }

  if (relleno <= 0) {
    return (
      <svg viewBox="0 0 16 16" className={`${className} fill-borde-fuerte`} aria-hidden="true">
        <path d={punta} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id}>
          <stop offset={`${relleno * 100}%`} stopColor="var(--acento)" />
          <stop offset={`${relleno * 100}%`} stopColor="var(--borde-fuerte)" />
        </linearGradient>
      </defs>
      <path d={punta} fill={`url(#${id})`} />
    </svg>
  );
}
