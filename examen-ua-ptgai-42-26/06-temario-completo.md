# Temario completo · Especialista en Tecnologías del Lenguaje (I-PTGAI 42-26)

Documento de estudio principal. Integra y ordena el contenido técnico de la plaza,
con un criterio claro de prioridad para que no te ahogues en lo avanzado.

## Leyenda (úsala siempre)

| Marca | Significado |
|---|---|
| 🟢 | **Esencial** — muy probable en la prueba; imprescindible saberlo explicar. |
| 🟡 | **Profundidad** — para destacar; opcional si vas justo de tiempo. |
| 🔧 | **Refuerza tu perfil** — conecta con tu CdP de programación; aquí tú ya partes con ventaja. |
| 📌 | **Memorizar** — dato, fórmula o nombre exacto. |

## Calibración honesta (léelo antes de estudiar)

La plaza es de **personal especialista de apoyo** (bachillerato), 20 h/semana, con
tareas de **apoyo** a desarrollo, documentación, difusión, pruebas piloto y **curación
de corpus**. La prueba puntúa 5 puntos y está "relacionada con las tareas".

Traducción práctica: **no te van a pedir derivar la fórmula de BLEU ni implementar BPE
desde cero.** Te van a pedir que **entiendas los conceptos, los sepas explicar y los
apliques** (¿cómo curas un corpus?, ¿cómo evalúas un traductor?, ¿cómo haces una prueba
piloto?). Por eso:

- Lo **🟢** es lo que de verdad cae y lo que debes dominar al 100 %.
- Lo **🟡** lo estudias *después*, para soltar nombres técnicos con soltura (BPE,
  Transformer, back-translation) que te hacen destacar.
- Lo **🔧** es tu terreno: apréndelo porque te diferencia del opositor sin base técnica.

---

# BLOQUE 1 · Arquitectura y pipeline del PLN

## 1.0 La idea en una frase

El **Procesamiento del Lenguaje Natural (PLN)** es la rama de la IA que permite a las
máquinas entender, procesar y generar lenguaje humano. Trabajar con texto no
estructurado exige transformarlo en algo que la máquina pueda calcular.

## 1.1 El *pipeline* 🟢

El PLN moderno procesa el texto en **etapas secuenciales** (un *pipeline*): cada fase
transforma el resultado de la anterior.

```
Texto bruto → Tokenización → Normalización → Análisis (POS/NER) → Tarea final
                                                          (traducción, clasificación…)
```

| Etapa | Qué hace | Ejemplo |
|---|---|---|
| Tokenización | Divide el texto en unidades (tokens) | "Hola, món" → ["Hola", ",", "món"] |
| Normalización | Lematiza, minúsculas, quita ruido | "corriendo" → "correr" |
| Análisis | Etiqueta categorías, detecta entidades | "món" → NOMBRE |
| Tarea final | Aplica el objetivo (traducir, clasificar…) | salida del sistema |

📌 **Punto clave para la prueba**: en lenguas minorizadas (como el valenciano) la
dificultad no es la teoría, es la **escasez de herramientas estandarizadas** para cada
etapa. Por eso parte del trabajo de la plaza es **crear y curar** esos recursos.

## 1.2 Tokenización avanzada 🟡🔧

La tokenización ingenua (separar por espacios) falla con puntuación, contracciones y
**palabras fuera de vocabulario (OOV)**. Los modelos modernos usan **tokenización por
subpalabras**: dividen en piezas menores que la palabra, de modo que cualquier palabra
nueva se puede componer de piezas conocidas.

| Algoritmo | Idea central | Quién lo usa |
|---|---|---|
| **BPE** (Byte-Pair Encoding) | Nace como algoritmo de compresión; fusiona iterativamente los **pares de caracteres más frecuentes** | GPT, RoBERTa |
| **WordPiece** | Como BPE, pero elige la fusión que **maximiza la verosimilitud** del modelo de lenguaje | BERT |
| **SentencePiece** | Trata el texto como Unicode puro, **sin pre-tokenización**; independiente del idioma | T5, LLaMA |

