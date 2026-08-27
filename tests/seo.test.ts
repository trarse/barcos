import { describe, expect, it } from "vitest";

import {
  barcoJsonLd,
  faqJsonLd,
  listaJsonLd,
  migasJsonLd,
  organizacionJsonLd,
  rutas,
  sitioJsonLd,
} from "@/lib/seo";
import { SITIO } from "@/lib/sitio";

describe("migasJsonLd", () => {
  const migas = [
    { nombre: "Inicio", ruta: "/" },
    { nombre: "Baleares", ruta: "/alquiler-barcos/baleares" },
    { nombre: "Mallorca", ruta: "/alquiler-barcos/mallorca" },
  ];

  it("numera las posiciones desde uno", () => {
    const json = migasJsonLd(migas);
    expect(json.itemListElement.map((i) => i.position)).toEqual([1, 2, 3]);
  });

  it("deja la página actual sin enlace", () => {
    const json = migasJsonLd(migas);
    expect(json.itemListElement[0]).toHaveProperty("item");
    expect(json.itemListElement.at(-1)).not.toHaveProperty("item");
  });

  it("convierte las rutas en URL absolutas", () => {
    const json = migasJsonLd(migas);
    expect(json.itemListElement[1]).toMatchObject({
      item: `${SITIO.url}/alquiler-barcos/baleares`,
    });
  });
});

describe("faqJsonLd", () => {
  it("envuelve cada par en Question y Answer", () => {
    const json = faqJsonLd([
      { pregunta: "¿Hace falta título?", respuesta: "Para menos de 15 cv, no." },
    ]);

    expect(json["@type"]).toBe("FAQPage");
    expect(json.mainEntity[0]).toEqual({
      "@type": "Question",
      name: "¿Hace falta título?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para menos de 15 cv, no.",
      },
    });
  });
});

describe("barcoJsonLd", () => {
  const barco = {
    nombre: "Quicksilver 675",
    descripcion: "Lancha de día para seis personas.",
    ruta: "/barco/quicksilver-675-denia",
    imagenes: ["https://cdn.example.com/1.jpg", "/local.jpg"],
    fabricante: "Quicksilver",
    precioDia: 67_397,
    valoracion: 4.85,
    numOpiniones: 42,
    disponible: true,
  };

  it("declara el precio en euros con dos decimales", () => {
    const json = barcoJsonLd(barco);
    expect(json.offers.price).toBe("673.97");
    expect(json.offers.priceCurrency).toBe("EUR");
  });

  it("marca la disponibilidad con el vocabulario de schema.org", () => {
    expect(barcoJsonLd(barco).offers.availability).toBe(
      "https://schema.org/InStock",
    );
    expect(
      barcoJsonLd({ ...barco, disponible: false }).offers.availability,
    ).toBe("https://schema.org/OutOfStock");
  });

  it("absolutiza las imágenes locales y respeta las remotas", () => {
    const json = barcoJsonLd(barco);
    expect(json.image[0]).toBe("https://cdn.example.com/1.jpg");
    expect(json.image[1]).toBe(`${SITIO.url}/local.jpg`);
  });

  it("incluye la valoración agregada cuando hay opiniones", () => {
    const json = barcoJsonLd(barco);
    expect(json.aggregateRating).toMatchObject({
      ratingValue: "4.9",
      reviewCount: 42,
    });
  });

  it("omite la valoración si el barco no tiene opiniones", () => {
    // Declarar un agregado sin reseñas es motivo de penalización manual.
    const json = barcoJsonLd({ ...barco, numOpiniones: 0 });
    expect(json).not.toHaveProperty("aggregateRating");
  });
});

describe("listaJsonLd", () => {
  it("cuenta los elementos y los numera", () => {
    const json = listaJsonLd("Veleros en Ibiza", [
      { nombre: "Bavaria 36", ruta: "/barco/bavaria-36" },
      { nombre: "Dufour 390", ruta: "/barco/dufour-390" },
    ]);

    expect(json.numberOfItems).toBe(2);
    expect(json.itemListElement[1].position).toBe(2);
    expect(json.itemListElement[0].url).toBe(`${SITIO.url}/barco/bavaria-36`);
  });
});

describe("organizacionJsonLd y sitioJsonLd", () => {
  it("declaran la marca y el buscador interno", () => {
    expect(organizacionJsonLd()).toMatchObject({
      "@type": "Organization",
      name: SITIO.nombre,
    });
    expect(sitioJsonLd().potentialAction.target.urlTemplate).toContain(
      "search_term_string",
    );
  });
});

describe("rutas", () => {
  it("construye las rutas canónicas del sitio", () => {
    expect(rutas.destino("mallorca")).toBe("/alquiler-barcos/mallorca");
    expect(rutas.destinoTipo("mallorca", "velero")).toBe(
      "/alquiler-barcos/mallorca/velero",
    );
    expect(rutas.tipo("catamaran")).toBe("/alquiler-catamaran");
    expect(rutas.barco("bavaria-36")).toBe("/barco/bavaria-36");
  });

  it("ninguna ruta lleva barra final", () => {
    const todas = [
      rutas.home(),
      rutas.busqueda(),
      rutas.destino("ibiza"),
      rutas.destinoTipo("ibiza", "velero"),
      rutas.tipo("velero"),
      rutas.barco("x"),
      rutas.experiencias(),
      rutas.experiencia("pesca"),
      rutas.sinLicencia(),
      rutas.blog(),
      rutas.articulo("y"),
    ];

    for (const ruta of todas) {
      if (ruta === "/") continue;
      expect(ruta.endsWith("/")).toBe(false);
    }
  });
});
