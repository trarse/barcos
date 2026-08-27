import { Fragment } from "react";

/**
 * Renderiza el cuerpo de un artículo.
 *
 * Entiende dos cosas y solo dos: `### Titular` y `**negrita**`. No se usa un
 * intérprete de Markdown a propósito —construye HTML a partir de texto, y eso
 * es una superficie de inyección que este contenido no necesita. Aquí se
 * generan elementos de React, así que nada de lo que ponga el texto puede
 * convertirse en marcado.
 */
export function CuerpoArticulo({ texto }: { texto: string }) {
  const bloques = texto
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className="space-y-5">
      {bloques.map((bloque, i) => {
        if (bloque.startsWith("### ")) {
          return (
            <h2
              key={i}
              className="pt-4 font-display text-2xl font-semibold text-texto"
            >
              {bloque.slice(4)}
            </h2>
          );
        }

        if (bloque.startsWith("- ")) {
          const puntos = bloque
            .split("\n")
            .map((l) => l.replace(/^-\s*/, "").trim())
            .filter(Boolean);
          return (
            <ul key={i} className="max-w-[68ch] space-y-2 pl-5">
              {puntos.map((punto, j) => (
                <li key={j} className="list-disc leading-relaxed text-texto-suave">
                  <Negritas texto={punto} />
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="max-w-[68ch] leading-relaxed text-texto-suave">
            <Negritas texto={bloque} />
          </p>
        );
      })}
    </div>
  );
}

/** Parte el texto por `**...**` y marca los tramos impares como fuertes. */
function Negritas({ texto }: { texto: string }) {
  const tramos = texto.split(/\*\*(.+?)\*\*/g);

  return (
    <>
      {tramos.map((tramo, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-texto">
            {tramo}
          </strong>
        ) : (
          <Fragment key={i}>{tramo}</Fragment>
        ),
      )}
    </>
  );
}
