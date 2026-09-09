# 04 · Guion oral para la prueba

La prueba puede ser **oral** (base 6.2) y, aunque no lo sea, estos guiones te sirven
para ordenar cualquier respuesta. Cada concepto tiene una **frase de ~20 segundos**
lista para decir en voz alta y un **ejemplo** para rematar.

> **Fórmula universal de respuesta** (úsala siempre):
> 1) **Definir** el concepto con tus palabras → 2) dar un **ejemplo** → 3) conectarlo
> con **este proyecto** (valenciano, corpus, traducción). Tres frases y sueltas el hilo.

---

## 1. PLN (Procesamiento del Lenguaje Natural)

**Dilo así:** "El procesamiento del lenguaje natural es una rama de la inteligencia
artificial que permite a las máquinas entender, procesar y generar lenguaje humano. Se
usa en traductores, asistentes de voz y correctores. En este proyecto lo aplicamos al
valenciano."

**Ejemplo:** el corrector del móvil o el traductor automático.

## 2. Token y tipo

**Dilo así:** "Un *token* es cada unidad mínima en la que dividimos un texto, normalmente
cada palabra. Un *tipo* es la palabra única. En 'casa casa coche' hay tres tokens y dos
tipos."

**Ejemplo:** tokenizar es el primer paso antes de analizar cualquier texto.

## 3. Etiquetado morfosintáctico (POS tagging)

**Dilo así:** "Consiste en asignar a cada palabra su categoría gramatical —nombre, verbo,
adjetivo— según el contexto. Es imprescindible para que una máquina 'entienda' la
estructura de una frase."

**Ejemplo:** en "la casa blanca", "casa" se etiqueta como nombre y "blanca" como adjetivo.

## 4. Lematización vs. *stemming*

**Dilo así:** "La lematización reduce una palabra a su lema, a una forma de diccionario:
'corriendo' se convierte en 'correr'. El *stemming* solo recorta una raíz aproximada, que
puede no ser una palabra real."

**Ejemplo:** lematizar es lo correcto para un corpus bien anotado.

## 5. Reconocimiento de entidades nombradas (NER)

**Dilo así:** "Es la tarea de detectar y clasificar entidades —personas, lugares,
organizaciones, fechas— dentro de un texto. Sirve para extraer información estructurada."

**Ejemplo:** en una noticia, identificar que 'Alicante' es un lugar y 'AVL' una
organización.

## 6. Corpus

**Dilo así:** "Un corpus es una colección de textos reunidos con un criterio, que sirve
para estudiar o entrenar sistemas de una lengua. Puede ser monolingüe, paralelo —textos
con su traducción alineados— o comparable."

**Ejemplo:** para entrenar un traductor valenciano-español necesitas un corpus paralelo.

## 7. Curación de corpus

**Dilo así:** "Curar un corpus es limpiarlo, normalizarlo, quitar duplicados y corregir
errores para que los datos sean fiables. Es una de las tareas de esta plaza y es clave:
con datos sucios, el modelo aprende mal."

**Ejemplo:** quitar residuos de HTML, separar textos en castellano, deduplicar.

## 8. Minería de textos

**Dilo así:** "Es extraer patrones y conocimiento de grandes volúmenes de texto: contar
frecuencias, ver qué palabras coaparecen o encontrar temas recurrentes."

**Ejemplo:** detectar los términos más usados en textos en valenciano.

## 9. Traducción automática y sus paradigmas

**Dilo así:** "Hay tres grandes enfoques: basado en reglas, que usa diccionarios y
gramática escrita por lingüistas; estadístico, que aprende patrones de corpus paralelos;
y neuronal, que usa redes neuronales y es el estándar actual."

**Ejemplo:** Apertium es de reglas; Google Translate y DeepL son neuronales.

## 10. Apertium

**Dilo así:** "Apertium es un sistema de traducción automática abierto y basado en reglas,
pensado para lenguas con pocos recursos, y tiene un par valenciano-español. Por eso es
muy relevante para este proyecto."

**Ejemplo:** es la herramienta de referencia cuando hay poco dato para entrenar.

## 11. BLEU

**Dilo así:** "BLEU es una métrica que mide cuánto se parece la traducción del sistema a
una o varias traducciones de referencia humanas. Cuanto más alto, mejor, aunque conviene
complementarla con evaluación humana."

**Ejemplo:** una BLEU alta no garantiza naturalidad, solo solapamiento.

## 12. Poseedición

**Dilo así:** "Es la revisión o corrección, por una persona, de la salida de un traductor
automático. Combina la velocidad de la máquina con el criterio humano."

