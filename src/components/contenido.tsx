/**
 * Texto largo de las landings.
 *
 * Los contenidos vienen de la base separados por líneas en blanco. No se
 * interpreta Markdown a propósito: es texto plano de redacción, y meter un
 * intérprete aquí solo abriría la puerta a inyectar marcado desde la base.
 */
export function Contenido({ texto }: { texto: string }) {
  const parrafos = texto
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4">
      {parrafos.map((parrafo, i) => (
        <p key={i} className="max-w-[68ch] leading-relaxed text-texto-suave">
          {parrafo}
        </p>
      ))}
    </div>
  );
}
