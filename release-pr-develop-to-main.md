# PR Draft: develop -> main

## Titulo propuesto

feat: release mvp de priorizacion ICE con Gemini

## Bloqueador actual

No se puede abrir esta PR porque el remoto no tiene rama main ni master. Solo existe origin/develop como base de integracion.

## Resumen

La release incorpora el MVP completo del gestor de tareas con priorizacion ICE asistida por Gemini: alta de tareas, sugerencia IA, revision previa, edicion manual y reordenacion automatica.

## Issues relacionados

- #7 Tarea 2
- #6 Tarea 3
- #3 Tarea 4
- #4 Tarea 5
- #5 Tarea 6
- #8 Tarea 7
- #2 Tarea 8

## Commits relevantes

- 406c91c feat(tasks): implement task state hook for task 2
- 36c97ad feat(tasks): add task creation form
- 3a16ff4 feat(tasks): add task list and base cards
- b1619d7 feat(services): add Gemini suggestion service
- 7b74ad6 feat(tasks): add ice calculation flow from cards
- 832a27e feat(tasks): add suggestion review and manual ice editing
- 2f6d3db feat(tasks): polish prioritization mvp flow
- 7d945c5 fix(tasks): resolve pending suggestion state issues
- c72120e fix(services): update Gemini model and API errors

## Validacion

- npm run build
- revision funcional del flujo principal
- comprobacion manual del modelo configurado

## Riesgos y notas

- No hay persistencia ni backend por alcance del MVP.
- No existe test runner configurado todavia.
- La PR real debe abrirse desde develop cuando exista main o master en remoto.
