# 02 · Guía de estudio de la prueba

## Qué es la prueba (base 6.1)

- "Una prueba relacionada con las **tareas** que se vayan a desarrollar y con el **perfil** de la plaza" (Anexo I).
- **Máximo 5 puntos. Mínimo 3 puntos** para que te baremen el currículum (es **eliminatoria**).
- Puede ser **oral** (y, en ese caso, **grabarse**; orden alfabético desde la letra del sorteo anual).
- Se convoca con **antelación mínima de 2 días hábiles**.

> **No hay temario publicado.** La materia se deduce de las tareas (Anexo I) y de las
> cuatro áreas que el propio baremo nombra. Este documento es una reconstrucción
> orientativa, no el temario oficial.

### Las 5 tareas de la plaza (Anexo I)
1. Apoyo al desarrollo y **evaluación de tecnologías del lenguaje natural** aplicadas al valenciano.
2. Elaboración y organización de **documentación técnica** del proyecto.
3. Apoyo a la **difusión de resultados**.
4. **Pruebas piloto** de las herramientas desarrolladas.
5. **Curación de corpus y etiquetado de datos** recolectados.

### Las 4 áreas que nombra el baremo (Anexo I, 3.1/3.2)
Tecnologías del lenguaje natural · minería de textos y creación de corpus ·
herramientas de traducción automática · tecnologías aplicadas al aprendizaje de idiomas.

---

## Bloque 1 — Procesamiento del Lenguaje Natural (PLN / NLP)

Qué debes saber explicar con tus palabras:

- **PLN**: rama de la IA que hace que las máquinas entiendan, procesen y generen lenguaje humano.
- **Tokenización**: dividir un texto en unidades mínimas (palabras, signos). **Token** vs **tipo** (el tipo es la palabra única; "casa, casa, coche" → 3 tokens, 2 tipos).
- **Lematización**: llevar cada palabra a su lema ("corriendo" → "correr"). **Stemming**: recortar a una raíz aproximada ("corriend").
- **Etiquetado morfosintáctico (POS tagging)**: asignar a cada palabra su categoría (nombre, verbo, adjetivo…).
- **Reconocimiento de entidades nombradas (NER)**: detectar personas, lugares, organizaciones, fechas.
- **Análisis de sentimiento**: clasificar la polaridad (positivo/negativo/neutro).
- Otras tareas: clasificación de textos, resumen automático, extracción de información, pregunta-respuesta, generación de lenguaje.
- **¿Por qué el lenguaje es difícil para una máquina?** Ambigüedad (léxica y sintáctica), variación, contexto, idiomas con poca estandarización digital.

## Bloque 2 — Corpus, minería de textos y curación de datos

- **Corpus**: colección de textos (escritos u orales transcritos) reunida con criterio para estudiar/trabajar una lengua.
  - **Monolingüe** (una lengua) vs **paralelo** (textos + su traducción alineados) vs **comparable**.
- **Anotación/etiquetado**: añadir información al corpus (categorías gramaticales, entidades, sentimiento…).
- **Curación de datos**: limpiar, normalizar, deduplicar y corregir los datos para que sean fiables. Errores típicos: ruido, textos duplicados, mezcla de idiomas, ortografía no normativa, sesgos de fuente.
- **Minería de textos**: extraer conocimiento/patrones de grandes volúmenes de texto (frecuencias, concordancias, coapariciones, n-gramas).
- **Recolección**: crawling/scraping web, repositorios, corpus existentes. Cuidado con licencias, derechos de autor y datos personales.
- Formatos habituales: TXT, CSV, JSON, y para traducción **TMX**/TBX.

## Bloque 3 — Traducción automática (TA / MT)

- **Qué es**: traducción automática por software entre lenguas.
- **Tres paradigmas** (saber distinguirlos):
  1. **Basada en reglas (RBMT)**: diccionarios + reglas gramaticales escritas por lingüistas. Ej.: **Apertium** (muy relevante aquí: motor abierto para lenguas "pequeñas", con par **valenciano ↔ español**).
  2. **Estadística (SMT)**: aprende patrones de grandes corpus paralelos mediante probabilidad.
  3. **Neuronal (NMT)**: redes neuronales; hoy es el estándar (Google Translate, DeepL).
- **Corpus paralelo alineado**: materia prima de la TA (frase a frase / palabra a palabra).
- **Evaluación**: **BLEU** (mide solapamiento con traducciones de referencia), METEOR, TER; y evaluación humana.
- **Poseedición**: revisar/corregir la salida del traductor por una persona.
- Concepto útil: **modelo de lenguaje** (probabilidad de que una secuencia de palabras sea natural).

