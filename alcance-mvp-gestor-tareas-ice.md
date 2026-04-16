# Alcance funcional MVP: Gestor de tareas inteligente con ICE

## 1. Objetivo del MVP

Construir una aplicacion web muy simple en React para un curso corto, cuyo objetivo sea:

- crear tareas con `nombre` y `descripcion`
- mostrar una lista de tareas en pantalla
- calcular una puntuacion ICE para cada tarea a partir de su descripcion
- hacerlo sin backend y sin persistencia

El MVP debe priorizar la claridad didactica y la facilidad de implementacion sobre la completitud funcional.

## 2. Contexto del producto

La aplicacion ayuda a priorizar tareas de forma rapida usando el modelo ICE:

- `Impact`: impacto esperado de la tarea
- `Confidence`: nivel de confianza en esa estimacion
- `Ease`: facilidad de ejecucion

La estimacion de estos tres valores se obtiene a partir de la descripcion de la tarea mediante una llamada a la API gratuita de Gemini desde el frontend.

## 3. Alcance incluido

### Funcionalidades principales

1. Crear una tarea nueva desde un formulario.
2. Introducir los campos:
   - `nombre`
   - `descripcion`
3. Mostrar la lista de tareas creadas durante la sesion actual.
4. Incluir un boton `Calcular ICE` en cada tarea.
5. Al pulsar el boton, llamar a la API gratuita de Gemini desde React.
6. Recibir una respuesta estructurada con:
   - valor de `impact` (escala 1-10)
   - valor de `confidence` (escala 1-10)
   - valor de `ease` (escala 1-10)
   - breve justificacion textual (maximo 200 palabras)
7. Rellenar los tres campos editables de la tarea con los valores devueltos por la API. El usuario puede modificarlos manualmente tras recibirlos.
8. Calcular y mostrar la puntuacion final ICE de la tarea.
9. Ordenar la lista de tareas por puntuacion ICE de mayor a menor.

### Comportamiento esperado

- La tarea se crea primero con `nombre` y `descripcion`.
- Inicialmente no tiene puntuacion ICE.
- El usuario pulsa `Calcular ICE`.
- La app envia la descripcion a la API de IA.
- La IA devuelve una estimacion de `impact`, `confidence` y `ease` en escala `1-10`.
- La app calcula la puntuacion final:

`ICE = Impact * Confidence * Ease`

- Los tres campos (`impact`, `confidence`, `ease`) de la tarea se rellenan con los valores devueltos por la API. El usuario puede editarlos manualmente.
- Al modificar cualquier campo, el score ICE se recalcula automaticamente en el frontend.
- La lista se ordena por puntuacion ICE de mayor a menor.
- La tarea muestra tambien la justificacion generada por la IA (maximo 200 palabras).

## 4. Alcance tecnico

### Frontend

- Aplicacion SPA hecha con React.
- Estado manejado solo en memoria con `useState` o una solucion equivalente simple.
- Interfaz minima, enfocada en aprender los conceptos del curso.

### Sin backend

- No habra servidor propio.
- No habra base de datos.
- No habra autenticacion.
- No habra API propia.

### Sin persistencia

- Las tareas solo existen mientras la pagina esta abierta.
- Si el usuario recarga el navegador, se pierde la informacion.
- No se usara `localStorage`, `IndexedDB` ni almacenamiento remoto.

## 5. Integracion con IA

### Requisito funcional

La aplicacion debe tener un boton que invoque la API gratuita de Gemini para analizar la descripcion de la tarea y devolver una propuesta de valores ICE en escala 1-10.

### Requisitos minimos de la respuesta de IA

La respuesta deberia poder mapearse a esta estructura:

```json
{
  "impact": 7,
  "confidence": 6,
  "ease": 8,
  "reason": "Tarea con impacto medio-alto, bastante clara y relativamente facil de ejecutar. Maximo 200 palabras."
}
```

Los valores de `impact`, `confidence` y `ease` son siempre enteros entre 1 y 10. El campo `reason` no debe superar las 200 palabras. El prompt debe indicar ambas restricciones explicitamente a Gemini para maximizar la consistencia de las respuestas.

### Consideraciones didacticas

- La llamada puede hacerse directamente desde React para simplificar el ejercicio.
- Conviene usar un prompt muy controlado para pedir una salida corta y estructurada.
- Si la API falla, la app debe mostrar un mensaje de error simple.

## 6. Pantallas o bloques minimos

