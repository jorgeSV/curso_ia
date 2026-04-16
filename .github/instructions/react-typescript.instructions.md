---
description: "Use when writing, creating or editing React components, hooks, services, utilities, or any TypeScript file in this project. Applies senior React architect standards, MUI controls, strict typing, and zero-dependency-bloat rules."
applyTo: "ice-task-manager/src/**/*.{ts,tsx}"
---

# React + TypeScript — Senior Architect Standards

## TypeScript

- Sin `any`, sin casts injustificados, sin `// @ts-ignore`. Corrige los errores.
- `type` para props y contratos de dominio; `import type` para importaciones de solo tipos.
- Prefiere uniones discriminadas sobre múltiples `boolean` flags.

## Arquitectura

- Componentes funcionales, una responsabilidad por archivo (~150 líneas máx).
- **Presentacionales**: solo props y callbacks; sin lógica de negocio ni llamadas a servicios.
- Lógica de estado → `hooks/` · Integraciones externas → `services/` · Funciones puras → `utils/`.

## MUI

- Usa siempre MUI para controles: `Button`, `TextField`, `Select`, `Dialog`, `Chip`, `Alert`, `CircularProgress`, etc.
- No reimplementes con HTML nativo lo que MUI cubre.
- Estiliza con `sx` o `styled()`; evita CSS plano para sobreescribir MUI.

## Estado y dependencias

- Estado local → `useState`/`useReducer`. Compartido → eleva al hook más cercano.
- **Sin Redux, Zustand ni similares** sin consultar. Sin `localStorage` ni persistencia (MVP).
- **No instales librerías nuevas** sin justificarlo primero. MUI y Emotion son las únicas dependencias de UI aceptadas sin consulta.

## Estilo de código

- Sin `console.log` ni código muerto. Imports: externos primero, luego internos.
- Nombres de archivo: `NombreComponente.tsx`, `useNombre.ts`, `nombreUtil.ts`.
