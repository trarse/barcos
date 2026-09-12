"use client";

import Link from "next/link";
import { useState } from "react";

import { ruta } from "@/lib/rutas";
import type { Idioma } from "@/lib/idiomas";

type Pantalla = "q1" | "q2" | "titulo" | "sinLicencia" | "patron";

const TRAD: Record<string, Record<string, string>> = {
  es: {
    titulo: "¿Qué barco puedes llevar?",
    subtitulo: "Dos preguntas y sales de dudas, sin leer normativa.",
    q1: "¿Tienes titulación náutica?",
    si: "Sí",
    no: "No",
    q2: "¿Cómo prefieres salir?",
    gobernar: "Gobernar yo",
    patron: "Ir con patrón",
    rTitulo: "Tienes título",
    rTituloTexto: "Puedes gobernar cualquier barco de la flota. Filtra por eslora, potencia y zona, y elige el que quieras.",
    rSin: "Sin licencia",
    rSinTexto: "Puedes llevar sin título barcos de hasta 5 metros y 15 CV, de día y tras una explicación de seguridad en el pantalán.",
    rPatron: "Con patrón",
    rPatronTexto: "Con patrón a bordo no necesitas ningún título: cualquier barco, cualquier zona. Tú eliges adónde ir y él gobierna.",
    verFlota: "Ver toda la flota",
    verSinLicencia: "Ver barcos sin licencia",
    repetir: "Repetir el test",
  },
  en: {
    titulo: "Which boat can you take?",
    subtitulo: "Two questions and you'll know, no regulations to read.",
    q1: "Do you have a boating licence?",
    si: "Yes",
    no: "No",
    q2: "How do you prefer to go out?",
    gobernar: "Drive myself",
    patron: "Go with a skipper",
    rTitulo: "You have a licence",
    rTituloTexto: "You can drive any boat in the fleet. Filter by length, power and area, and pick yours.",
    rSin: "No licence needed",
    rSinTexto: "You can drive boats up to 5 metres and 15 hp without a licence, by day, after a safety briefing at the dock.",
    rPatron: "With a skipper",
    rPatronTexto: "With a skipper on board you need no licence at all: any boat, any area. You choose where to go.",
    verFlota: "See the whole fleet",
    verSinLicencia: "See licence-free boats",
    repetir: "Retake the test",
  },
  de: {
    titulo: "Welches Boot darfst du fahren?",
    subtitulo: "Zwei Fragen und du bist dir sicher, ohne Vorschriften zu lesen.",
    q1: "Hast du einen Bootsführerschein?",
    si: "Ja",
    no: "Nein",
    q2: "Wie möchtest du fahren?",
    gobernar: "Selbst fahren",
    patron: "Mit Skipper",
    rTitulo: "Du hast einen Schein",
    rTituloTexto: "Du darfst jedes Boot der Flotte fahren. Filtere nach Länge, Leistung und Revier.",
    rSin: "Ohne Führerschein",
    rSinTexto: "Ohne Schein darfst du Boote bis 5 Meter und 15 PS fahren, tagsüber und nach einer Sicherheitseinweisung am Steg.",
    rPatron: "Mit Skipper",
    rPatronTexto: "Mit Skipper an Bord brauchst du gar keinen Schein: jedes Boot, jedes Revier.",
    verFlota: "Ganze Flotte ansehen",
    verSinLicencia: "Boote ohne Schein ansehen",
    repetir: "Test wiederholen",
  },
};

/** Test interactivo: decide en dos pasos si el usuario puede ir sin licencia o con patrón. */
export function TestTitulacion({ idioma }: { idioma: Idioma }) {
  const t = TRAD[idioma] ?? TRAD.es;
  const [pantalla, setPantalla] = useState<Pantalla>("q1");

  const busqueda = ruta({ tipo: "busqueda" }, idioma);
  const sinLicencia = ruta({ tipo: "sinLicencia" }, idioma);

  return (
    <div className="rounded-carta border border-borde bg-superficie p-6">
      <h2 className="font-display text-2xl font-semibold text-texto">{t.titulo}</h2>
      <p className="mt-1 text-sm text-texto-suave">{t.subtitulo}</p>

      <div className="mt-6">
        {pantalla === "q1" && (
          <div>
            <p className="font-medium text-texto">{t.q1}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Boton onClick={() => setPantalla("titulo")} primario>{t.si}</Boton>
              <Boton onClick={() => setPantalla("q2")}>{t.no}</Boton>
            </div>
          </div>
        )}

        {pantalla === "q2" && (
          <div>
            <p className="font-medium text-texto">{t.q2}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Boton onClick={() => setPantalla("sinLicencia")} primario>{t.gobernar}</Boton>
              <Boton onClick={() => setPantalla("patron")}>{t.patron}</Boton>
            </div>
            <button type="button" onClick={() => setPantalla("q1")} className="mt-4 text-xs text-texto-tenue underline">
              {t.repetir}
            </button>
          </div>
        )}

        {pantalla !== "q1" && pantalla !== "q2" && (
          <Resultado
            titulo={pantalla === "titulo" ? t.rTitulo : pantalla === "sinLicencia" ? t.rSin : t.rPatron}
            texto={pantalla === "titulo" ? t.rTituloTexto : pantalla === "sinLicencia" ? t.rSinTexto : t.rPatronTexto}
            cta={pantalla === "sinLicencia" ? { href: sinLicencia, texto: t.verSinLicencia } : { href: busqueda, texto: t.verFlota }}
            onRepetir={() => setPantalla("q1")}
            repetir={t.repetir}
          />
        )}
      </div>
    </div>
  );
}

function Boton({
  children,
  onClick,
  primario = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primario?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-4 py-2 text-sm font-semibold transition-opacity ${
        primario ? "bg-marca text-fondo hover:opacity-90" : "border border-borde text-texto hover:border-acento hover:text-acento"
      }`}
    >
      {children}
    </button>
  );
}

function Resultado({
  titulo,
  texto,
  cta,
  onRepetir,
  repetir,
}: {
  titulo: string;
  texto: string;
  cta: { href: string; texto: string };
  onRepetir: () => void;
  repetir: string;
}) {
  return (
    <div className="rounded-md border border-acento/40 bg-fondo p-5">
      <p className="text-sm font-semibold uppercase tracking-wider text-acento">{titulo}</p>
      <p className="mt-2 max-w-[60ch] leading-relaxed text-texto-suave">{texto}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link href={cta.href} className="rounded-md bg-marca px-4 py-2 text-sm font-semibold text-fondo hover:opacity-90">
          {cta.texto}
        </Link>
        <button type="button" onClick={onRepetir} className="text-xs text-texto-tenue underline">
          {repetir}
        </button>
      </div>
    </div>
  );
}