📌 **Ejemplo para explicar en la prueba**: "valencià" puede descomponerse en "valen" +
"cià" si esas subpalabras son frecuentes. Así, una palabra nunca vista puede
representarse combinando piezas ya conocidas → se resuelve el problema OOV.

## 1.3 Normalización: lematización vs. *stemming* 🟢

| | *Stemming* | Lematización |
|---|---|---|
| Qué hace | **Recorta** con reglas heurísticas | Devuelve el **lema** (forma de diccionario) |
| Ejemplo | "corriendo" → "corriend" | "corriendo" → "correr" |
| Precisión | Rápido pero impreciso | Exacto, necesita análisis morfológico |
| Algoritmos | Porter (inglés), Snowball | FreeLing, Apertium (para valenciano) |

📌 Para el valenciano se necesitan **diccionarios morfológicos exhaustivos**, como los
de **FreeLing** o **Apertium**. Aprende estos dos nombres: son la respuesta correcta a
"¿qué herramienta lematiza en valenciano?".

## 1.4 POS tagging y NER 🟢

- **POS tagging (etiquetado morfosintáctico)**: asigna a cada token su categoría
  gramatical (N, V, ADJ…). Métodos:
  - **HMM** (Modelos Ocultos de Markov): modelos probabilísticos de secuencia. 🟡
  - **CRF** (Conditional Random Fields): modelos discriminativos de secuencia. 🟡
  - **BiLSTM**: redes neuronales recurrentes bidireccionales (leen la frase en ambos
    sentidos). 🟡
- **NER (Reconocimiento de Entidades Nombradas)**: detecta y clasifica entidades
  (personas, lugares, organizaciones, fechas).

📌 **Uso clave que conecta con la plaza**: en la curación de corpus, el NER sirve para
**anonimizar** — detectar nombres propios, direcciones, etc. y eliminarlos o
enmascararlos para cumplir el **RGPD**. Este es un "caso práctico" muy probable.

---

### Autoevaluación · Bloque 1

1. ¿Qué es el PLN y qué etapas tiene un *pipeline* típico?
2. ¿Por qué los modelos modernos usan tokenización por subpalabras?
3. ¿En qué se diferencian lematización y *stemming*? ¿Qué herramienta usarías en valenciano?

*(Respuestas breves al final del documento.)*

---

# BLOQUE 2 · Ingeniería de corpus y minería de textos (curación) 🔧

Este es **el bloque más importante para tu plaza**: la "curación de corpus y etiquetado
de datos" es una tarea explícita del puesto, y además es tu terreno (programación).

## 2.0 El principio rector: GIGO 🟢

**Garbage In, Garbage Out** ("basura entra, basura sale"). Si entrenas con datos sucios,
el modelo aprende mal, por bueno que sea el algoritmo. La calidad del corpus **manda**.

## 2.1 Recolección (*crawling*) 🟡

Recolectar texto masivo de la web:

- **Frameworks automatizados** de *crawling/scraping* (arañas que recorren páginas).
- **Respetar `robots.txt`** (indica qué se permite rastrear) y el **`crawl delay`**
  (pausa entre peticiones para no saturar el servidor).
- Los documentos salen en **HTML, PDF o DOCX** → hace falta **parseo** para extraer el
  texto limpio (eliminar *boilerplate*: menús, publicidad, cabeceras repetidas).

## 2.2 Limpieza y deduplicación 🟢

| Fase | Objetivo | Técnica/herramienta |
|---|---|---|
| **Filtro de idioma** | Descartar oraciones que no son valenciano | n-gramas de caracteres: **FastText** (Meta), **CLD3** (Google) |
| **Deduplicación exacta** | Quitar textos idénticos | comparación directa (`drop_duplicates`) |
| **Deduplicación difusa** | Quitar textos *casi* idénticos | **MinHash + LSH** (búsqueda de vecinos aproximada y escalable) |
| **Alineación de oraciones** | Emparejar frases de un corpus paralelo | **Hunalign** (por longitud + diccionarios) |

