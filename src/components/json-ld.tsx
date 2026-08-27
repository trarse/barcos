/**
 * Vuelca un objeto como datos estructurados.
 *
 * Se escapa `<` para que un texto que venga de la base de datos no pueda
 * cerrar la etiqueta script e inyectar marcado.
 */
export function JsonLd({ datos }: { datos: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(datos).replace(/</g, "\\u003c"),
      }}
    />
  );
}
