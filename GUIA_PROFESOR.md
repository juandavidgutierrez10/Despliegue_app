# Guía del profesor · App de Despliegue (2º DAW)

Web estática: no tiene servidor, base de datos ni cuentas. Funciona en GitHub Pages y también abriendo `index.html` desde el disco, sin internet.

## Estructura

```
index.html            página única (no hace falta tocarla)
config.js             ← lo que tocas en el día a día: estado de las unidades
assets/app.css        estilos
assets/app.js         motor: apuntes, ejercicios, tutor, autoevaluación (no hace falta tocarlo)
contenido/ut1.js      contenido de cada unidad
contenido/ut2.js
contenido/ut3.js
GUIA_PROFESOR.md      este archivo
```

## Publicarla en GitHub Pages (una sola vez)

1. En GitHub, crea un repositorio nuevo (por ejemplo `despliegue-daw`), público.
2. Sube todos los archivos de la carpeta. Lo más rápido desde la web: **Add file → Upload files**, arrastra el contenido de la carpeta (no la carpeta en sí) y **Commit changes**. Con Git:
   ```
   git init
   git add .
   git commit -m "feat: primera versión de la app de Despliegue"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/despliegue-daw.git
   git push -u origin main
   ```
3. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`, **Save**.
4. En uno o dos minutos estará en `https://TU_USUARIO.github.io/despliegue-daw/`. Pon ese enlace en Classroom.

A partir de ahí, cada `git push` (o cada cambio hecho desde la web de GitHub) se publica solo en un minuto. Es despliegue continuo: puedes enseñárselo a los alumnos como ejemplo real de la UT1 y la UT3.

## Abrir una unidad nueva

En `config.js`, cambia el `estado` de la unidad:

- `"actual"`: abierta y destacada.
- `"repaso"`: abierta.
- `"bloqueada"`: solo se ve el título; su contenido no se carga.

Ejemplo para pasar a la UT4: la UT3 pasa a `"repaso"` y la UT4 a `"actual"`. Guarda y haz commit (o edita el archivo directamente en GitHub con el lápiz). Para la UT4 tendrá que existir `contenido/ut4.js`.

Ojo: el bloqueo es «no mostrar», no un secreto. Un alumno que se descargue el repositorio podría cambiar su `config.js` local. Como son apuntes, no importa; no pongas en la app nada que no deban ver (soluciones de exámenes, por ejemplo).

## El modo Pro

Está preparado pero oculto: `modoPro: false` en `config.js`. Cuando tenga contenido, se pondrá a `true` y aparecerá el interruptor Aprobar / Pro en la cabecera.

## Editar el contenido

Cada unidad es un archivo `contenido/utN.js` con esta forma:

```js
DAW.unidad({
  id: "ut3",
  secciones: [
    {
      id: "http",                       // identificador corto, sin espacios (sale en la URL)
      titulo: "El protocolo HTTP",
      objetivos: ["...", "..."],        // «En esta sección»
      claves: ["...", "..."],           // conceptos que usa el prompt «repaso tipo examen»
      bloques: [ ... ],                 // los apuntes, en orden
      tutor: { diagnostico: [...], pasos: [...], reto: {...}, cierre: "..." }
    }
  ],
  cuestionario: [ ... ]                 // banco de preguntas de la autoevaluación
});
```

### Formato del texto

En los campos `md` puedes usar: `**negrita**`, `*cursiva*`, `` `código` ``, `[enlace](https://...)`, listas que empiecen por `- ` o por `1. `, y párrafos separados por una línea en blanco. Un `md` puede ser un texto o una lista de textos (un párrafo por elemento):

```js
{ t: "md", md: ["Primer párrafo.", "Segundo párrafo con `curl -I`."] }
```

Usa comillas dobles para los textos y comillas latinas («») dentro de ellos. Si necesitas unas comillas dobles dentro de un texto, escríbelas como `\"`.

### Tipos de bloque