📌 **Nombres para retener**: FastText/CLD3 (idioma), MinHash/LSH (duplicados difusos),
Hunalign (alineación paralela). Dicho en la prueba, suena a que sabes de qué hablas.

## 2.3 Pipeline de curación en Python 🔧🟢

Guion **simplificado** (el real añadiría filtro de idioma y deduplicación difusa):

```python
import pandas as pd

def curar_corpus(df: pd.DataFrame) -> pd.DataFrame:
    """Pipeline simplificado de limpieza de un corpus de textos."""
    df = df.copy()                          # no modificar el original

    # 1. Deduplicación exacta
    df = df.drop_duplicates(subset=["texto"])

    # 2. Quitar URLs y menciones (ruido típico web)
    df["texto"] = df["texto"].str.replace(r"http\S+", "", regex=True)
    df["texto"] = df["texto"].str.replace(r"@\w+",    "", regex=True)

    # 3. Normalizar espacios múltiples y recortar extremos
    df["texto"] = (df["texto"]
                   .str.replace(r"\s+", " ", regex=True)
                   .str.strip())

    # 4. Filtrar por longitud (heurística de calidad)
    n_palabras = df["texto"].str.split().str.len()
    df = df[(n_palabras > 3) & (n_palabras < 100)]

    return df.reset_index(drop=True)
```

**Qué hace cada paso** (para poder explicarlo de palabra):

1. **`drop_duplicates`** → elimina filas con texto idéntico.
2. **`re.sub(r"http\S+", "")`** → borra URLs (todo lo que empiece por `http` sin
   espacios). El `@\w+` borra menciones tipo `@usuario`.
3. **`r"\s+" → " "` + `strip()`** → colapsa saltos de línea y espacios dobles en uno, y
   recorta blancos de los extremos.
4. **Filtro de longitud** → descarta frases de ≤3 palabras (inútiles) y ≥100 (párrafos
   gigantes que suelen ser ruido). Es una **heurística**: una regla práctica, no una
   verdad matemática.

📌 **Qué le falta** (para decirlo y quedar bien): filtro de idioma (FastText),
deduplicación difusa (MinHash/LSH) y **normalización ortográfica según la AVL**.

---

### Autoevaluación · Bloque 2

1. ¿Qué significa GIGO y por qué importa en un corpus?
2. ¿Qué diferencia hay entre deduplicación exacta y difusa? ¿Qué algoritmos usarías?
3. Explica con tus palabras los 4 pasos del `curar_corpus` de arriba.

---

# BLOQUE 3 · Paradigmas de traducción automática (TA) 🟢

## 3.1 Traducción basada en reglas (RBMT) — Apertium

**Apertium** es una plataforma RBMT **libre** de *shallow-transfer* (transferencia
superficial), diseñada para **lenguas emparentadas** como valenciano ↔ castellano. Se
organiza en **módulos independientes conectados por tuberías (*pipes*)**:

| Módulo | Función |
|---|---|
| **De-formateador** | Separa el texto del formato (HTML, RTF), encapsulando etiquetas |
| **Analizador morfológico** | Asigna a cada palabra todas sus lecturas posibles (lema + etiquetas) |
| **Desambiguador** (CG/HMM) | Elige la lectura correcta según contexto (*Constraint Grammar*) |
| **Transferencia estructural** | Reordena palabras / ajusta concordancias (género, número) |
| **Generador morfológico** | Convierte lema + etiquetas en la forma flexionada final |

📌 **Aprende la secuencia**: desformatear → analizar → desambiguar → transferir →
generar. Si te preguntan "¿cómo funciona Apertium?", esa es la respuesta.

## 3.2 Traducción estadística (SMT) 🟡

Aprende patrones de grandes **corpus paralelos** mediante probabilidad. Ya superada por
la neuronal, pero es el puente conceptual entre reglas y redes.

## 3.3 Traducción neuronal (NMT) y el Transformer 🟢

