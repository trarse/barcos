"use client";

import { useRef, useState } from "react";

/** Comparte la posición GPS del móvil (modo travesía) y genera un enlace de seguimiento. */
export function ModoTravesia({ barcoNombre }: { barcoNombre: string }) {
  const [token, setToken] = useState<string | null>(null);
  const [activo, setActivo] = useState(false);
  const [error, setError] = useState("");
  const [copiado, setCopiado] = useState(false);
  const tokenRef = useRef<string | null>(null);
  const watch = useRef<number | null>(null);

  const url = token ? `${window.location.origin}/travesia/${token}` : "";

  function enviar(pos: GeolocationPosition) {
    if (!tokenRef.current) return;
    void fetch("/api/travesia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accion: "posicion", token: tokenRef.current, lat: pos.coords.latitude, lng: pos.coords.longitude }),
    }).catch(() => {});
  }

  async function iniciar() {
    setError("");
    if (!("geolocation" in navigator)) {
      setError("Tu navegador no permite usar el GPS.");
      return;
    }
    const res = await fetch("/api/travesia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accion: "crear", barcoNombre }),
    });
    const datos = await res.json().catch(() => null);
    if (!datos?.token) {
      setError("No se pudo iniciar la travesía.");
      return;
    }
    tokenRef.current = datos.token;
    setToken(datos.token);
    setActivo(true);
    watch.current = navigator.geolocation.watchPosition(enviar, () => setError("No se pudo obtener posición GPS."), {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 15000,
    });
  }

  async function finalizar() {
    if (watch.current !== null) navigator.geolocation.clearWatch(watch.current);
    if (tokenRef.current) {
      await fetch("/api/travesia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accion: "fin", token: tokenRef.current }),
      }).catch(() => {});
    }
    setActivo(false);
  }

  function copiar() {
    void navigator.clipboard?.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div className="rounded-carta border border-borde bg-superficie p-4">
      <h3 className="text-sm font-semibold text-texto">Modo travesía</h3>
      <p className="mt-1 text-xs text-texto-suave">Comparte tu posición en vivo con un enlace (emula al AIS usando solo el GPS del móvil).</p>

      {error && <p className="mt-2 text-xs font-medium text-rose-600">{error}</p>}

      {!activo ? (
        <button type="button" onClick={() => void iniciar()} className="mt-3 rounded-md bg-marca px-4 py-2 text-sm font-semibold text-fondo hover:opacity-90">
          Iniciar travesía
        </button>
      ) : (
        <div className="mt-3 space-y-3">
          <div className="rounded-md border border-emerald-500/40 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            Compartiendo posición en vivo…
          </div>
          <div className="flex items-center gap-2">
            <input readOnly value={url} className="flex-1 rounded-md border border-borde bg-fondo px-3 py-2 text-xs text-texto" />
            <button type="button" onClick={copiar} className="rounded-md border border-borde px-3 py-2 text-xs font-medium text-texto-suave">
              {copiado ? "Copiado" : "Copiar"}
            </button>
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-acento underline">
            Ver seguimiento →
          </a>
          <button type="button" onClick={() => void finalizar()} className="rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700">
            Finalizar travesía
          </button>
        </div>
      )}
    </div>
  );
}