## Bloque 4 — Lenguas de pocos recursos (el corazón de la LIF)

- Una lengua de **pocos recursos** tiene **poco dato digital**: pocos corpus, poca web, pocas herramientas.
- Por qué es difícil: los modelos modernos necesitan **muchísimos datos**; si no los hay, el rendimiento cae.
- Estrategias típicas: usar **motores basados en reglas** (Apertium), **transferencia** desde una lengua mayor, **datos sintéticos/parafraseo**, reaprovechar recursos de lenguas próximas, y **crear/curar corpus** (¡exactamente una de las tareas de esta plaza!).
- El valenciano entra en esta lógica: menos recursos digitales que el inglés o el español.

## Bloque 5 — Tecnologías aplicadas al aprendizaje de idiomas

- Ejemplos: traductores y diccionarios en línea, correctores ortográficos/gramaticales, generadores de ejercicios, chatbots conversacionales, asistentes de voz, apps de repaso (SRS), síntesis y reconocimiento de voz.
- Cómo encaja aquí: herramientas que ayuden a **practicar y aprender valenciano** con IA.

## Bloque 6 — El valenciano en el mundo digital

- **Normativa**: la **Acadèmia Valenciana de la Llengua (AVL)** es la institución que fija la normativa del valenciano.
- Instituciones y recursos (conocerlos, sin entrar en polémicas): **AVL**, Dirección General de Política Lingüística (financiadora del proyecto), diccionarios y correctores en línea.
- **Motores abiertos** con soporte valenciano/catalán: **Apertium**, **Softcatalà** (correctores, traductor), recursos de **Common Voice** (voz) o **Tatoeba** (frases), entre otros.
- Conceptos: **normalización lingüística**, presencia del valenciano en internet y en productos tecnológicos, **tecnologías del habla** (texto-a-voz, voz-a-texto).
- *(Punto delicado: valenciano/catalán. En una prueba, limítate a hechos: qué dice la AVL, qué recursos existen, sin entrar en política lingüística.)*

## Bloque 7 — Evaluación de tecnologías del lenguaje

- Métricas de clasificación: **exactitud (accuracy)**, **precisión**, **cobertura/recall**, **F1**.
- Para traducción: **BLEU** y evaluación humana.
- **Prueba piloto**: probar una herramienta en un entorno real reducido antes de desplegarla; recoger errores, opiniones de usuarios y mejoras.
- **Documentación técnica**: qué hace la herramienta, cómo se usa, resultados de la evaluación (tarea 2 de la plaza).

## Bloque 8 — Ética, sesgos y datos

- **Sesgo**: los modelos aprenden de datos; si los datos están desbalanceados, el sistema hereda sesgos (género, dialecto, etc.).
- **Privacidad y protección de datos** (los corpus pueden contener datos personales).
- **Licencias y derechos de autor** de los textos recolectados.
- **Calidad y transparencia**: documentar cómo se construyó un corpus y sus limitaciones.

---

## Recursos gratuitos para preparar

- **Apertium**: https://www.apertium.org/ (probad el traductor valenciano↔español; leer la "doc" para entender RBMT).
- **Softcatalà**: https://www.softcatala.org/ (traductor, correctores).
- Cursos de PLN: introducciones gratuitas de **Coursera** (*Natural Language Processing*), **fast.ai**, o la sección de NLP de **Hugging Face**: https://huggingface.co/learn/nlp-course/ .
- **AVL**: https://www.avl.gva.es/ (normativa y recursos de valenciano).
- Wikipedia (conceptos): "Procesamiento del lenguaje natural", "Traducción automática", "Corpus", "BLEU", "Lenguas con recursos limitados".
- Para practicar vocabulario técnico en ambos idiomas: leer los mismos conceptos en la Wikipedia **en español** y **en valenciano/catalán**.

---

## Banco de preguntas de práctica

*(Respuestas al final. Intenta responder con tus palabras antes de mirar.)*

