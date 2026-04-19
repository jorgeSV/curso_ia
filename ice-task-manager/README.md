# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

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

- **Título:** Cambiar color del botón guardar
- **Descripción:** Modificar el color del botón “Guardar” en el formulario de tareas para que sea azul en vez de gris, buscando mejorar la visibilidad.
- **Estimación Gemini:** impact 2, confidence 9, ease 10 → ICE: 180

### Ejemplo ICE realista para onboarding

- **Título:** Simplificar el alta de tareas
- **Descripción:** Reducir la fricción al crear una tarea mostrando sugerencias de texto más claras en el formulario, mejorando los mensajes de validación y dejando visible desde el primer momento qué campos influyen en la puntuación ICE. El objetivo es que un usuario nuevo entienda cómo crear y priorizar tareas sin dudas en menos de un minuto.
- **Estimación Gemini:** impact 7, confidence 7, ease 6 → ICE: 294

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