**Ejemplo:** corregir el género o el vocabulario de una traducción automática.

## 13. Lengua de pocos recursos

**Dilo así:** "Es una lengua con poco dato digital disponible: pocos corpus, poca web,
pocas herramientas. Eso dificulta entrenar modelos que necesitan muchos datos, y obliga a
estrategias alternativas."

**Ejemplo:** el valenciano tiene menos recursos digitales que el inglés o el español.

## 14. Prueba piloto

**Dilo así:** "Es probar una herramienta en un entorno real pero acotado, con un grupo
reducido de usuarios, antes del lanzamiento. Sirve para detectar errores y mejorarla."

**Ejemplo:** probar la app de valenciano con diez usuarios y recoger su feedback.

## 15. Precisión y cobertura (*recall*)

**Dilo así:** "La precisión mide, de lo que el sistema marcó, cuánto era correcto. La
cobertura mide, del total que debía marcar, cuánto encontró. Son complementarias: puedes
marcar poco y acertar, o marcar todo y fallar."

**Ejemplo:** un filtro de spam muy 'cauto' tiene alta precisión pero baja cobertura.

## 16. Sesgo

**Dilo así:** "Un sesgo es una tendencia sistemática injusta del modelo, que normalmente
hereda de datos de entrenamiento desbalanceados. Hay que detectarlo y mitigarlo."

**Ejemplo:** si un corpus tiene pocos textos de mujeres, el modelo puede asociar
profesiones a un género.

## 17. El valenciano y la AVL

**Dilo así:** "La Acadèmia Valenciana de la Llengua, la AVL, es la institución que fija la
normativa oficial del valenciano. Para trabajar con valenciano hay que respetar esa
normativa al normalizar textos."

**Ejemplo:** al curar un corpus, normalizamos la ortografía según la AVL.

## 18. Tecnologías para aprender idiomas

**Dilo así:** "Son herramientas que ayudan a practicar una lengua: traductores,
correctores, generadores de ejercicios, chatbots o asistentes de voz. Aquí sirven para
apoyar el aprendizaje del valenciano."

**Ejemplo:** una app que genere ejercicios de vocabulario en valenciano.

## 19. Documentación técnica

**Dilo así:** "Es el conjunto de documentos que describen qué hace una herramienta, cómo se
usa y cómo se ha evaluado. Es una de las tareas de la plaza: dejar el trabajo registrado y
reproducible."

**Ejemplo:** documentar los pasos de curación del corpus y los resultados de la evaluación.

---

## Preguntas típicas y cómo arrancar

- **"¿Qué es X?"** → "X es… [definición]. Por ejemplo, … [ejemplo]. En este proyecto, …
  [conexión]."
- **"¿Cómo harías Y?"** → "Seguiría estos pasos: primero…, segundo…, tercero…" (enumerar
  con calma).
- **"¿Por qué importa esto para el valenciano?"** → "Porque el valenciano es una lengua de
  pocos recursos, así que crear y curar corpus es imprescindible para que las herramientas
  funcionen bien."

---

## Vocabulario técnico valenciano ↔ castellano

| Castellano | Valenciano |
|---|---|
| corpus | corpus |
| etiquetado / anotación | etiquetatge / anotació |
| traducción automática | traducció automàtica |
| procesamiento del lenguaje natural | processament del llenguatge natural |
| aprendizaje de idiomas | aprenentatge d'idiomes |
| minería de textos | mineria de textos |
| datos | dades |
| prueba piloto | prova pilot |
| evaluación | avaluació |
| herramienta | ferramenta / eina |
| desarrollo | desenvolupament |

*(Apréndete al menos estos diez: es el 80 % del vocabulario técnico que puede salir.)*

---

## Consejos de oratoria para la prueba

1. **Respira antes de responder.** Dos segundos de silencio se leen como seguridad, no como
   duda.
2. **Estructura fija**: definir → ejemplo → conectar con el proyecto. No improvises el orden.
3. **No inventes tecnicismos.** Si no te sale el término exacto, explícalo con palabras
   sencillas: vale más claro que sonar a libro.
4. **Habla despacio.** Los nervios aceleran; acuérdate de hacer pausas al final de cada idea.
5. Si te preguntan algo que no sabes, **reconduce**: "No lo recuerdo con exactitud, pero el
   concepto general es que…" y explica lo que sí sabes.

## Cómo ensayar

1. Lee cada guion en voz alta **una vez al día**.
2. Grábate con el móvil respondiendo "¿qué es un corpus?" sin mirar y escúchate.
3. Haz los **casos prácticos** de `03-banco-tipo-test.md` en voz alta, con pasos numerados.