| Bloque | Para qué | Ejemplo |
|---|---|---|
| `md` | Texto | `{ t: "md", md: "..." }` |
| `h`, `h3` | Título de apartado | `{ t: "h", txt: "Métodos" }` |
| `idea`, `cuidado`, `ejemplo`, `empresa` | Recuadros | `{ t: "cuidado", md: "..." }` (opcional `titulo`) |
| `code` | Código con botón Copiar | `{ t: "code", titulo: "Git Bash", code: \`$ curl -I http://localhost:8090\` }` (las líneas con `$ ` son las que se copian) |
| `tabla` | Tabla | `{ t: "tabla", cab: ["A","B"], filas: [["1","2"]] }` |
| `flujo` | Esquema de cajas y flechas | `{ t: "flujo", nodos: [{b:"Cliente", s:"navegador"}, {b:"Nginx", hl:true}], pie: "..." }` |
| `test` | Pregunta de opción múltiple | `{ t: "test", p: "¿...?", o: ["a","b","c"], c: 1, e: "explicación", fb: ["por qué no a", "", "por qué no c"] }` (`c` empieza en 0; `fb` es opcional) |
| `ordenar` | Ordenar elementos | `{ t: "ordenar", p: "...", items: ["primero","segundo","tercero"], e: "..." }` (en el orden correcto; la app los desordena) |
| `relacionar` | Emparejar | `{ t: "relacionar", p: "...", pares: [["izquierda","derecha"], ...] }` |
| `completar` | Huecos | `{ t: "completar", p: "...", texto: "curl ___ http://...", r: [["-I","--head"]] }` (una lista de respuestas válidas por cada `___`) |
| `abierta` | Explicar con sus palabras | `{ t: "abierta", p: "...", modelo: "respuesta modelo", claves: ["punto 1","punto 2"] }` (las claves son la rúbrica de autoevaluación y del prompt para la IA) |
| `practica` | Práctica en el portátil | ver `contenido/ut3.js`: `titulo`, `objetivo`, `antes`, `pasos` (cada uno con `md` y/o `cmd`), `esperado`, `comprobar`, `problemas` |
| `ia` | Caja con un prompt | `{ t: "ia", md: "texto", tema: "concepto" }` (o `prompt: "texto completo"`) |
| `sim-http`, `war` | Simulador HTTP y explorador del WAR (UT3) | `{ t: "sim-http" }` |
| `profundiza` | Caja plegable "¿Quieres profundizar?" | `{ t: "profundiza", titulo: "¿Por qué...?", bloques: [ {t:"md", md:"..."}, {t:"code", ...} ] }` |

**`profundiza`** es la herramienta para que los apuntes no agobien a simple vista: ponla justo después de explicar un concepto cuando creas que a algunos alumnos les bastará con lo esencial, pero otros querrán entender el porqué, ver un caso límite, o un ejemplo más técnico. Se ve como una caja cerrada con el título que le pongas (si no pones `titulo`, sale "¿Quieres profundizar?"); al pulsarla se despliega. Dentro de `bloques` puedes meter cualquier tipo de bloque de esta tabla (md, code, tabla, idea, cuidado, ejemplo, test, etc.), incluso otro `profundiza` anidado. No hace falta usarlo en todos los conceptos — solo en los que suelen generar dudas o donde de verdad hay algo interesante que añadir; si lo pones en todos los párrafos pierde el sentido (sería como no tenerlo).

### El tutor

- `diagnostico`: 2 o 3 preguntas tipo `test` (sin `t`). Si las acierta todas, el tutor ofrece ir rápido y se salta los pasos marcados con `base: true`.
- `pasos`, en orden. Tipos:
  - `{ t: "explica", md: "...", otra: "explicación alternativa", tema: "para el prompt", bloques: [...] }` (si pulsa «No lo he pillado» ve `otra` y un prompt para su IA).
  - `{ t: "test", p, o, c, e, fb }`: tiene que acertar para seguir (puede reintentar).
  - `{ t: "abierta", p, modelo, claves }`.
  - `{ t: "practica", ... }` como el bloque de práctica.
- `reto`: `{ titulo, md, criterios: [...], pista, solucion }`.
- `cierre`: frase final de resumen.

### Autoevaluación

Cada pregunta del `cuestionario`: `{ s: "http", p: "¿...?", o: ["a","b","c","d"], c: 2, e: "explicación" }`. `s` es el `id` de la sección a la que remite si la fallan. Cada intento saca 20 al azar y se puntúa como el examen (+1, −1/3, en blanco 0). Cuantas más preguntas tenga el banco, menos se repiten.

Las preguntas son originales, no las de tus exámenes: no copies aquí preguntas de exámenes que vayas a poner.

### Si rompes algo

Si al editar falta una coma o unas comillas, la unidad dejará de aparecer. Para encontrar el error: abre la página, pulsa F12 y mira la pestaña **Consola**: te dirá el archivo y la línea. O pídeme ayuda pegándome el error.

## Progreso de los alumnos

Se guarda en el `localStorage` de su navegador: no hay datos personales ni cuentas, y tú no lo ves. Si cambian de navegador o borran los datos, empiezan de cero.

## Puertos de las prácticas

Las prácticas usan **8090** (Nginx), **8091** (Apache) y **8092** (Tomcat directo) para no chocar con el 8080 y el 8081 que usan en otra asignatura.
