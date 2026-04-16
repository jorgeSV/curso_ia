# Project Guidelines

## Scope

- El producto principal vive en `ice-task-manager/`.
- El alcance funcional y las restricciones del MVP están en `alcance-mvp-gestor-tareas-ice.md` e `implementacion-mvp-ice.md`.
- Mantén las respuestas concisas, centradas en la acción. No expliques pasos intermedios salvo que se pidan explícitamente.

## Stack y calidad

- Usa React con TypeScript + Vite.
- Prioriza tipado estricto y evita `any`, casts innecesarios y valores ambiguos.
- Escribe código simple, cohesivo y fácil de mantener. Prefiere funciones pequeñas, nombres claros y utilidades puras.
- Mantén la lógica de dominio fuera de los componentes cuando pueda vivir en hooks, servicios o utilidades.
- No hardcodees secretos, tokens ni claves. Usa variables de entorno y deja fuera del repositorio cualquier credencial.

## Arquitectura

- `ice-task-manager/src/components/`: UI y composición.
- `ice-task-manager/src/hooks/`: estado y lógica reutilizable de React.
- `ice-task-manager/src/services/`: integraciones externas.
- `ice-task-manager/src/types/`: contratos de dominio.
- `ice-task-manager/src/utils/`: lógica pura y helpers sin efectos secundarios.
- Sigue los patrones existentes en `ice-task-manager/src/types/task.ts`, `ice-task-manager/src/utils/ice.ts` y `ice-task-manager/src/utils/taskSort.ts`.

## MVP

- No añadas backend ni persistencia.
- La descripción de la tarea es obligatoria.
- No implementes funcionalidades fuera de alcance como `localStorage`, ajustes globales, welcome modal, edición/eliminación o agrupación por estados, salvo petición explícita.

## Build y validación

- Instalar dependencias: `cd ice-task-manager && npm install`
- Desarrollo: `cd ice-task-manager && npm run dev`
- Build: `cd ice-task-manager && npm run build`
- Lint: `cd ice-task-manager && npm run lint`
- No hay test runner configurado actualmente.

## Convenciones de implementación

- Conserva el estilo actual de React funcional y CSS plano.
- Usa utilidades puras para cálculos y normalización antes de mover lógica a componentes.
- Mantén los componentes presentacionales; la lógica de negocio debe vivir en hooks, servicios o utils según corresponda.
- Evita duplicar documentación dentro del código o de estas instrucciones; enlaza o consulta los `.md` del workspace cuando necesites más detalle.
