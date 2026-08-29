/**
 * Marca: un burgee, el galardete triangular que iza cada club náutico en la
 * cruceta. Dos franjas y la punta que apunta a barlovento.
 */
export function Burgee({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Estribor">
      {/* Driza */}
      <line x1="5" y1="3" x2="5" y2="29" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {/* Galardete: triángulo con muesca en el batiente */}
      <path d="M 7 5 L 29 11.5 L 20 14.5 L 29 17.5 L 7 24 Z" fill="currentColor" />
      {/* Baliza */}
      <circle cx="12.5" cy="14.5" r="2.6" className="fill-fondo" />
    </svg>
  );
}
