"use client";

import { useCallback, useEffect, useState } from "react";

const ITEMS = [
  "Casco sin golpes ni rayadas nuevas",
  "Hélice y obra viva en buen estado",
  "Motor arranca y suena correcto",
  "Depósito de combustible",
  "Bengalas y material de seguridad",
  "Chalecos salvavidas completos",
  "Electrónica (GPS, VHF, luces)",
  "Interior limpio y sin desperfectos",
];

type Foto = { url: string; creadoEn: string };
type Parte = {
  id: string;
  tipo: string;
  items: Array<{ texto: string; ok: boolean }>;
  notas: string | null;
  creadoEn: string;
  fotos: Foto[];
};

function fecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/** Redimensiona una imagen a un JPEG compacto (máx 900 px) y devuelve un data URL. */
function comprimir(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 900;
        const ratio = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("canvas"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = reject;
      img.src = String(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Parte de entrega/recogida de una reserva: checklist con fotos fechadas. */
export function ParteEntrega({ reservaId, referencia }: { reservaId: string; referencia: string }) {
  const [partes, setPartes] = useState<Parte[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [tipo, setTipo] = useState<"salida" | "entrada">("salida");
  const [checks, setChecks] = useState<boolean[]>(ITEMS.map(() => true));
  const [notas, setNotas] = useState("");
  const [fotos, setFotos] = useState<string[]>([]);
  const [guardando, setGuardando] = useState(false);
  const [aviso, setAviso] = useState("");

  const cargar = useCallback(async () => {
    try {
      const r = await fetch(`/api/partes?reservaId=${encodeURIComponent(reservaId)}`).then((x) => x.json());
      setPartes(r?.partes ?? []);
    } finally {
      setCargando(false);
    }
  }, [reservaId]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  async function alSubirFotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 6);
    const urls = await Promise.all(files.map((f) => comprimir(f)));
    setFotos((prev) => [...prev, ...urls].slice(0, 12));
    e.target.value = "";
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setGuardando(true);
    setAviso("");
    try {
      const res = await fetch("/api/partes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reservaId,
          tipo,
          items: ITEMS.map((texto, i) => ({ texto, ok: checks[i] })),
          notas,
          fotos,
        }),
      });
      if (!res.ok) {
        setAviso("No se pudo guardar el parte.");
        return;
      }
      setAviso("Parte guardado.");
      setMostrarForm(false);
      setFotos([]);
      setNotas("");
      setChecks(ITEMS.map(() => true));
      void cargar();
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="mt-4 rounded-md border border-borde bg-fondo p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-texto">
          Partes de entrega <span className="font-mono text-texto-suave">({referencia})</span>
        </p>
        <button
          type="button"
          onClick={() => setMostrarForm((v) => !v)}
          className="rounded-md border border-borde px-3 py-1.5 text-xs font-medium text-texto-suave hover:border-acento hover:text-acento"
        >
          {mostrarForm ? "Cerrar" : "Nuevo parte"}
        </button>
      </div>

      {aviso && <p className="mt-2 text-xs font-medium text-acento">{aviso}</p>}

      {mostrarForm && (
        <form onSubmit={guardar} className="mt-3 space-y-4 border-t border-borde pt-3">
          <div className="flex gap-2">
            <label className="flex items-center gap-1.5 text-sm text-texto">
              <input type="radio" name="tipo" checked={tipo === "salida"} onChange={() => setTipo("salida")} className="accent-[var(--acento)]" />
              Salida (embarque)
            </label>
            <label className="flex items-center gap-1.5 text-sm text-texto">
              <input type="radio" name="tipo" checked={tipo === "entrada"} onChange={() => setTipo("entrada")} className="accent-[var(--acento)]" />
              Entrada (devolución)
            </label>
          </div>

          <ul className="grid gap-1.5 sm:grid-cols-2">
            {ITEMS.map((texto, i) => (
              <li key={texto}>
                <label className="flex items-start gap-2 rounded border border-borde bg-superficie px-2.5 py-1.5 text-sm text-texto">
                  <input
                    type="checkbox"
                    checked={checks[i]}
                    onChange={(e) => setChecks((prev) => prev.map((v, j) => (j === i ? e.target.checked : v)))}
                    className="mt-0.5 h-4 w-4 accent-[var(--exito)]"
                  />
                  <span className={checks[i] ? "" : "text-rose-600"}>{texto}</span>
                </label>
              </li>
            ))}
          </ul>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-texto-tenue">Fotos (máx. 6 por parte)</span>
            <input type="file" accept="image/*" multiple onChange={alSubirFotos} className="mt-1 text-sm text-texto-suave" />
          </label>
          {fotos.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {fotos.map((url, i) => (
                <div key={i} className="relative h-20 w-20 overflow-hidden rounded border border-borde">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setFotos((prev) => prev.filter((_, j) => j !== i))}
                    className="absolute right-0 top-0 bg-rose-600 px-1.5 text-xs font-bold text-white"
                    aria-label="Quitar foto"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            rows={2}
            placeholder="Observaciones (opcional)"
            className="w-full rounded-md border border-borde bg-fondo px-3 py-2 text-sm text-texto"
          />

          <button type="submit" disabled={guardando} className="rounded-md bg-marca px-4 py-2 text-sm font-semibold text-fondo disabled:opacity-60">
            {guardando ? "Guardando…" : "Guardar parte"}
          </button>
        </form>
      )}

      {cargando ? (
        <p className="mt-3 text-xs text-texto-suave">Cargando…</p>
      ) : partes.length === 0 ? (
        <p className="mt-3 text-xs text-texto-suave">Aún no hay partes para esta reserva.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {partes.map((p) => (
            <li key={p.id} className="rounded border border-borde bg-superficie p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-acento">
                {p.tipo === "salida" ? "Salida" : "Entrada"} · {fecha(p.creadoEn)}
              </p>
              {(p.items as Array<{ texto: string; ok: boolean }>).map((it) => (
                <p key={it.texto} className="mt-1 text-sm text-texto-suave">
                  <span className={it.ok ? "text-exito" : "text-rose-600"}>{it.ok ? "✓" : "✕"}</span> {it.texto}
                </p>
              ))}
              {p.notas && <p className="mt-1 text-xs text-texto-suave">{p.notas}</p>}
              {p.fotos.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.fotos.map((f) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={f.url} src={f.url} alt="Foto del parte" className="h-14 w-14 rounded object-cover" />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
