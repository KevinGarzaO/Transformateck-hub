# CHANGELOG.md - Template de Historial de Cambios

> **IMPORTANTE:** Este es un **TEMPLATE REUSABLE**.
> 
> Para usarlo en un proyecto:
> 1. Copiar este archivo al proyecto
> 2. Mantener el formato de versiones semánticas
> 3. Actualizar antes de cada commit

---

## Formato de Versiones (Semantic Versioning)

```
MAJOR.MINOR.PATCH
```

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **MAJOR** | Cambios incompatibles en API | 1.0.0 → 2.0.0 |
| **MINOR** | Funcionalidad nueva compatible | 1.0.0 → 1.1.0 |
| **PATCH** | Corrección de bugs | 1.0.0 → 1.0.1 |

### Reglas

- **MAJOR**: Si cambias API de forma incompatible
- **MINOR**: Si agregas nueva funcionalidad compatible
- **PATCH**: Si corriges bugs sin cambiar API

---

## Formato de Entradas

### Para Nuevas Features

```markdown
## [X.Y.0] - YYYY-MM-DD

### Added
- **feat(<scope>)**: <descripción>
  - <detalle 1>
  - <detalle 2>
  - <métricas: tests, coverage>
```

### Para Bug Fixes

```markdown
### Fixed
- **fix(<scope>)**: <descripción>
  - Causa: <qué causaba el bug>
  - Solución: <cómo se corrigió>
```

### Para Cambios

```markdown
### Changed
- **refactor(<scope>)**: <descripción>
  - Antes: <qué había>
  - Después: <qué hay ahora>
```

---

## Estructura del Changelog

```markdown
# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

## [Unreleased]

### Added
- Nueva funcionalidad
- **[feat(<scope>)]:** descripción

### Changed
- Cambio en funcionalidad existente

### Fixed
- Corrección de bug
- **[fix(<scope>)]:** descripción

### Removed
- Funcionalidad eliminada

## [X.Y.Z] - YYYY-MM-dd

### Added
- Primera versión del proyecto

## [X.0.0] - YYYY-MM-dd
- Initial release
```

---

## Cómo Actualizar

### Antes de Hacer Commit

1. **SIEMPRE** actualizar CHANGELOG.md antes de commit
2. Agregar entrada en sección correcta:
   - **Added**: Nuevas features
   - **Changed**: Cambios en existente
   - **Fixed**: Bug fixes
   - **Removed**: Funcionalidad eliminada
3. Incluir:
   - Tipo de commit (feat, fix, etc.)
   - Scope (módulo/feature)
   - Descripción clara
   - Métricas (tests, coverage)

### Ejemplo de Actualización

```markdown
## [Unreleased]

### Added
- **feat(cart)**: Carrito de compras
  - GET /api/cart - Obtener carrito
  - POST /api/cart/add - Agregar item
  - PUT /api/cart/update/:id - Actualizar cantidad
  - DELETE /api/cart/remove/:id - Remover item
  - DELETE /api/cart/clear - Vaciar carrito
  - 11 unit tests (92% coverage)
```

---

## Conventional Commits

### Formato

```
<type>(<scope>): <description>

[ body ]

[ footer ]
```

### Tipos de Commit

| Type | Descripción | Cuándo usar |
|------|------------|-------------|
| `feat` | Nueva funcionalidad | Nueva feature |
| `fix` | Corrección de bug | Bug fix |
| `docs` | Documentación | README, docs |
| `style` | Formato | Linting, format |
| `refactor` | Refactorización | Mejorar código |
| `test` | Tests | Unit tests |
| `config` | Configuración | build, ci/cd |
| `perf` | Performance | Optimización |
| `build` | Build | Dependencias |
| `chore` | Tareas menores | Mantenimiento |

### Ejemplos

```
feat(cart): implement shopping cart

- Added cart controller with add/update/remove/clear
- Added cart routes in /api/cart
- Added 11 unit tests (92% coverage)
- Updated CHANGELOG.md

Closes #3
```

```
fix(auth): login validation error

- Fixed issue with empty password validation
- Added proper error message
- Updated 3 tests

Closes #5
```

```
docs(readme): update installation steps

- Added prerequisites section
- Updated commands for Windows

Closes #2
```

---

## Tags de Release

```bash
# Crear tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag
git push origin v1.0.0
```

### Formato de Mensaje de Release

```
## v1.0.0 - 2026-04-17

### Breaking Changes
- <cambio incompatible>

### Features
- <nueva feature>

### Fixes
- <bug fix>

### Thanks
- @contributor
```

---

## Mantenimiento

| Fecha | Cambio | Autor |
|-------|--------|-------|
| YYYY-MM-DD | Agregada feature X | @dev |
| YYYY-MM-DD | Fixed bug Y | @dev |

---

*Para dudas sobre este documento, consultar en #dev-team Slack*