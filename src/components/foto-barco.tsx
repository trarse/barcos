/**
 * Ilustración de cada embarcación, dibujada como una carta náutica.
 *
 * Mientras no haya fotografía real de la flota, esto es mejor que un banco de
 * imágenes genérico: es coherente con la identidad, pesa unos pocos kilobytes,
 * no depende de ningún dominio externo y se adapta al tema oscuro sola. Todos
 * los colores salen de los tokens semánticos.
 *
 * El token que guarda la base de datos es `carta:<tipo>:<variante>`.
 */

type Props = {
  /** Token `carta:tipo:variante` o simplemente el slug del tipo. */
  token: string;
  className?: string;
  /** Texto alternativo. Si se omite, la imagen se marca como decorativa. */
  alt?: string;
  prioridad?: boolean;
};

interface Escena {
  tipo: string;
  variante: number;
}

export function leerToken(token: string): Escena {
  const partes = token.replace(/^carta:/, "").split(":");
  return {
    tipo: partes[0] ?? "lancha",
    variante: Number.parseInt(partes[1] ?? "0", 10) || 0,
  };
}

export function FotoBarco({ token, className, alt, prioridad = false }: Props) {
  const { tipo, variante } = leerToken(token);
  const id = `${tipo}-${variante}`;

  // La variante mueve el horizonte y la costa para que dos barcos del mismo
  // tipo no se vean idénticos en una parrilla de resultados.
  const costaAltura = 28 + (variante % 3) * 9;
  const costaDesde = variante % 2 === 0 ? "izquierda" : "derecha";
  const sol = 88 + (variante % 4) * 46;

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role={alt ? "img" : "presentation"}
      aria-label={alt}
      aria-hidden={alt ? undefined : true}
      preserveAspectRatio="xMidYMid slice"
      {...(prioridad ? {} : { loading: "lazy" as const })}
    >
      <defs>
        <linearGradient id={`cielo-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--superficie-alt)" />
          <stop offset="100%" stopColor="var(--marca-suave)" />
        </linearGradient>
        <clipPath id={`agua-${id}`}>
          <rect x="0" y="196" width="400" height="104" />
        </clipPath>
      </defs>

      {/* Cielo y retícula de meridianos */}
      <rect width="400" height="300" fill={`url(#cielo-${id})`} />
      <g stroke="var(--borde-fuerte)" strokeWidth="0.6" opacity="0.35">
        {[56, 112, 168, 224, 280, 336].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="300" />
        ))}
        {[52, 108, 164, 252].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} />
        ))}
      </g>

      {/* Sol bajo, del color de la baliza */}
      <circle cx={sol} cy="72" r="17" fill="var(--acento)" opacity="0.35" />

      <Costa altura={costaAltura} desde={costaDesde} />

      {/* Mar */}
      <rect x="0" y="196" width="400" height="104" fill="var(--marca)" opacity="0.16" />
      <line x1="0" y1="196" x2="400" y2="196" stroke="var(--marca)" strokeWidth="1.2" opacity="0.5" />

      <g clipPath={`url(#agua-${id})`} stroke="var(--marca)" strokeWidth="1.1" opacity="0.3" fill="none">
        {[214, 236, 258, 280].map((y, i) => (
          <path
            key={y}
            d={`M ${-20 + i * 9} ${y} q 22 -6 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0`}
          />
        ))}
      </g>

      {/* Sondas: las cifras de profundidad de una carta real */}
      <g
        fill="var(--marca)"
        opacity="0.5"
        fontSize="9"
        fontFamily="var(--fuente-sans), sans-serif"
      >
        <text x="42" y="232">18</text>
        <text x="122" y="266">24</text>
        <text x="286" y="228">31</text>
        <text x="342" y="270">27</text>
      </g>

      <Silueta tipo={tipo} />
    </svg>
  );
}

function Costa({ altura, desde }: { altura: number; desde: "izquierda" | "derecha" }) {
  const base = 196;
  const d =
    desde === "izquierda"
      ? `M 0 ${base} L 0 ${base - altura} q 34 -14 66 2 t 58 6 q 26 4 44 ${altura / 3} L 172 ${base} Z`
      : `M 400 ${base} L 400 ${base - altura} q -34 -14 -66 2 t -58 6 q -26 4 -44 ${altura / 3} L 228 ${base} Z`;

  return <path d={d} fill="var(--borde-fuerte)" opacity="0.55" />;
}

