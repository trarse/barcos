import type { Idioma } from "@/lib/idiomas";

/**
 * Páginas legales: aviso legal, privacidad y cookies.
 *
 * BORRADORES basados en plantillas oficiales (LSSI-CE, RGPD, guías AEPD). Los
 * marcadores [TITULAR], [NIF], [DOMICILIO] y [CONTACTO] los rellena el titular
 * antes de publicar. No se publican con los marcadores puestos.
 */

export type ClaveLegal = "avisoLegal" | "privacidad" | "cookies";

export interface PaginaLegal {
  titulo: string;
  descripcion: string;
  cuerpo: string;
}

const ES: Record<ClaveLegal, PaginaLegal> = {
  avisoLegal: {
    titulo: "Aviso legal",
    descripcion:
      "Titularidad, objeto y condiciones de uso del sitio web de alquiler de barcos Estribor.",
    cuerpo: `**Titular.** Este sitio lo opera [TITULAR], con NIF [NIF] y domicilio en [DOMICILIO]. Contacto: [CONTACTO].

**Objeto.** Estribor es un sitio de intermediación de alquiler de embarcaciones en la Costa Blanca. El contenido (textos, fichas y precios) es informativo y puede actualizarse sin previo aviso.

**Propiedad intelectual.** Los textos y la estructura del sitio son propiedad de [TITULAR] o de sus licenciantes. Queda prohibida su reproducción sin autorización.

**Responsabilidad.** [TITULAR] no responde del uso que los armadores o los arrendatarios hagan de los barcos, ni de los datos que terceros publiquen en sus fichas. Los precios mostrados incluyen todos los conceptos indicados en cada ficha.

**Legislación.** Este aviso se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados del domicilio del titular.`,
  },
  privacidad: {
    titulo: "Política de privacidad",
    descripcion:
      "Qué datos recoge Estribor, para qué los usa y qué derechos tienes sobre ellos.",
    cuerpo: `**Responsable.** [TITULAR], NIF [NIF], [DOMICILIO]. Contacto: [CONTACTO].

**Datos que recogemos.** El correo electrónico que dejas en los formularios de suscripción (avisos de apertura en tu puerto o de cambios de normativa) y en el formulario de armadores, junto con el puerto o municipio que indicas, el idioma y la página de origen.

**Finalidad y base legal.** Usamos el correo únicamente para lo que pediste: avisarte cuando haya novedades en tu puerto o en la normativa, o responder a tu solicitud como armador. La base legal es tu consentimiento (art. 6.1.a RGPD).

**Conservación.** Conservamos el correo mientras no retires el consentimiento; después, se suprime.

**Derechos.** Puedes acceder, rectificar o suprimir tus datos, y retirar el consentimiento, escribiendo a [CONTACTO].

**Destinatarios.** No cedemos datos a terceros salvo obligación legal.`,
  },
  cookies: {
    titulo: "Política de cookies",
    descripcion:
      "Qué cookies usa Estribor y cómo aceptarlas o rechazarlas.",
    cuerpo: `**Qué son.** Las cookies son pequeños archivos que se guardan en tu navegador y permiten recordar preferencias.

**Qué usamos.** Solo cookies estrictamente necesarias para el funcionamiento del sitio. Si aceptas, se activa además una medición anónima de audiencia (analítica web) para entender qué páginas se consultan.

**Consentimiento.** Nada se carga hasta que aceptas. Puedes rechazar las cookies no necesarias igual de fácil que aceptarlas, y retirar el consentimiento en cualquier momento desde el aviso de cookies.

**Cómo gestionarlas.** También puedes bloquear o borrar las cookies desde la configuración de tu navegador.`,
  },
};

const EN: Record<ClaveLegal, PaginaLegal> = {
  avisoLegal: {
    titulo: "Legal notice",
    descripcion:
      "Ownership, purpose and terms of use of the Estribor boat-hire website.",
    cuerpo: `**Owner.** This site is operated by [TITULAR], tax ID [NIF], with registered office at [DOMICILIO]. Contact: [CONTACTO].

**Purpose.** Estribor is an intermediary for boat hire on the Costa Blanca. The content (text, listings and prices) is for information and may change without notice.

**Intellectual property.** The texts and structure of the site belong to [TITULAR] or its licensors and may not be reproduced without permission.

**Liability.** [TITULAR] is not liable for how owners or hirers use the boats, nor for data third parties publish in their listings. The prices shown include every item stated on each listing.

**Governing law.** This notice is governed by Spanish law, and the parties submit to the courts of the owner's domicile.`,
  },
  privacidad: {
    titulo: "Privacy policy",
    descripcion:
      "What data Estribor collects, what it is used for, and your rights over it.",
    cuerpo: `**Controller.** [TITULAR], tax ID [NIF], [DOMICILIO]. Contact: [CONTACTO].

**Data we collect.** The email address you leave in the subscription forms (notifications about your port or about regulatory changes) and in the owner form, together with the port or municipality you state, the language and the page you came from.

**Purpose and legal basis.** We use the email only for what you asked: to tell you when there is news in your port or in the regulations, or to answer your owner enquiry. The legal basis is your consent (Art. 6(1)(a) GDPR).

**Retention.** We keep the email while you do not withdraw consent; then it is deleted.

**Your rights.** You may access, rectify or erase your data, and withdraw consent, by writing to [CONTACTO].

**Recipients.** We do not share data with third parties except where required by law.`,
  },
  cookies: {
    titulo: "Cookie policy",
    descripcion:
      "Which cookies Estribor uses and how to accept or reject them.",
    cuerpo: `**What they are.** Cookies are small files stored in your browser that remember preferences.

**What we use.** Only cookies strictly necessary for the site to work. If you accept, anonymous audience measurement (web analytics) is also enabled to understand which pages are visited.

**Consent.** Nothing loads until you accept. You can reject non-essential cookies as easily as accepting them, and withdraw consent at any time from the cookie notice.

**How to manage them.** You can also block or delete cookies from your browser settings.`,
  },
};

