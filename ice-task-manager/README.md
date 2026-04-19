# ICE Task Manager

Aplicacion MVP para crear tareas, priorizarlas con ICE y apoyarse en Gemini para obtener una propuesta inicial revisable antes de confirmarla.

## Objetivo

- crear tareas en memoria
- solicitar una sugerencia ICE a Gemini
- revisar la propuesta antes de confirmarla
- editar Impact, Confidence y Ease manualmente
- reordenar la lista automaticamente por prioridad

## Stack

- React 19
- TypeScript estricto
- Vite
- MUI + Emotion
- ESLint
- Gemini API via fetch

## Arranque

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Variables de entorno

```env
VITE_GEMINI_API_KEY=tu_clave
VITE_GEMINI_MODEL=gemini-2.5-flash
```

## Arquitectura

- src/components/: UI y composicion
- src/hooks/useTasks.ts: estado y flujo principal
- src/services/gemini.ts: integracion Gemini
- src/types/task.ts: contratos del dominio
- src/utils/ice.ts: validacion y calculo
- src/utils/taskSort.ts: ordenacion estable

## Flujo funcional

1. Crear tarea con nombre y descripcion.
2. Solicitar sugerencia ICE desde la tarjeta.
3. Revisar la propuesta en modal.
4. Confirmar o editar manualmente los valores.
5. Reordenar la lista segun el score confirmado.

## Reglas clave

- descripcion obligatoria
- valores ICE enteros entre 1 y 10
- justificacion Gemini con maximo 200 palabras
- sin persistencia ni backend en este MVP

## Entregables implementados

- Tarea 2: hook useTasks
- Tarea 3: TaskForm
- Tarea 4: TaskList, TaskCard y TaskCardHeader
- Tarea 5: servicio Gemini con validacion estricta
- Tarea 6: calculo ICE desde cada tarjeta
- Tarea 7: revision de sugerencia y edicion manual
- Tarea 8: pulido visual y resumen de sesion
- fixes posteriores de estado pendiente y modelo Gemini

## Diagramas

- ../design/diagrama_flujo_crear_tareas.png
- ../design/diagrama_navegacion_usuario.png
- ../design/pantallas_componentes_app.png

## Limitaciones

- estado volatil en memoria
- sin test runner configurado
- dependencia de cuota disponible en Gemini

## Ejemplos de tareas y puntuación ICE

A continuación tienes ejemplos reales de cómo describir tareas y la estimación típica que Gemini devolvería en esta app:

### Ejemplo ICE alto

- **Título:** Automatizar backups diarios
- **Descripción:** Implementar un sistema que realice copias de seguridad automáticas de todas las tareas y configuraciones cada noche, enviando un correo de confirmación al usuario. Esto reduce el riesgo de pérdida de datos y mejora la confianza en la plataforma.
- **Estimación Gemini:** impact 9, confidence 8, ease 7 → ICE: 504

### Ejemplo ICE medio

- **Título:** Añadir filtro por prioridad
- **Descripción:** Permitir que el usuario filtre la lista de tareas por nivel de prioridad (alta, media, baja) desde la vista principal, facilitando la gestión de tareas urgentes.
- **Estimación Gemini:** impact 6, confidence 7, ease 6 → ICE: 252

### Ejemplo ICE bajo

- **Título:** Cambiar color del botón gua- **Título:** Cambiar color del botón gua- **Título:** Cambiar- **Título:** Cambiar color del bot�ue s- **Título:** Cambiar color del botón gua- **Título:** Cambiar color del botón gua- **Título:** Cambiar- **Título:**: 180- **Título:** Ca real- **Título:** Cambiar color del botónmpli- **Título:** Cambiar color del botón gua- **Título:** Cambiar color del botón gua- **Título:** Cambiar- **Título:** Cambiar color del bot�ue s- **Título:** Cambiar color del botón gua- **Título:** Cambiar color del botón gua- **Título:** Cambiar- **TítuE. - **Título:** Cambiar color del botón gua- **Título:** Cambiar cr ta- **Título:** en menos- **Título:\*_ Cambiar color del botón_ impact 7, confidence 7, ease 6 → ICE: 294