1. ¿Qué es el procesamiento del lenguaje natural y para qué sirve?
2. Diferencia entre **token** y **tipo**.
3. ¿Qué hace un etiquetador morfosintáctico (POS tagger)?
4. ¿Qué es un **corpus** y qué tipos principales hay?
5. ¿Qué significa **curar** un corpus? Da dos errores típicos que se corrigen.
6. ¿Qué es un **corpus paralelo alineado** y para qué se usa?
7. Cita y describe brevemente los tres paradigmas de la traducción automática.
8. ¿Por qué es relevante **Apertium** para este proyecto?
9. ¿Qué mide la métrica **BLEU**?
10. ¿Qué es una **lengua de pocos recursos** y por qué plantea un reto?
11. Nombra dos estrategias para trabajar con lenguas de pocos recursos.
12. ¿Qué institución fija la normativa del valenciano?
13. Diferencia entre **precisión** y **cobertura (recall)**.
14. ¿Qué es una **prueba piloto** de una herramienta?
15. ¿Qué es un **sesgo** en un modelo de lenguaje y de dónde suele venir?
16. ¿Qué es la **lematización** y en qué se diferencia del *stemming*?
17. ¿Qué es el **reconocimiento de entidades nombradas (NER)**?
18. ¿Qué es la **poseedición** en traducción automática?
19. Nombra dos tecnologías aplicadas al aprendizaje de idiomas.
20. ¿Qué información debe recoger la **documentación técnica** de una herramienta?

### Respuestas orientativas

1. Rama de la IA que permite a las máquinas procesar, comprender y generar lenguaje humano; se usa en traducción, búsqueda, asistentes, correctores, etc.
2. El **token** es cada unidad que aparece (cada palabra/pieza); el **tipo** es la palabra única. "casa casa coche" → 3 tokens, 2 tipos.
3. Asigna a cada palabra su categoría gramatical (nombre, verbo, adjetivo…) según el contexto.
4. Colección de textos reunida con criterio. Tipos: monolingüe, paralelo (con traducciones alineadas) y comparable.
5. Limpiar/normalizar/deduplicar los datos para que sean fiables. Errores: duplicados, ruido/HTML, mezcla de idiomas, ortografía no normativa.
6. Corpus con textos en dos lenguas emparejados frase a frase; es la materia prima para entrenar traductores automáticos.
7. **Reglas** (diccionarios + gramática, p. ej. Apertium), **estadística** (patrones probabilísticos de corpus paralelos) y **neuronal** (redes neuronales; el estándar actual).
8. Es un motor **abierto y basado en reglas**, pensado para lenguas con pocos recursos, con par valenciano↔español.
9. El solapamiento entre la traducción del sistema y una o varias traducciones de referencia (más alto = mejor, con matices).
10. Lengua con poco dato digital disponible (pocos corpus, poca web, pocas herramientas), lo que dificulta entrenar modelos que necesitan muchos datos.
11. Motores basados en reglas (Apertium), transferencia desde una lengua mayor, datos sintéticos/parafraseo, crear y curar corpus propios.
12. La **Acadèmia Valenciana de la Llengua (AVL)**.
13. **Precisión**: de lo que el sistema marcó, cuánto era correcto. **Cobertura/recall**: del total que debía marcar, cuánto encontró.
14. Probar la herramienta en un entorno real pero acotado, con usuarios, para detectar errores y mejorarla antes del despliegue.
15. Tendencia sistemática injusta del modelo, normalmente heredada de datos de entrenamiento desbalanceados.
16. Reducir una palabra a su lema ("corriendo"→"correr"); el *stemming* recorta una raíz aproximada sin garantizar que sea una palabra real.
17. Detectar y clasificar nombres propios/entidades (personas, lugares, organizaciones, fechas) en un texto.
18. Revisión/corrección humana (o semiautomática) de la salida de un traductor automático.
19. Traductores/diccionarios, correctores ortográficos, generadores de ejercicios, chatbots, asistentes de voz, apps de repaso.
20. Qué hace la herramienta, cómo se usa, requisitos, y los resultados de su evaluación (métricas, errores detectados).

---

## Consejos para el día de la prueba

- Repasa los **conceptos** de los bloques 1–8 sabiéndolos **explicar de palabra** (la prueba puede ser oral).
- Domina el vocabulario técnico **en español y en valenciano** (al menos los términos clave: corpus, etiquetatge, traducció automàtica, aprenentatge d'idiomes…).
- Ante una pregunta aplicada ("¿cómo curarías este corpus?"), responde con **pasos concretos**: recolectar → limpiar → normalizar → anotar/etiquetar → validar → documentar.
- Si es oral: hablar despacio, estructurar (primero definir, luego un ejemplo), y no inventar tecnicismos.
- Lleva identificación original en vigor (base 6.4) y revisa el nivel de alerta meteorológica (base 6.5) por si se suspende la prueba.