El estándar actual es la arquitectura **Transformer** ("Attention Is All You Need",
2017). Su diferencia clave frente a las redes recurrentes (RNN):

- **Self-attention**: cada palabra "mira" a **todas** las demás de la frase y les da un
  **peso de relevancia**. La frase se procesa **en paralelo**, no palabra a palabra.
- Resuelve las **dependencias de larga distancia** (relacionar una palabra con otra muy
  alejada en la frase).

📌 **En una frase**: el Transformer traduce considerando toda la frase a la vez y
ponderando qué palabras importan para cada decisión.

## 3.4 Comparativa de paradigmas 🟢

| Paradigma | Fuente del conocimiento | Ventaja | Inconveniente |
|---|---|---|---|
| RBMT (Apertium) | Reglas + diccionarios | Sin datos, controlable | Rígido, costoso de mantener |
| SMT | Corpus paralelo | Aprende solo | Frases raras, fluidez limitada |
| NMT (Transformer) | Corpus paralelo masivo | Fluidez y contexto | Muchos datos, opaco |

---

### Autoevaluación · Bloque 3

1. Nombra los módulos de Apertium en orden.
2. ¿Qué mecanismo clave diferencia al Transformer de una RNN?
3. ¿Por qué Apertium es especialmente relevante para valenciano ↔ castellano?

---

# BLOQUE 4 · Estrategias para lenguas de pocos recursos 🟢

El valenciano sufre **escasez de datos** (*data sparsity*): poco corpus y pocas
herramientas. Estrategias para compensarlo:

## 4.1 Transfer Learning (aprendizaje transferido) 🟢

Entrenar un **modelo base multilingüe** con lenguas de muchos recursos (español, inglés)
y luego hacer **fine-tuning** (ajuste fino) con el corpus en valenciano. Reaprovechas lo
que el modelo ya sabe de otras lenguas.

📌 **Analogía**: aprender a montar en bici con una bici buena y luego adaptarte a otra
similar cuesta poco; no empiezas de cero.

## 4.2 Back-translation (traducción inversa) 🟡

Técnica de **aumento de datos**: coges un corpus monolingüe en valenciano, lo traduces al
español con un modelo intermedio, y usas los pares resultantes (español *sintético* →
valenciano *real*) para entrenar el modelo final. Multiplicas datos de entrenamiento sin
necesidad de textos paralelos humanos.

## 4.3 Ejecución local de modelos 🟡🔧

Desplegar **LLMs cuantizados** en local (p. ej. con **Ollama**) para tareas de evaluación
o **etiquetado sintético**, sin enviar los datos a servidores externos → protege la
**privacidad** de los corpus.

📌 **Cuantización**: reducir la precisión numérica del modelo (ej. de 16 a 4 bits) para
que ocupe menos y quepa en un ordenador normal.

---

### Autoevaluación · Bloque 4

1. ¿Qué es el *data sparsity* y a qué lengua de esta plaza afecta?
2. Explica el *fine-tuning* con una analogía.
3. ¿Para qué sirve el *back-translation*?

---

# BLOQUE 5 · Evaluación técnica y métricas 🟢🔧

## 5.1 La matriz de confusión 🟢

| | Predicho SÍ | Predicho NO |
|---|---|---|
| **Real SÍ** | **TP** (verdadero positivo) | **FN** (falso negativo) |
| **Real NO** | **FP** (falso positivo) | **TN** (verdadero negativo) |

## 5.2 Precisión, cobertura y F1 📌

- **Precisión** = TP / (TP + FP) → *de lo que marqué, ¿cuánto acerté?*
- **Cobertura (Recall)** = TP / (TP + FN) → *de lo que existía, ¿cuánto encontré?*
- **F1** = 2 · (Precisión · Cobertura) / (Precisión + Cobertura) → media **armónica** de
  ambas; penaliza que una de las dos sea muy baja.

📌 **Truco de memoria**: Precisión mira el **resultado** (¿es fiable lo que digo?);
Cobertura mira la **realidad** (¿me dejo cosas?). F1 es el equilibrio.

