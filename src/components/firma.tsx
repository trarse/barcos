"use client";

import { useEffect, useRef, useState } from "react";

/** Firma digital del cliente: se dibuja sobre un lienzo y se guarda como imagen. */
export function Firma({ reservaId, firmaInicial }: { reservaId: string; firmaInicial: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dibujando = useRef(false);
  const [guardada, setGuardada] = useState<string | null>(firmaInicial);
  const [guardando, setGuardando] = useState(false);
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1f2937";
  }, []);

  function punto(e: React.PointerEvent<HTMLCanvasElement>): { x: number; y: number } {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  }

  function empezar(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    const canvas = canvasRef.current!;
    canvas.setPointerCapture(e.pointerId);
    dibujando.current = true;
    const ctx = canvas.getContext("2d")!;
    const p = punto(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function mover(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!dibujando.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = punto(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }

  function terminar() {
    dibujando.current = false;
  }

  function borrar() {
    const canvas = canvasRef.current!;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setGuardada(null);
  }

  async function guardar() {
    const canvas = canvasRef.current!;
    const url = canvas.toDataURL("image/png");
    setGuardando(true);
    setAviso("");
    try {
      const res = await fetch("/api/reservas/firma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservaId, firmaUrl: url }),
      });
      if (res.ok) {
        setGuardada(url);
        setAviso("Firma guardada.");
      } else {
        setAviso("No se pudo guardar la firma.");
      }
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="rounded-md border border-borde bg-superficie p-3">
      <p className="text-sm font-semibold text-texto">Firma del cliente</p>

      {guardada ? (
        <div className="mt-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={guardada} alt="Firma del cliente" className="h-20 rounded border border-borde bg-white" />
          <p className="mt-1 text-xs text-emerald-600">Firmado</p>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          width={480}
          height={140}
          className="mt-2 w-full touch-none rounded border border-borde bg-white"
          onPointerDown={empezar}
          onPointerMove={mover}
          onPointerUp={terminar}
          onPointerLeave={terminar}
        />
      )}

      {aviso && <p className="mt-1.5 text-xs font-medium text-acento">{aviso}</p>}

      <div className="mt-2 flex gap-2">
        <button type="button" onClick={borrar} className="rounded-md border border-borde px-3 py-1.5 text-xs font-medium text-texto-suave hover:bg-superficie-alt">
          Borrar
        </button>
        <button type="button" onClick={() => void guardar()} disabled={guardando} className="rounded-md bg-marca px-3 py-1.5 text-xs font-semibold text-fondo disabled:opacity-60">
          {guardando ? "Guardando…" : "Guardar firma"}
        </button>
      </div>
    </div>
  );
}
