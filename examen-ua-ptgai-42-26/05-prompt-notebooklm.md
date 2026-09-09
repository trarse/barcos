# 05 · Prompts para NotebookLM (audio de estudio)

Estos prompts son para **NotebookLM** de Google, para generar audio (*Audio
Overviews*) con el que estudiar. Copia y pega el que corresponda.

## Cómo usarlo (2 minutos)

1. En NotebookLM, crea un cuaderno y añade como **fuentes** estos archivos (acepta
   Markdown `.md`; si no te deja, copia y pega el texto como "Texto copiado"):
   - `02-guia-estudio-prueba.md`
   - `03-banco-tipo-test.md`
   - `04-guion-oral.md`
2. Pulsa **Audio Overview** → **Personalizar (Customize)**.
3. Pega el prompt correspondiente y dale a **Generar**.
4. Si el cuadro de personalizar tiene límite de caracteres, usa siempre la **versión
   corta** de cada prompt.

> Consejo: genera **un audio por documento** (no los tres juntos) para que cada píldora
> sea corta y puedas repetirla caminando o en el transporte.

---

## PROMPT 0 · Maestro (los tres documentos juntos)

**Versión corta (para el cuadro de personalizar):**

```
Actuad como dos profesores que preparan a un opositor para la prueba de personal
especialista de la Universidad de Alicante: tecnologías del lenguaje aplicadas al
valenciano. En español, ritmo pausado y didáctico, sin relleno. Explicad cada
concepto con definición clara, un ejemplo y por qué importa para el valenciano.
Después haced preguntas de repaso y dad la respuesta. Cubrid: PLN, corpus y
curación, traducción automática, lenguas de pocos recursos, evaluación y ética.
```

**Versión larga (si no hay límite, o para pegar en el chat del cuaderno):**

```
Vais a preparar a una persona para una prueba de selección de personal especialista
en la Universidad de Alicante, dentro del proyecto "Promoción del valenciano con
inteligencia artificial". El oyente tiene nivel de bachillerato y poca base previa
en IA, así que sed claros y didácticos, en español, con ritmo pausado.

Estructurad el audio así:
1) Explicad cada concepto clave en una definición sencilla, con un ejemplo cotidiano
   y una frase sobre cómo se aplica al valenciano.
2) Cubrid estos bloques: procesamiento del lenguaje natural (token, etiquetado,
   lematización, entidades), corpus y curación de datos, traducción automática
   (reglas, estadística, neuronal, Apertium, BLEU, poseedición), lenguas de pocos
   recursos, tecnologías para aprender idiomas, el valenciano digital y la AVL,
   evaluación de sistemas (precisión, cobertura, F1, prueba piloto) y ética/sesgos.
3) Terminad con preguntas de repaso: haced la pregunta, dejad una pausa para que el
   oyente responda en voz alta, y luego dad la respuesta correcta.

Evitad la jerga innecesaria y usad analogías. Sin introducciones largas ni despedidas
de relleno.
```

---

## PROMPT 2 · Solo la guía de estudio (`02-guia-estudio-prueba.md`)

**Versión corta:**

```
Actuad como dos profesores que explican a un estudiante sin base previa en IA el
temario de la prueba: procesamiento del lenguaje natural, corpus y curación de
datos, traducción automática, lenguas de pocos recursos, tecnologías para aprender
idiomas, valenciano digital, evaluación de sistemas y ética. En español, ritmo
pausado. Para cada concepto: definición sencilla, un ejemplo cotidiano y cómo se
aplica al valenciano. Usad analogías y evitad tecnicismos innecesarios.
```

**Versión larga:**

```
Explicad, como dos profesores pacientes, el contenido de este documento a una persona
sin formación previa en inteligencia artificial. El objetivo es que entienda los
conceptos, no que memorice definiciones.

Reglas:
- En español, ritmo pausado y conversacional.
- Id bloque por bloque (PLN, corpus, traducción automática, lenguas de pocos
  recursos, aprendizaje de idiomas, valenciano, evaluación, ética).
- Para cada concepto: definición con palabras sencillas, un ejemplo de la vida real,
  y una frase sobre cómo se relaciona con el valenciano y con este proyecto.
- Usad analogías ("un corpus es como una biblioteca de textos", etc.).
- No inventéis contenido que no esté en el documento; si algo no aparece, decid que
  no consta en las fuentes.
```

---

## PROMPT 3 · Solo el banco tipo test (`03-banco-tipo-test.md`)

**Versión corta:**

```
Convertid este documento en un repaso de examen oral. Id leyendo las preguntas tipo
test una a una; tras cada pregunta haced una pausa de unos segundos para que el
oyente responda, y luego dad la respuesta correcta con una breve explicación. Al
final, repasad los tres casos prácticos paso a paso. En español.
```

**Versión larga:**

```
Haced un repaso de examen oral a partir de este banco de preguntas. Sois dos
instructores que ayudan a un opositor a practicar.

Reglas:
- Leed cada pregunta de la parte tipo test en voz alta, despacio y con claridad.
- Tras cada pregunta, haced una pausa de 5-7 segundos (decid "pensad la respuesta")
  para que el oyente conteste en voz alta.
- Después dad la opción correcta y explicad en una frase por qué lo es.
- Al final, desarrollad los tres casos prácticos: plan de curación de un corpus,
  evaluación de un traductor automático y organización de una prueba piloto,
  explicándolos como pasos numerados y fáciles de recordar.
- En español, tono motivador.
```

---

## PROMPT 4 · Solo el guion oral (`04-guion-oral.md`)

**Versión corta:**

```
Simulad una prueba oral real. Un locutor hace de tribunal y va preguntando "¿qué es
X?" (PLN, token, corpus, traducción automática, BLEU, etc.); el otro responde con una
definición de unos veinte segundos y un ejemplo, siguiendo el guion. Después dad
consejos de oratoria. En español, tono de ensayo real pero amable.
```

**Versión larga:**

```
Simulad una prueba oral de verdad para preparar a un opositor. Un locutor hace el
papel de tribunal y el otro, de aspirante que responde.

Reglas:
- El tribunal va preguntando concepto a concepto: "¿qué es el procesamiento del
  lenguaje natural?", "¿qué es un corpus?", "¿qué es BLEU?", "¿qué es una lengua de
  pocos recursos?", y así con todos los términos del guion.
- El aspirante responde con la estructura del guion: definición en unos veinte
  segundos + un ejemplo + una conexión con el proyecto del valenciano.
- Intercalad algún recordatorio de oratoria: respirar antes de responder, hablar
  despacio, no inventar tecnicismos.
- Al final, animad al oyente a repetir cada respuesta en voz alta durante la pausa.
- En español, con tono de ensayo serio pero cercano.
```

---

## Bonus · Prompt de chat para que te examine (sin audio)

Pégalo en el **chat** del cuaderno (no en Audio Overview):

```
Hazme un examen oral de repaso del material. Hazme UNA pregunta cada vez, espera a
que te responda, y luego corrígeme: dime si la respuesta es correcta, qué me falta y
cómo la dirías tú en 20 segundos. Empieza por los conceptos básicos y ve subiendo la
dificultad.
```

---

## Checklist rápido

- [ ] Subir los 3 archivos `.md` como fuentes.
- [ ] Generar 1 audio por documento (3 audios cortos).
- [ ] Usar el prompt de chat del bonus para autoexaminarte.
- [ ] Repetir los audios a lo largo de la semana.