## 5.3 BLEU (evaluación de traducción) 🟡

**BLEU** (*Bilingual Evaluation Understudy*) compara la salida del sistema con una o
varias **traducciones de referencia humanas**, n-grama a n-grama.

Conceptualmente: **BLEU = BP · exp( Σ wₙ · log(pₙ) )**
- **pₙ** = precisión de n-gramas (1-grama, 2-grama… hasta 4-grama).
- **BP** = *Brevity Penalty*: penaliza traducciones **demasiado cortas** (si el sistema
  suelta una sola palabra, su precisión de n-gramas sería engañosa).

📌 **No hace falta memorizar la fórmula**: retén que BLEU mide **solapamiento con
referencias** y que **penaliza traducciones cortas**.

## 5.4 Evaluación humana y prueba piloto 🟢

- **Automática** (BLEU, F1) = barata y rápida, pero no capta naturalidad ni sentido.
- **Humana** = fluidez y adecuación; más cara, pero definitiva.
- **Prueba piloto** = probar la herramienta en entorno real **acotado** con un grupo
  reducido antes del despliegue.

---

### Autoevaluación · Bloque 5

1. Define precisión y cobertura y pon un ejemplo numérico.
2. ¿Qué es la F1 y por qué es una media *armónica*?
3. ¿Qué penaliza el *Brevity Penalty* de BLEU?

---

# BLOQUE 6 · Marco normativo y estandarización digital 🟢

## 6.1 Normativa lingüística 📌

Toda tecnología financiada por la **Dirección General de Política Lingüística** debe
cumplir la normativa de la **AVL (Acadèmia Valenciana de la Llengua)**:
- **DNV** — *Diccionari Normatiu Valencià*.
- **Gramàtica Normativa Valenciana**.

📌 Las salidas generadas y los corpus normalizados deben respetar **DNV + Gramàtica AVL**.

## 6.2 Legalidad de los datos 📌

- **LOPDGDD 3/2018** (Ley Orgánica de Protección de Datos y garantía de derechos
  digitales): los corpus con datos personales deben **anonimizarse** (aquí entra el NER).
- **Ley de Propiedad Intelectual (LPI)**: la recolección de textos debe **auditarse** en
  cuanto a derechos de autor — no todo lo que está en la web se puede reutilizar.

---

### Autoevaluación · Bloque 6

1. ¿Qué es la AVL y qué dos obras normativas publica?
2. ¿Qué papel juega el NER en el cumplimiento de la LOPDGDD?
3. ¿Por qué hay que auditar los textos recolectados respecto a la LPI?

---

# BLOQUE 7 · El proyecto (contexto que sí pueden preguntar) 🟢

Repaso rápido de la propia convocatoria, por si la prueba mezcla preguntas de contexto:

- **Línea de investigación (LIF)**: *Tecnologías de la traducción para lenguas de pocos
  recursos*.
- **Proyecto inicial**: *Promoción del valenciano con inteligencia artificial 2026*.
- **Financia**: Generalitat Valenciana (Vicepresidencia Segunda y Conselleria de
  Presidencia · Dirección General de Política Lingüística).
- **Unidad**: Instituto Universitario de Investigación Informática (UA).
- **Las 5 tareas**: apoyo al desarrollo/evaluación de tecnologías del lenguaje · documentación
  técnica · difusión de resultados · pruebas piloto · **curación de corpus y etiquetado**.

📌 Si te preguntan "¿qué harías tú en este puesto?", responde anclando en esas 5 tareas,
con especial peso en **curación de corpus** (Bloque 2).

---

# ANEXO A · Glosario trilingüe

