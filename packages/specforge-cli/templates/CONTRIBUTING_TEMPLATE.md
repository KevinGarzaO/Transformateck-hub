# Contribuir

Gracias por tu interés en contribuir a este proyecto.

## Proceso de Desarrollo

Seguimos la metodología **SDD (Specification-Driven Development)**:

```
1. SPEC     → Escribir especificación en docs/features/<name>/spec-<name>.md
2. CODE     → Implementar código
3. TEST     → Escribir tests unitarios
4. VERIFY   → Ejecutar tests + lint + format
5. DOCS     → Completar documentación
6. COMMIT   → Commit con CHANGELOG.md actualizado
```

### Regla: Man in the Loop

**NUNCA** iniciamos un paso sin tu aprobación previa.

```
[IA] Ejecuta paso N
    ↓
[Tú] Aprueba/Rechaza
    ↓
[IA] Continúa al paso N+1 o corrige
```

## Primeros Pasos

1. Fork del repositorio
2. Clonar tu fork: `git clone https://github.com/<tu-user>/<repo>.git`
3. Crear rama: `git checkout -b feature/NOMBRE`
4. Instalar dependencias: `npm install`
5. Ejecutar tests: `npm run test`

## Estructura del Proyecto

```
src/              ← Código fuente
tests/            ← Tests unitarios
docs/features/    ← Documentación por feature
AGENTS.md         ← Normas de desarrollo
CHANGELOG.md      ← Historial de cambios
```

## Reglas de Código

- TypeScript con `strict: true`
- Coverage mínimo: 80%
- Naming conventions: kebab-case para archivos, PascalCase para componentes
- Tests obligatorios para cada endpoint

## Commits

Formato obligatorio:

```
<type>(<scope>): <description>

- Descripción del cambio
- Incluye métricas (tests, coverage)
```

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `config`

## Pull Requests

- Todos los tests deben pasar
- Coverage >= 80%
- CHANGELOG.md actualizado
- Mínimo 1 reviewer

## Commits Permitidos

- [ ] `feat`: Nueva funcionalidad
- [ ] `fix`: Corrección de bug
- [ ] `docs`: Documentación
- [ ] `style`: Formato
- [ ] `refactor`: Refactorización
- [ ] `test`: Tests
- [ ] `config`: Configuración

## Preguntas

Para dudas mayores, abrir un issue primero antes de comenzar cambios grandes.