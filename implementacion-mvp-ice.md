# Implementacion del MVP: Gestor de tareas inteligente con ICE

## 1. Objetivo del documento

Este documento traduce el alcance funcional del MVP a un plan de implementacion ordenado en 8 tareas, pensado desde una arquitectura React simple, mantenible y didactica.

La prioridad no es construir una aplicacion "enterprise", sino un MVP claro para curso corto, con responsabilidades bien separadas y una secuencia de trabajo que reduzca retrabajo.

## 2. Principios arquitectonicos

- Mantener React nativo y estado en memoria.
- Separar dominio, UI e integraciones externas.
- Evitar que `App` concentre toda la logica.
- Aislar la llamada a Gemini en `services/`.
- Centralizar la logica de tareas en `useTasks`.
- Usar componentes presentacionales pequenos y con ownership claro.

## 3. Estructura objetivo

```text
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
├── package.json
└── README.md
```

## 4. Orden de implementacion

La secuencia propuesta busca desbloquear primero el dominio y el flujo base, despues la integracion con IA, y al final el refinamiento de UX.

### Tarea 1. Bootstrap del proyecto y contratos base

**Objetivo**

Levantar la base tecnica del proyecto para que el resto del desarrollo se apoye en contratos y utilidades consistentes.

**Incluye**

- Crear la aplicacion React con TypeScript.
- Definir la estructura de carpetas inicial.
- Crear el tipo `Task`.
- Crear utilidades puras para calculo ICE y validacion de rango.
- Crear la utilidad de ordenacion estable de tareas.

**Entregables**

- `src/types/task.ts`
- `src/utils/ice.ts`
- `src/utils/taskSort.ts`
- `src/App.tsx` y `src/main.tsx` con layout base

**Criterio de cierre**

- El proyecto arranca correctamente.
- Existe un modelo `Task` alineado con el alcance.
- El calculo `ICE = impact * confidence * ease` queda aislado en una funcion pura.
- La ordenacion no depende del render.

### Tarea 2. Gestion central de estado con `useTasks`

**Objetivo**

Concentrar los casos de uso del MVP en un hook dedicado para evitar acoplar la logica de negocio a la capa visual.

**Incluye**

- Gestionar `tasks` en memoria.
- Gestionar `selectedTaskId`.
- Exponer accion para crear tareas.
- Exponer accion para actualizar valores ICE.
- Exponer lista ya ordenada para render.
- Preparar acciones para apertura y cierre del modal.

**Entregables**

- `src/hooks/useTasks.ts`

**Criterio de cierre**

- `App` consume un hook unico para coordinar el flujo principal.
- La creacion y actualizacion de tareas no se implementa dentro de componentes de UI.
- El hook devuelve una API clara y reutilizable.

### Tarea 3. Formulario de alta de tareas

**Objetivo**

Permitir al usuario crear tareas nuevas con validacion minima y una experiencia simple.

**Incluye**

- Construir `TaskForm`.
- Gestion local de `name` y `description`.
- Validacion inline de campos obligatorios.
- Envio del formulario al hook de tareas.
- Limpieza del formulario tras alta correcta.

**Entregables**

- `src/components/TaskForm/TaskForm.tsx`

**Criterio de cierre**

- No se puede crear una tarea sin `nombre`.
- No se puede crear una tarea sin `descripcion`.
- Al crear una tarea, aparece inmediatamente en la lista de la sesion actual.

### Tarea 4. Lista y tarjeta base de tareas

**Objetivo**

Construir la capa visual principal para representar tareas sin mezclarla aun con la integracion de IA.

**Incluye**

- Implementar `TaskList`.
- Implementar `TaskCard`.
- Implementar `TaskCardHeader`.
- Mostrar nombre, descripcion y estado de la tarea.
- Dejar preparada la composicion para acciones y campos ICE.

**Entregables**

- `src/components/TaskList/TaskList.tsx`
- `src/components/TaskCard/TaskCard.tsx`
- `src/components/TaskCardHeader/TaskCardHeader.tsx`

**Criterio de cierre**

- Las tareas se renderizan de forma consistente.
- La tarjeta no contiene logica de negocio compleja.
- La estructura visual queda lista para enchufar acciones y estados.

### Tarea 5. Servicio Gemini y validacion de respuesta

**Objetivo**

Aislar la integracion con la API gratuita de Gemini en una capa de servicio que entregue datos ya normalizados al dominio.

**Incluye**

- Crear `services/gemini.ts`.
- Definir un prompt estricto para pedir salida estructurada.
- Solicitar `impact`, `confidence` y `ease` como enteros entre 1 y 10.
- Limitar `reason` a 200 palabras.
- Parsear y validar la respuesta.
- Traducir errores de red o formato invalido a un error consumible por la app.

**Entregables**

- `src/services/gemini.ts`

**Criterio de cierre**

- Existe una funcion que recibe `description` y devuelve una respuesta validada.
- Los valores fuera de rango o formatos invalidos se rechazan.
- La UI no conoce detalles del prompt ni del parsing.

### Tarea 6. Flujo de calculo ICE desde la tarjeta

**Objetivo**

Conectar la UI con Gemini para que cada tarea pueda solicitar una sugerencia ICE y reflejar estados de proceso.

