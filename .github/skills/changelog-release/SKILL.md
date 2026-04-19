---
name: changelog-release
description: 'Use when adding entries to the project changelog, creating the initial CHANGELOG, reading commits from the current branch, and bumping the version with semantic-release. Covers initial setup, dry-run validation, and release-safe changelog updates.'
argument-hint: 'Describe the release scope or leave empty to infer it from the branch commits'
user-invocable: true
---

# Changelog Release

## When to Use
- Añadir una nueva entrada al `CHANGELOG` del proyecto.
- Crear el `CHANGELOG.md` inicial si el repositorio aún no lo tiene.
- Leer los commits de la rama actual y convertirlos en notas de release.
- Subir la versión usando `semantic-release` a partir de Conventional Commits.
- Validar en `dry-run` qué versión y qué notas se van a generar antes de publicar.

## What This Skill Produces
- Configuración mínima de `semantic-release` si no existe.
- `CHANGELOG.md` creado o actualizado.
- Nueva versión calculada desde los commits de la rama.
- Notas de release basadas en los mensajes de commit.

## Decision Points

### 1. ¿Existe ya release tooling?
- Si no existe `semantic-release`, instálalo antes de continuar.
- Si no existe configuración (`.releaserc`, `release.config.*` o equivalente), créala.
- Si no existe `CHANGELOG.md`, créalo y deja que `semantic-release` escriba la primera entrada.

### 2. ¿Qué versión se debe subir?
- Usa la convención de `semantic-release`: `fix` = patch, `feat` = minor, `BREAKING CHANGE` = major.
- No decidas la versión manualmente salvo que el usuario lo pida explícitamente.

### 3. ¿Qué paquete manda en este repo?
- Este repositorio tiene `package.json` en raíz y otro en `ice-task-manager/`.
- Si el usuario no especifica alcance, pregunta si la release debe gobernar la versión de la raíz o la app `ice-task-manager`.
- Si solo hay que mantener un changelog global del repo, toma la raíz como fuente de verdad.

### 4. ¿Se va a publicar o solo preparar?
- Si el usuario quiere revisar antes, ejecuta `semantic-release --dry-run`.
- Si quiere aplicar el cambio completo, ejecuta la release real solo después de validar el `dry-run`.

## Procedure

1. Inspecciona el repo:
   - Busca `CHANGELOG.md`, `.releaserc*`, `release.config.*`, `package.json` y workflows de release.
   - Lee los commits de la rama actual para determinar el alcance del release.

2. Verifica prerequisitos:
   - Confirma que los commits siguen Conventional Commits.
   - Si falta `semantic-release`, instala las dependencias necesarias.
   - Para changelog + commit de versionado suelen hacer falta como mínimo:
     - `semantic-release`
     - `@semantic-release/commit-analyzer`
     - `@semantic-release/release-notes-generator`
     - `@semantic-release/changelog`
     - `@semantic-release/git`

3. Crea o ajusta la configuración de release:
   - Define ramas permitidas para release.
   - Configura generación de notas y actualización de `CHANGELOG.md`.
   - Configura commit automático de archivos versionados si el flujo del proyecto lo requiere.

4. Ejecuta `semantic-release --dry-run`:
   - Revisa la versión calculada.
   - Revisa las release notes generadas desde los commits.
   - Si el resultado no cuadra, corrige la configuración o detecta commits mal formados.

5. Ejecuta la release real:
   - Genera o actualiza `CHANGELOG.md`.
   - Sube la versión según las reglas semánticas.
   - Si la configuración incluye `@semantic-release/git`, crea el commit de actualización del changelog/versionado.

6. Valida el resultado:
   - El `CHANGELOG.md` contiene una nueva entrada con la nueva versión.
   - La entrada resume los commits relevantes de la rama.
   - La versión nueva coincide con el tipo de cambios detectados.

## Quality Checks
- No inventes entradas del changelog: todas deben salir de commits reales.
- No subas versión manualmente si `semantic-release` puede calcularla.
- Ejecuta `dry-run` antes de la release real cuando la configuración sea nueva o haya dudas.
- Si el repo no tiene tokens o permisos para publicar, deja preparado el changelog y documenta el bloqueo.
- Si los commits de la rama no siguen Conventional Commits, detente y señálalo antes de seguir.

## Repo Notes
- En este repo ya existe `commitlint` con `@commitlint/config-conventional`.
- En este repo todavía no existen `CHANGELOG.md` ni configuración de `semantic-release`.
- Antes de automatizar la release, confirma si la fuente de versión es [package.json](../../../package.json) o [ice-task-manager/package.json](../../../ice-task-manager/package.json).

## Suggested Outputs
- Versión detectada o calculada.
- Resumen de commits que alimentan la release.
- Archivos creados o modificados para soportar changelog + semantic-release.
- Estado final: `dry-run` validado, release ejecutada o bloqueo encontrado.