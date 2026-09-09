"use client";

import { useState } from "react";

type Idioma = "es" | "en" | "de";
type Variante = "puerto" | "normativa" | "armador";

const T: Record<Idioma, Record<Variante, { titular: string; texto: string; correo: string; boton: string; hecho: string }>> = {
  es: {
    puerto: {
      titular: "Avisadme cuando abráis en mi puerto",
      texto: "Déjanos tu correo y te avisamos cuando haya barcos en este puerto.",
      correo: "Tu correo",
      boton: "Avisadme",
      hecho: "Listo. Te avisaremos cuando haya novedades en este puerto.",
    },
    normativa: {
      titular: "Avisadme si cambia la normativa",
      texto: "Te escribimos solo si cambian los requisitos de titulación.",
      correo: "Tu correo",
      boton: "Avisadme",
      hecho: "Listo. Te escribiremos si cambia la normativa.",
    },
    armador: {
      titular: "Quiero alquilar mi barco",
      texto: "Déjanos tu correo y te explicamos cómo publicar tu embarcación.",
      correo: "Tu correo",
      boton: "Enviar",
      hecho: "Recibido. Te contestamos el mismo día laborable.",
    },
  },
  en: {
    puerto: {
      titular: "Tell me when you open in my port",
      texto: "Leave your email and we will let you know when there are boats in this port.",
      correo: "Your email",
      boton: "Notify me",
      hecho: "Done. We will write when there is news in this port.",
    },
    normativa: {
      titular: "Tell me if the regulations change",
      texto: "We only write if the licence requirements change.",
      correo: "Your email",
      boton: "Notify me",
      hecho: "Done. We will write if the regulations change.",
    },
    armador: {
      titular: "I want to list my boat",
      texto: "Leave your email and we will explain how to list your boat.",
      correo: "Your email",
      boton: "Send",
      hecho: "Received. We reply the same working day.",
    },
  },
  de: {
    puerto: {
      titular: "Sagen Sie mir Bescheid, wenn Sie in meinem Hafen öffnen",
      texto: "Hinterlassen Sie Ihre E-Mail, und wir melden uns, wenn es Boote in diesem Hafen gibt.",
      correo: "Ihre E-Mail",
      boton: "Benachrichtigen",
      hecho: "Erledigt. Wir melden uns, wenn es Neuigkeiten in diesem Hafen gibt.",
    },
    normativa: {
      titular: "Sagen Sie mir Bescheid, wenn sich die Vorschriften ändern",
      texto: "Wir schreiben nur, wenn sich die Führerscheinanforderungen ändern.",
      correo: "Ihre E-Mail",
      boton: "Benachrichtigen",
      hecho: "Erledigt. Wir schreiben, wenn sich die Vorschriften ändern.",
    },
    armador: {
      titular: "Ich möchte mein Boot vermieten",
      texto: "Hinterlassen Sie Ihre E-Mail, und wir erklären, wie Sie Ihr Boot einstellen.",
      correo: "Ihre E-Mail",
      boton: "Senden",
      hecho: "Erhalten. Wir antworten am selben Werktag.",
    },
  },
};

export function FormularioCaptacion({
  idioma,
  variante,
  destino,
  pagina,
}: {
  idioma: Idioma;
  variante: Variante;
  destino?: string;
  pagina?: string;
}) {
  const t = T[idioma][variante];
  const [correo, setCorreo] = useState("");
  const [web, setWeb] = useState("");
  const [estado, setEstado] = useState<"inicial" | "enviando" | "hecho" | "error">("inicial");

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEstado("enviando");
    try {
      const r = await fetch("/api/suscripcion", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ correo, variante, destino, idioma, paginaOrigen: pagina, web }),
      });
      setEstado(r.ok ? "hecho" : "error");
    } catch {
      setEstado("error");
    }
  }

  if (estado === "hecho") {
    return <p className="rounded-md border border-borde bg-superficie p-4 text-sm text-texto-suave">{t.hecho}</p>;
  }

  return (
    <form onSubmit={enviar} className="rounded-carta border border-borde bg-superficie p-5">
      <p className="font-display text-lg font-semibold text-texto">{t.titular}</p>
      <p className="mt-1 text-sm leading-relaxed text-texto-suave">{t.texto}</p>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="captacion-correo">
          {t.correo}
        </label>
        <input
          id="captacion-correo"
          type="email"
          required
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder={t.correo}
          className="flex-1 rounded-md border border-borde-fuerte bg-fondo px-3 py-2 text-sm text-texto"
        />
        {/* Honeypot: oculto a los humanos */}
        <input
          type="text"
          value={web}
          onChange={(e) => setWeb(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="rounded-md bg-marca px-5 py-2 text-sm font-semibold text-fondo transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {t.boton}
        </button>
      </div>
      {estado === "error" && (
        <p className="mt-2 text-xs text-texto-tenue">No se pudo enviar. Inténtalo de nuevo.</p>
      )}
    </form>
  );
}