### 1. Formulario de creacion

Debe permitir:

- escribir el nombre de la tarea
- escribir la descripcion
- pulsar `Agregar tarea`

### 2. Lista de tareas

Cada tarjeta o fila de tarea debe mostrar:

- nombre
- descripcion
- boton `Calcular ICE`
- estado del ICE: no calculado / calculando / calculado / error
- tres campos numericos editables: `impact`, `confidence`, `ease` (rango 1-10)
- puntuacion ICE calculada en tiempo real segun los tres campos
- justificacion generada por la IA si existe

## 7. Modelo de datos minimo

Cada tarea puede representarse asi:

```ts
type Task = {
  id: string;
  name: string;
  description: string;
  impact?: number;
  confidence?: number;
  ease?: number;
  iceScore?: number;
  reason?: string;
  status: "idle" | "loading" | "done" | "error";
  errorMessage?: string;
};
```

## 8. Reglas funcionales simples

1. `nombre` es obligatorio.
2. `descripcion` es obligatoria, porque de ella depende el calculo ICE.
3. No se puede calcular ICE si la descripcion esta vacia.
4. Mientras se consulta la IA, el boton debe deshabilitarse.
5. Si la IA responde correctamente, los campos `impact`, `confidence` y `ease` se rellenan con los valores recibidos. El usuario puede modificarlos manualmente.
6. Cualquier cambio manual en los tres campos recalcula el ICE score de inmediato.
7. Los valores de los campos estan limitados al rango 1-10. No se aceptan valores fuera de ese rango.
8. Si la IA falla o devuelve un formato invalido, se muestra un error simple al usuario.
9. La lista se ordena siempre por puntuacion ICE de mayor a menor, incluyendo los cambios manuales.

## 9. Fuera de alcance para este MVP

Para mantener el proyecto pequeno y adecuado para un curso corto, quedan fuera:

- edicion de tareas
- borrado de tareas
- subtareas
- etiquetas o categorias
- filtros avanzados
- drag and drop
- login de usuarios
- persistencia de datos
- backend propio
- historico de calculos
- recalculo automatico en tiempo real
- paneles, graficos o analytics

## 10. Criterios de aceptacion

El MVP se considera valido si cumple lo siguiente:

1. La app permite crear tareas con nombre y descripcion.
2. Las tareas se muestran en una lista ordenada por puntuacion ICE de mayor a menor.
3. Cada tarea tiene un boton que llama a la API de Gemini.
4. La respuesta de Gemini rellena los campos `impact`, `confidence` y `ease` con valores entre 1 y 10.
5. El usuario puede editar manualmente los tres campos tras recibir la respuesta.
6. Cualquier cambio en los campos recalcula el ICE score de inmediato.
7. La justificacion de la IA no supera las 200 palabras.
8. Todo funciona solo desde React, sin backend ni persistencia.

## 11. Resumen ejecutivo

El MVP consiste en una aplicacion React muy sencilla para registrar tareas y priorizarlas con ICE usando IA. El usuario escribe `nombre` y `descripcion`, crea la tarea y pulsa un boton para que la API gratuita de Gemini estime `impact`, `confidence` y `ease` en escala 1-10 con una justificacion de hasta 200 palabras. Los tres campos son editables manualmente y el score ICE se recalcula en tiempo real. La lista se ordena siempre por puntuacion ICE de mayor a menor. Todo funciona solo en React, sin backend ni persistencia.

---

## 12. Estructura de carpetas del proyecto

Basada en los diagramas de flujo y pantallas definidos en `design/`, pero ajustada para separar mejor la logica de dominio, la UI y la integracion con IA.

```
ice-task-manager/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   └── Navbar.tsx
│   │   ├── TaskForm/
│   │   │   └── TaskForm.tsx
│   │   ├── TaskList/
│   │   │   └── TaskList.tsx
│   │   ├── TaskCard/
│   │   │   └── TaskCard.tsx
│   │   ├── TaskCardHeader/
│   │   │   └── TaskCardHeader.tsx
│   │   ├── TaskCardActions/
│   │   │   └── TaskCardActions.tsx
│   │   ├── IceScoreFields/
│   │   │   └── IceScoreFields.tsx
│   │   └── PriorityModal/
│   │       └── PriorityModal.tsx
│   ├── hooks/
│   │   └── useTasks.ts
│   ├── services/
│   │   └── gemini.ts
│   ├── types/
│   │   └── task.ts
│   ├── utils/
│   │   ├── ice.ts
│   │   └── taskSort.ts
│   ├── App.tsx
│   └── main.tsx
├── tsconfig.json
├── package.json
└── README.md
```