| Castellano | Valenciano | Inglés |
|---|---|---|
| corpus | corpus | corpus |
| etiquetado / anotación | etiquetatge / anotació | tagging / annotation |
| traducción automática | traducció automàtica | machine translation |
| procesamiento del lenguaje natural | processament del llenguatge natural | natural language processing |
| minería de textos | mineria de textos | text mining |
| datos | dades | data |
| prueba piloto | prova pilot | pilot test |
| evaluación | avaluació | evaluation |
| herramienta | ferramenta / eina | tool |
| desarrollo | desenvolupament | development |
| aprendizaje automático | aprenentatge automàtic | machine learning |
| redes neuronales | xarxes neuronals | neural networks |
| voz | veu | speech |
| lenguaje | llenguatge / llengua | language |

---

# ANEXO B · Chuleta de fórmulas (memorizar)

- **Precisión** = TP / (TP + FP)
- **Cobertura (Recall)** = TP / (TP + FN)
- **F1** = 2·P·R / (P + R)
- **BLEU** ≈ precisión de n-gramas (con *Brevity Penalty*) frente a referencias humanas
- **Baremo de la plaza**: prueba 5 (mín. 3) · experiencia 3 · formación 3 · valenciano 1

---

# ANEXO C · Plan de estudio sugerido

| Día | Qué estudiar | Con qué |
|---|---|---|
| D1 | Bloques 2 y 5 (curación + evaluación) — los más rentables | `02-guia-estudio-prueba.md` + `03-banco-tipo-test.md` |
| D2 | Bloques 1 y 3 (PLN + traducción) | este documento |
| D3 | Bloques 4 y 6 (pocos recursos + normativa) + Bloque 7 | este documento |
| D4 | Repaso integral: autoevaluaciones + casos prácticos en voz alta | `04-guion-oral.md` |

**Método por bloque**: 1) lee el bloque → 2) responde su autoevaluación por escrito →
3) explícalo en voz alta (30 s por concepto) → 4) repasa los fallos.

---

# Respuestas de las autoevaluaciones

**Bloque 1**
1. Rama de la IA para procesar/generar lenguaje. Pipeline: tokenización → normalización
   → análisis (POS/NER) → tarea final.
2. Para resolver las palabras fuera de vocabulario (OOV), componiéndolas con subpalabras
   conocidas (BPE, WordPiece, SentencePiece).
3. El *stemming* recorta por reglas ("corriend"); la lematización devuelve el lema
   ("correr"). En valenciano: FreeLing o Apertium.

**Bloque 2**
1. Garbage In, Garbage Out: con datos sucios el modelo aprende mal; la calidad del corpus
   es lo primero.
2. Exacta = textos idénticos (comparación directa). Difusa = casi idénticos
   (MinHash + LSH).
3. Deduplicar → quitar URLs/menciones → normalizar espacios → filtrar por longitud.

**Bloque 3**
1. Desformatear → analizar → desambiguar → transferir → generar.
2. El *self-attention*: cada palabra pondera a todas las demás y la frase se procesa en
   paralelo (vs. RNN secuencial).
3. Es RBMT libre pensado para lenguas emparentadas y con pocos recursos, y tiene par
   valenciano ↔ castellano.

**Bloque 4**
1. Escasez de datos digitales (poco corpus/herramientas); afecta al valenciano.
2. Ajuste fino: aprovechar un modelo ya entrenado en lenguas grandes y adaptarlo al
   valenciano (como adaptar una habilidad ya aprendida).
3. Aumento de datos: traducir valenciano→español sintético para crear pares de
   entrenamiento sin textos paralelos humanos.

**Bloque 5**
1. Precisión = de lo marcado, cuánto acerté (TP/(TP+FP)); cobertura = de lo real, cuánto
   encontré (TP/(TP+FN)). Ej.: 8 spam correctos de 10 marcados (P=0,8) sobre 12 reales
   (R=0,67).
2. Media armónica de precisión y cobertura; penaliza si una es muy baja.
3. Traducciones demasiado cortas.

**Bloque 6**
1. Acadèmia Valenciana de la Llengua; publica el DNV y la Gramàtica Normativa Valenciana.
2. Detecta nombres/direcciones para anonimizarlos (RGPD/LOPDGDD).
3. Porque no todo lo publicado en la web es reutilizable sin permiso (derechos de autor).