/** Siluetas por tipo. Van apoyadas en la línea de flotación, y = 196. */
function Silueta({ tipo }: { tipo: string }) {
  const casco = "var(--marca)";
  const detalle = "var(--acento)";

  switch (tipo) {
    case "velero":
      return (
        <g>
          {/* Palo y jarcia */}
          <line x1="196" y1="188" x2="196" y2="62" stroke={casco} strokeWidth="2.5" />
          {/* Mayor */}
          <path d="M 199 68 L 199 178 L 246 178 Z" fill={casco} opacity="0.85" />
          {/* Génova */}
          <path d="M 192 74 L 192 178 L 146 178 Z" fill={detalle} opacity="0.7" />
          {/* Casco */}
          <path d="M 138 178 L 258 178 L 240 196 L 156 196 Z" fill={casco} />
        </g>
      );

    case "catamaran":
      return (
        <g>
          <line x1="200" y1="176" x2="200" y2="66" stroke={casco} strokeWidth="2.5" />
          <path d="M 203 72 L 203 168 L 250 168 Z" fill={casco} opacity="0.85" />
          <path d="M 196 78 L 196 168 L 152 168 Z" fill={detalle} opacity="0.7" />
          {/* Plataforma entre cascos */}
          <rect x="140" y="168" width="120" height="9" rx="2" fill={casco} />
          {/* Dos cascos */}
          <path d="M 140 177 L 176 177 L 168 196 L 146 196 Z" fill={casco} />
          <path d="M 224 177 L 260 177 L 254 196 L 232 196 Z" fill={casco} />
        </g>
      );

    case "lancha":
      return (
        <g>
          {/* Parabrisas */}
          <path d="M 186 160 L 214 160 L 220 176 L 186 176 Z" fill={detalle} opacity="0.75" />
          {/* Toldo */}
          <rect x="180" y="152" width="52" height="4" rx="2" fill={casco} />
          <line x1="182" y1="156" x2="182" y2="176" stroke={casco} strokeWidth="2" />
          <line x1="230" y1="156" x2="230" y2="176" stroke={casco} strokeWidth="2" />
          {/* Casco planeador */}
          <path d="M 132 176 L 268 176 L 252 196 L 152 196 Z" fill={casco} />
          <path d="M 268 176 L 278 182 L 268 186 Z" fill={casco} opacity="0.6" />
        </g>
      );

    case "neumatica":
      return (
        <g>
          {/* Consola */}
          <path d="M 194 164 L 214 164 L 216 178 L 194 178 Z" fill={detalle} opacity="0.75" />
          {/* Flotadores */}
          <rect x="146" y="178" width="112" height="13" rx="6.5" fill={casco} />
          <path d="M 258 178 q 14 3 14 6.5 t -14 6.5 Z" fill={casco} />
          {/* Fueraborda */}
          <rect x="140" y="176" width="8" height="18" rx="2" fill={casco} opacity="0.7" />
        </g>
      );

    case "yate":
      return (
        <g>
          {/* Flybridge */}
          <path d="M 186 138 L 236 138 L 240 152 L 186 152 Z" fill={detalle} opacity="0.7" />
          <rect x="182" y="132" width="60" height="4" rx="2" fill={casco} />
          {/* Superestructura */}
          <path d="M 168 152 L 252 152 L 258 172 L 168 172 Z" fill={casco} opacity="0.9" />
          {/* Casco */}
          <path d="M 118 172 L 284 172 L 264 196 L 140 196 Z" fill={casco} />
          <line x1="130" y1="182" x2="272" y2="182" stroke="var(--superficie)" strokeWidth="1.6" opacity="0.5" />
        </g>
      );

    case "llaut":
      return (
        <g>
          {/* Toldo de madera */}
          <rect x="176" y="156" width="66" height="4" rx="2" fill={detalle} opacity="0.8" />
          <line x1="180" y1="160" x2="180" y2="180" stroke={casco} strokeWidth="2" />
          <line x1="238" y1="160" x2="238" y2="180" stroke={casco} strokeWidth="2" />
          {/* Casco de proa lanzada, la firma del llaüt */}
          <path
            d="M 262 168 q -6 12 -14 14 L 152 182 q -14 2 -18 8 q 10 6 26 6 L 244 196 q 16 0 22 -14 Z"
            fill={casco}
          />
        </g>
      );

    case "casa-flotante":
      return (
        <g>
          {/* Tejado */}
          <path d="M 148 146 L 252 146 L 244 156 L 156 156 Z" fill={detalle} opacity="0.75" />
          {/* Cuerpo */}
          <rect x="156" y="156" width="88" height="26" fill={casco} opacity="0.9" />
          <rect x="168" y="162" width="16" height="12" fill="var(--superficie)" opacity="0.7" />
          <rect x="192" y="162" width="16" height="12" fill="var(--superficie)" opacity="0.7" />
          <rect x="216" y="162" width="16" height="12" fill="var(--superficie)" opacity="0.7" />
          {/* Pontón */}
          <rect x="142" y="182" width="116" height="12" rx="3" fill={casco} />
        </g>
      );

    default:
      return (
        <path d="M 138 178 L 262 178 L 244 196 L 156 196 Z" fill={casco} />
      );
  }
}