### Criterio de organizacion

- **`components/`**: componentes visuales y de interaccion. Se divide `TaskCard` en piezas mas pequenas para que no concentre toda la logica de render.
- **`hooks/`**: encapsula la logica de estado compartido de tareas. `useTasks.ts` centraliza altas, actualizaciones, confirmaciones y coordinacion con el servicio de IA.
- **`services/`**: integraciones externas. `gemini.ts` solo conoce la API y la transformacion de su respuesta a un formato interno.
- **`types/`**: contratos TypeScript del dominio.
- **`utils/`**: funciones puras sin dependencias de React. `ice.ts` calcula score y valida rango; `taskSort.ts` define una ordenacion estable y reutilizable.

## 13. Division en componentes

Cada componente se corresponde con un bloque funcional visible en los diagramas de pantallas (`design/pantallas_componentes_app.png`), pero con ownership mas claro.

### `Navbar`

- Barra superior fija.
- Muestra el titulo de la aplicacion.
- Incluye un indicador de contexto ("Sesion local · Sin persistencia").
- Componentes MUI: `AppBar`, `Toolbar`, `Typography`, `Chip`.
- No recibe props de estado. Es puramente presentacional.

### `TaskForm`

- Formulario de alta de tarea.
- Campos: `nombre` y `descripcion`.
- Boton principal "Agregar tarea".
- Validacion inline de obligatorios.
- Emite un unico callback de alta al nivel superior.
- Componentes MUI: `Card`, `CardContent`, `TextField`, `Button`, `FormHelperText`.
- Estado local propio: valores del formulario y flags de validacion.

### `TaskList`

- Recibe la lista ya preparada para pintar.
- Renderiza un `TaskCard` por cada tarea.
- No conoce nada de Gemini ni del modal; solo distribuye datos y callbacks.
- Componentes MUI: `Stack`, `Typography`.
- No tiene estado propio.

### `TaskCard`

- Orquesta la composicion visual de una tarea, pero no concentra todos los detalles de UI.
- Recibe una `task` y callbacks de acciones.
- Decide que subbloques se muestran segun el estado de la tarea.
- Componentes MUI: `Card`, `CardContent`, `Box`.
- No tiene estado propio.

### `TaskCardHeader`

- Presenta nombre, descripcion resumida y chip de estado.
- Se encarga de la parte estable de la tarjeta, independientemente de si la tarea esta en `idle`, `loading`, `done` o `error`.
- Componentes MUI: `CardHeader`, `Chip`, `Typography`.
- Puramente presentacional.

### `TaskCardActions`

- Encapsula las acciones disponibles para la tarea.
- Muestra el boton "Calcular ICE", los estados de carga y la accion "Revisar sugerencia" cuando corresponda.
- Muestra errores recuperables con un `Alert` o feedback equivalente.
- Componentes MUI: `Button`, `CircularProgress`, `Alert`, `Stack`.
- Sin estado propio.

### `IceScoreFields`

- Unico punto de edicion manual de `impact`, `confidence` y `ease`.
- Solo aparece cuando la tarea ya tiene valores confirmados.
- Recalcula visualmente el score a partir de props ya procesadas por la capa de estado.
- Evita duplicar la misma logica de edicion en tarjeta y modal.
- Componentes MUI: `TextField`, `Typography`, `Box`, `Paper`.
- Sin estado propio; emite cambios al hook de tareas.

### `PriorityModal`

- Dialog modal unico, montado una sola vez a nivel de `App`.
- No vive dentro de cada `TaskCard`.
- Su responsabilidad es revisar la sugerencia generada por IA antes de confirmarla, no editar los tres campos.
- Muestra resumen de la tarea, sugerencia recibida (`impact`, `confidence`, `ease`), score calculado y justificacion.
- Acciones disponibles:
  - "Cancelar": cierra el modal sin aplicar la sugerencia.
  - "Confirmar sugerencia": aplica los valores sugeridos a la tarea y habilita la edicion inline posterior en `IceScoreFields`.
- Componentes MUI: `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`, `Typography`, `Button`, `Paper`.
- Sin estado local de negocio. Su unica responsabilidad local es apertura/cierre visual.

### Arbol de componentes