const DE: Record<ClaveLegal, PaginaLegal> = {
  avisoLegal: {
    titulo: "Impressum",
    descripcion:
      "Inhaber, Zweck und Nutzungsbedingungen der Bootsvermietung Estribor.",
    cuerpo: `**Inhaber.** Diese Website wird betrieben von [TITULAR], Steuernummer [NIF], Sitz: [DOMICILIO]. Kontakt: [CONTACTO].

**Zweck.** Estribor vermittelt die Vermietung von Booten an der Costa Blanca. Die Inhalte (Texte, Inserate und Preise) dienen der Information und können ohne Vorankündigung geändert werden.

**Geistiges Eigentum.** Texte und Struktur der Website gehören [TITULAR] oder den Lizenzgebern und dürfen nicht ohne Erlaubnis vervielfältigt werden.

**Haftung.** [TITULAR] haftet weder für die Nutzung der Boote durch Eigner oder Mieter noch für Daten, die Dritte in ihren Inseraten veröffentlichen. Die angezeigten Preise enthalten alle im Inserat genannten Posten.

**Recht.** Es gilt spanisches Recht; Gerichtsstand ist der Sitz des Inhabers.`,
  },
  privacidad: {
    titulo: "Datenschutzerklärung",
    descripcion:
      "Welche Daten Estribor erhebt, wofür sie genutzt werden und welche Rechte Sie haben.",
    cuerpo: `**Verantwortlicher.** [TITULAR], Steuernummer [NIF], [DOMICILIO]. Kontakt: [CONTACTO].

**Erhobene Daten.** Die E-Mail-Adresse, die Sie in den Anmeldeformularen (Hinweise zur Eröffnung in Ihrem Hafen oder zu Änderungen der Vorschriften) und im Eigner-Formular hinterlassen, zusammen mit dem angegebenen Hafen oder Ort, der Sprache und der Herkunftsseite.

**Zweck und Rechtsgrundlage.** Wir nutzen die E-Mail nur für das, was Sie angefordert haben: um Sie über Neuigkeiten in Ihrem Hafen oder bei den Vorschriften zu informieren oder Ihre Eigner-Anfrage zu beantworten. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).

**Speicherdauer.** Wir speichern die E-Mail, solange Sie die Einwilligung nicht widerrufen; danach wird sie gelöscht.

**Ihre Rechte.** Sie können Auskunft, Berichtigung oder Löschung verlangen und die Einwilligung widerrufen: Schreiben Sie an [CONTACTO].

**Empfänger.** Wir geben Daten nur weiter, wenn das Gesetz es verlangt.`,
  },
  cookies: {
    titulo: "Cookie-Richtlinie",
    descripcion:
      "Welche Cookies Estribor verwendet und wie Sie sie annehmen oder ablehnen.",
    cuerpo: `**Was sie sind.** Cookies sind kleine Dateien, die im Browser gespeichert werden und Einstellungen merken.

**Was wir verwenden.** Nur Cookies, die für den Betrieb der Website zwingend nötig sind. Wenn Sie zustimmen, wird zusätzlich eine anonyme Reichweitenmessung (Web-Analyse) aktiviert, um zu verstehen, welche Seiten aufgerufen werden.

**Einwilligung.** Es lädt nichts, bis Sie zustimmen. Nicht notwendige Cookies lassen sich ebenso einfach ablehnen wie annehmen; die Einwilligung können Sie jederzeit über den Cookie-Hinweis widerrufen.

**Verwaltung.** Sie können Cookies auch in den Einstellungen Ihres Browsers blockieren oder löschen.`,
  },
};

export const LEGALES: Record<Idioma, Record<ClaveLegal, PaginaLegal>> = {
  es: ES,
  en: EN,
  de: DE,
};

export function paginaLegal(idioma: Idioma, clave: ClaveLegal): PaginaLegal {
  return LEGALES[idioma][clave];
}