**Incluye**

- Implementar `TaskCardActions`.
- Disparar el calculo ICE desde cada tarea.
- Deshabilitar el boton mientras la consulta esta en curso.
- Reflejar estados `idle`, `loading` y `error`.
- Guardar la sugerencia recibida en el estado central.

**Entregables**

- `src/components/TaskCardActions/TaskCardActions.tsx`
- Extension de `useTasks.ts` para coordinar el flujo asincrono

**Criterio de cierre**

- El usuario puede pulsar `Calcular ICE`.
- La app muestra feedback de carga.
- Si Gemini falla, se muestra un error simple.
- La sugerencia queda disponible para revision posterior.

### Tarea 7. Revision de sugerencia y edicion manual

**Objetivo**

Separar claramente el momento de revisar la sugerencia de IA del momento de editar manualmente los valores confirmados.

**Incluye**

- Implementar `PriorityModal`.
- Mostrar sugerencia de IA, score calculado y justificacion.
- Permitir confirmar o cancelar la sugerencia.
- Implementar `IceScoreFields`.
- Permitir edicion manual de `impact`, `confidence` y `ease`.
- Recalcular el ICE score al modificar cualquier campo.

**Entregables**

- `src/components/PriorityModal/PriorityModal.tsx`
- `src/components/IceScoreFields/IceScoreFields.tsx`
- Ajustes en `useTasks.ts`

**Criterio de cierre**

- La sugerencia no se aplica automaticamente sin confirmacion visual.
- Tras confirmar, los campos quedan editables inline.
- Todo cambio manual recalcula el score de inmediato.
- Los campos no aceptan valores fuera de `1-10`.

### Tarea 8. Ordenacion final, pulido UX y validacion del MVP

**Objetivo**

Cerrar el MVP con el comportamiento final esperado y revisar coherencia funcional frente al alcance.

**Incluye**

- Aplicar orden estable por score ICE de mayor a menor.
- Colocar tareas sin score confirmado al final.
- Mostrar la justificacion generada por IA.
- Revisar mensajes de error y estados vacios.
- Ajustar detalles de layout y claridad didactica.
- Verificar todos los criterios de aceptacion del MVP.

**Entregables**

- Refinamiento de `App.tsx`
- Ajustes en componentes y hook
- Validacion manual del flujo completo

**Criterio de cierre**

- La lista se reordena correctamente cuando cambian los valores ICE.
- La UX transmite con claridad los estados de cada tarea.
- El MVP cumple alcance: sin backend, sin persistencia y con calculo ICE desde React.

## 5. Dependencias entre tareas

El orden recomendado no es arbitrario:

- La Tarea 1 desbloquea toda la base de tipos y utilidades.
- La Tarea 2 necesita los contratos definidos en la Tarea 1.
- La Tarea 3 y la Tarea 4 pueden construirse sobre la API de `useTasks`.
- La Tarea 5 debe existir antes de conectar el flujo real de IA.
- La Tarea 6 depende de la Tarea 5 para no meter la integracion directamente en la UI.
- La Tarea 7 depende de que ya exista una sugerencia guardada y un flujo asincrono funcional.
- La Tarea 8 cierra el comportamiento final una vez que el ciclo principal ya funciona.

## 6. Riesgos y decisiones a vigilar

### Exposicion de la API key en frontend

Al no haber backend, la integracion directa con Gemini simplifica el ejercicio, pero expone limitaciones de seguridad propias del enfoque didactico. Debe asumirse como concesion explicita del MVP.

### Ambiguedad entre "sugerido" y "confirmado"

Si no se distingue entre sugerencia recibida y valor confirmado, la UI tiende a duplicar logica entre tarjeta y modal. El hook debe modelar ambos momentos con claridad.

### Reordenacion agresiva de la lista

Si la ordenacion vive dentro del render o no distingue tareas con y sin score, la experiencia se vuelve impredecible. Conviene mantener una utilidad de ordenacion estable y centralizada.

## 7. Definicion de hecho del MVP

El MVP puede darse por terminado cuando:

1. Se pueden crear tareas con `nombre` y `descripcion`.
2. Cada tarea puede consultar Gemini desde el frontend.
3. La IA devuelve `impact`, `confidence`, `ease` y `reason` con formato usable.
4. El usuario puede confirmar la sugerencia antes de aplicarla.
5. El usuario puede editar manualmente los tres valores.
6. El score ICE se recalcula inmediatamente tras cualquier cambio manual.
7. La lista se ordena por prioridad de forma consistente.
8. Todo funciona en memoria, sin backend y sin persistencia.

## 8. Recomendacion final de ejecucion

Si este plan se va a usar para implementar en sesiones de trabajo, la secuencia ideal es:

1. Base tecnica y dominio.
2. Hook de estado.
3. Formulario de alta.
4. Listado y tarjeta base.
5. Servicio Gemini.
6. Accion de calculo y estados.
7. Modal de revision y edicion inline.
8. Pulido final y validacion.

Con esta secuencia, el equipo evita bloqueos, mantiene la responsabilidad de cada capa bien definida y llega al MVP con un flujo estable y facil de explicar en contexto formativo.