```
App
├── Navbar
├── TaskForm
├── TaskList
│   └── TaskCard (x N)
│       ├── TaskCardHeader
│       ├── TaskCardActions
│       └── IceScoreFields
└── PriorityModal
```

### Principio de ownership

- `TaskCard` pinta una tarea.
- `PriorityModal` revisa una sugerencia.
- `IceScoreFields` edita valores confirmados.

Cada responsabilidad tiene una sola superficie clara para evitar duplicidad de logica y acoplamiento entre componentes.

## 14. Gestion del estado

Sin librerias externas. Se mantiene React nativo, pero se extrae la logica de tareas fuera de `App` para evitar que el componente raiz se convierta en un punto de acumulacion de responsabilidades.

### Estado compartido de la aplicacion

El estado principal vive en un hook dedicado `useTasks.ts`, consumido por `App.tsx`.

```
Estado gestionado por useTasks:
  tasks: Task[]
  selectedTaskId: string | null
```

`App` solo coordina layout y conecta componentes con el hook.

### Responsabilidades de `useTasks`

- Crear tareas nuevas.
- Abrir y cerrar el modal de revision.
- Lanzar el calculo ICE contra Gemini.
- Guardar la sugerencia de IA en la tarea.
- Confirmar la sugerencia desde el modal.
- Aplicar ediciones manuales en `impact`, `confidence` y `ease` una vez confirmadas.
- Recalcular score ICE cuando cambian los valores.
- Devolver una lista ordenada de forma estable para pintar.

### Flujo de datos

1. `App` consume `useTasks()`.
2. `App` pasa a `TaskForm` la accion de alta.
3. `App` pasa a `TaskList` la lista ya ordenada y las acciones de tarjeta.
4. `TaskCardActions` puede disparar dos acciones:
   - calcular sugerencia IA
   - abrir modal de revision de sugerencia
5. `PriorityModal` recibe la tarea seleccionada y permite confirmar o cancelar la sugerencia.
6. Tras confirmar, `IceScoreFields` se convierte en la unica via de ajuste manual de valores.

### Estado local de componentes

| Componente      | Estado local                               | Motivo |
| --------------- | ------------------------------------------ | ------ |
| `TaskForm`      | `name`, `description`, flags de validacion | Gestion propia del formulario |
| `PriorityModal` | Ninguno de negocio                         | Solo representa una tarea ya seleccionada |
| Resto           | Ninguno                                    | Son componentes controlados por props |

### Modelo operativo de una tarea

Para reducir ambiguedades entre "sugerido por IA" y "confirmado por usuario", cada tarea debe distinguir dos momentos:

1. **Sugerencia recibida**: la IA ya devolvio `impact`, `confidence`, `ease` y `reason`, pero el usuario aun no la ha confirmado visualmente en el modal.
2. **Valores confirmados**: la sugerencia pasa a ser el valor activo de la tarea y a partir de ahi puede editarse manualmente inline.

Este criterio evita que la misma interaccion se resuelva en dos sitios a la vez.

### Logica de ordenacion

La ordenacion no se deja embebida en el render. Se centraliza en `taskSort.ts` y se aplica desde `useTasks` antes de exponer la lista al arbol de componentes.

Reglas:

1. Tareas con score confirmado primero.
2. Orden descendente por `iceScore`.
3. En empate, mantener orden estable de creacion.
4. Tareas sin score confirmado al final.

Asi se evita que cada componente decida por su cuenta como ordenar o reordenar.

### Manejo de la llamada a Gemini

La llamada a Gemini no queda descrita como un handler suelto en `App`, sino como una capacidad del hook de tareas.

Secuencia:

1. La tarea pasa a `status: "loading"`.
2. `useTasks` llama a `gemini.ts` con la descripcion.
3. Si la respuesta es valida, la tarea guarda la sugerencia recibida y pasa a un estado listo para revision.
4. El usuario abre `PriorityModal` y confirma la sugerencia.
5. Al confirmar, los valores sugeridos pasan a ser valores activos y editables inline.
6. Si Gemini falla o responde mal, la tarea pasa a `status: "error"` con `errorMessage`.

### Por que se mantiene `useState`

- El proyecto sigue siendo un MVP corto y didactico.
- No hay multiples dominios de estado independientes.
- El problema principal no era la falta de librerias, sino la concentracion de responsabilidades en `App` y la duplicidad de superficies de edicion.
- Extraer `useTasks` resuelve esa presion sin salir de React nativo.
