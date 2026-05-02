# AGENTS.md - Framework de Desarrollo SDD (Template Genérico)

> **IMPORTANTE:** Este es un **TEMPLATE REUSABLE**.
> 
> Para usarlo en un proyecto, la IA debe:
> 1. Copiar este archivo al proyecto
> 2. Completar la información en la sección 1
> 3. Adaptar según el tipo de proyecto

---

## Cómo usar este template

### Para proyecto NUEVO:
> La IA ayuda a INICIALIZAR el proyecto desde cero. Solo pregunta lo necesario para configurar.

```
[IA]: "Para configurar el proyecto necesito:"
- Nombre del proyecto
- Tipo (frontend / backend / mobile)
- Tech stack principal

[IA]: "¿Confirmas?"
[IA]: Inicializa repo, configura tooling, hace primer commit
```

### Para proyecto EXISTENTE:
> La IA debe LEER el proyecto (package.json, archivos, tests, README) para detectar:
> - Tech stack actual (revisar package.json, requirements, pubspec.yaml)
> - Coverage actual (correr npm test)
> - Estructura existente
> NO preguntar al usuario, revisar el código directamente.

```
[IA] (Lee package.json, archivos, corre tests)
[IA]: "Proyecto detectado: Next.js + TypeScript + Jest. Coverage: 65%. Estructura: limpia."
[IA]: "¿Confirmas para integrar framework SDD?"
```

---

## 1. Reglas Fijas para TODOS los proyectos

| Regla | Valor |
|-------|-------|
| Coverage mínimo | 80% (branches 78%) |
| Documentación | Siempre docs/features/<feature>/ |
| Commit | Siempre con CHANGELOG.md actualizado |
| Man in the Loop | SIEMPRE preguntar antes de continuar |

---

## 2. Fases del Proyecto

### Fase 0: Inicialización (Solo proyectos nuevos)

| Step | Task |
|------|------|
| 0.1 | Inicializar repo Git |
| 0.2 | Configurar tech stack |
| 0.3 | Configurar linting y formatting |
| 0.4 | Configurar testing |
| 0.5 | Crear primer commit |

### Fase 1: Setup (Para proyectos existentes)

| Step | Task |
|------|------|
| 1.1 | Revisar estructura actual |
| 1.2 | Agregar AGENTS.md |
| 1.3 | Configurar linting/testing |
| 1.4 | Actualizar README.md |

### Fase 2+: Por Feature (Iterativo)

```
1. SPEC     → Escribir especificación
2. CODE     → Implementar código
3. TEST     → Escribir tests
4. VERIFY   → Ejecutar tests + lint
5. DOCS     → Completar documentación
6. COMMIT   → Commit con cambios
```

---

## 3. Flujo de Trabajo

### Workflow por Feature

```
[IA] 1. Recibe User Story
[IA] 2. Pregunta: "¿Confirmas para iniciar?"
[USER] Aprueba o rechaza

[IA] 3. Escribe SPEC en docs/features/<name>/
[IA] 4. Pregunta: "¿Confirmas SPEC?"
[USER] Aprueba o rechaza

[IA] 5. Implementa código
[IA] 6. Pregunta: "¿Confirmas código?"
[USER] Aprueba o rechaza

[IA] 7. Escribe tests
[IA] 8. Corre tests + lint + coverage
[IA] 9. Pregunta: "¿Confirmas tests?"

[USER] Aprueba

[IA] 10. Completa documentación
[IA] 11. Actualiza TASKS.md, PLAN.md, COMPLETED.md
[IA] 12. Pregunta: "¿Confirmas para commit?"

[USER] Aprueba

[IA] 13. Hace git commit + git push
```

### Regla Mandatory: Man in the Loop

> **NUNCA inicio un paso sin tu aprobación previa.**

```
[IA] Ejecuta paso N
    ↓
[USER] Aprueba/Rechaza ("sí", "no", "continúa")
    ↓
[IA] Continúa al paso N+1 o corrige
```

---

## 4. Estructura de Documentación

### Para proyectos nuevos (desde cero)

```
[Raiz del Proyecto]/
├── AGENTS.md              ← Copiar este template
├── README.md              ← Documentación general
├── CHANGELOG.md          ← Historial de cambios
│
├── docs/                  ← Documentación
│   ├── SPEC.md           ← Especificación general
│   ├── ARCHITECTURE.md  ← Arquitectura del sistema
│   └── features/        ← Documentación por feature
│
├── src/                   ← Código fuente
├── tests/                 ← Tests
└── scripts/              ← Scripts de utilidad
```

### Para proyectos existentes

```
[Raiz del Proyecto]/
├── AGENTS.md              ← Agregar/actualizar
├── docs/
│   └── features/
│       └── <feature>/
│           ├── <feature>.md
│           ├── spec-<feature>.md
│           ├── PLAN.md
│           ├── TASKS.md
│           └── COMPLETED.md
```

---

## 5. Reglas de Código

### Naming Conventions (Adaptable)

| Tipo | Convención | Ejemplo |
|------|-----------|--------|
| Archivos | kebab-case | `user-service.ts` |
| Componentes | PascalCase | `UserProfile.tsx` |
| Funciones | camelCase | `getUserById()` |
| Constantes | UPPER_SNAKE | `MAX_RETRY = 3` |
| Rutas API | RESTful | `/api/users/:id` |
| Clases | PascalCase | `UserService` |
| Variables | camelCase | `userName` |

### Estructura de funciones/métodos

```typescript
// Controller/Service
export const getUserById = (id: string): User | null => {
  // 1. Validar input
  // 2. Ejecutar lógica
  // 3. Retornar resultado
};
```

### Estructura de componentes (Frontend)

```tsx
export const UserCard = ({ user }: UserCardProps) => {
  // 1. Props
  // 2. Estado (si aplica)
  // 3. Effects (si aplica)
  // 4. Handlers
  // 5. Render
  return (/* JSX */);
};
```

---

## 6. Testing

### Coverage Mínimo (Ajustable)

| Métrica | Mínimo | Objetivo |
|---------|--------|----------|
| Statements | 70% | 80% |
| Branches | 65% | 80% |
| Functions | 70% | 80% |
| Lines | 70% | 80% |

### Tests por tipo

| Tipo | Tests mínimos |
|------|--------------|
| GET /resource | 2 (válido, array/empty) |
| GET /resource/:id | 3 (válido, 404, 400) |
| POST /resource | 3 (creado, 400, validación) |
| PUT /resource/:id | 3 (actualizado, 404, 400) |
| DELETE /resource/:id | 3 (eliminado, 404, 400) |

---

## 7. Documentación del Feature

### Archivos requeridos por feature

| Documento | Descripción | Actualizar al |
|-----------|-------------|----------------|
| `<feature>.md` | User Story + Criterios + Reglas | Inicio y Fin |
| `spec-<feature>.md` | SPEC técnica | Antes del código |
| `PLAN.md` | Plan + Tasks + Métricas | Fin |
| `TASKS.md` | Task list | Fin |
| `COMPLETED.md` | Resumen completo | Fin |

### Al INICIAR un feature (Planning Phase):

La IA debe crear EN docs/features/<feature>/:

```
docs/features/<feature>/
├── <feature>.md          ← User Story + Criterios (vacíos [ ])
├── spec-<feature>.md     ← SPEC técnica endpoints/esquemas
├── PLAN.md               ← Tasks con estado ⏳ Pending
└── TASKS.md              ← Task list vacía
```

### Al COMPLETAR un feature (Ending Phase):

La IA debe actualizar todos los documentos:

```
docs/features/<feature>/
├── <feature>.md          ← Criterios marcados [x], estado COMPLETADO
├── spec-<feature>.md     ← SPEC completa
├── PLAN.md               ← Tasks ✅ Done + métricas finales
├── TASKS.md              ← Tasks ✅ DONE + criterios marcados
└── COMPLETED.md          ← Resumen completo (archivos, métricas, pendientes)
```

---

## 8. Definition of Done

| ✅ | Requisito |
|----|----------|
| ☐ | Spec escrita y aprobada |
| ☐ | Código implementa la spec |
| ☐ | Tests passing |
| ☐ | Coverage >= mínimo |
| ☐ | Lint passing |
| ☐ | Documentación completa |
| ☐ | CHANGELOG.md actualizado |
| ☐ | Git commit + push |

---

## 9. Comandos por Tech Stack

### Node.js/TypeScript

```bash
npm run dev        # Servidor desarrollo
npm run build     # Build
npm test          # Tests con coverage
npm run lint      # Verificar código
npm run format    # Formatear
```

### Python

```bash
python manage.py runserver  # Servidor
pytest --cov=app          # Tests con coverage
flake8                    # Linting
black .                    # Formateo
mypy .                     # Tipos
```

### Flutter/Mobile

```bash
flutter run              # Ejecutar
flutter test --coverage # Tests con coverage
flutter analyze          # Linting
dart format .            # Formateo
```

---

## 10. Reglas de Commit

### Formato Obligatorio

```
<type>(<scope>): <description>

[ body ]
[ footer ]
```

### Tipos de Commit

| Type | Descripción |
|------|------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Documentación |
| `style` | Formato (no lógica) |
| `refactor` | Refactorización |
| `test` | Tests |
| `config` | Configuración |
| `perf` | Performance |
| `build` | Build |
| `ci` | CI/CD |
| `chore` | Tareas menores |

### Ejemplo de Commit

```
feat(cart): implement shopping cart endpoint

- Added cart controller with add/update/remove/clear
- Added cart routes in /api/cart
- Added cart service in mockData
- Added 11 unit tests (92% coverage)
- Updated CHANGELOG.md

Closes #3
```

### Regla: CHANGELOG debe actualizarse

- SIEMPRE actualizar CHANGELOG.md antes de hacer commit
- Agregar entrada en "### Added" con el feature
- Incluir endpoints creados

### Historial de CHANGELOG

```markdown
# Changelog

## [1.2.0] - 2026-04-16

### Added
- **feat(cart)**: Carrito de compras
  - GET /api/cart
  - ...

## [1.1.0] - 2026-04-16

### Added
- **feat(sales)**: Ventas

## [1.0.0] - 2026-04-16
  - Initial release
```

---

## 11. Versionado (Semantic Versioning)

### Formato

```
MAJOR.MINOR.PATCH
```

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **MAJOR** | Cambios incompatibles en API | 1.0.0 → 2.0.0 |
| **MINOR** | Funcionalidad nueva compatibles | 1.0.0 → 1.1.0 |
| **PATCH** | Corrección de bugs compatibles | 1.0.0 → 1.0.1 |

### Reglas

- **MAJOR**: Si cambias API de forma incompatible
- **MINOR**: Si agregas nueva funcionalidad compatible
- **PATCH**: Si corriges bugs sin cambiar API

### Tags de Release

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

## 12. Ramas (Git Flow)

### Estructura de Ramas

| Rama | Propósito | Origen | Destino |
|------|-----------|--------|---------|
| `main` | Producción | - | deploy |
| `develop` | Desarrollo integración | - | main |
| `feature/NOMBRE` | Nueva funcionalidad | develop | develop |
| `hotfix/NOMBLE` | Corrección urgente | main | main + develop |
| `release/NOMBRE` | Preparar release | develop | main + develop |

### Convenciones

```
feature/cart-add        # Feature: agregar carrito
fix/login-bug          # Fix: bug de login
hotfix/security-patch # Hotfix: parche seguridad
release/v1.0.0        # Release: versión 1.0.0
```

### Flujo

```
1. git checkout -b feature/cart-add develop
2.trabajar en la feature
3.git commit -m "feat(cart): add shopping cart"
4.git push origin feature/cart-add
5.Crear PR → code review
6.Merge a develop
```

---

## 13. Pull Request (PR Template)

### Template de PR

```markdown
## Descripción
[Breve descripción del cambio]

## Tipo de Cambio
- [ ] Feature (nueva funcionalidad)
- [ ] Fix (corrección de bug)
- [ ] Refactor (refactorización)
- [ ] Docs (documentación)

## Checklist

- [ ] Tests passing
- [ ] Coverage >= 80%
- [ ] Lint passing
- [ ] CHANGELOG.md actualizado
- [ ] Documentación actualizada (si aplica)

## Screenshots (si es UI)
[Antes] / [Después]

## Notas Adicionales
[Cualquier información relevante]
```

### Reglas de PR

- **mínimo 1 reviewer** para aprobar
- **Todos los checks deben pasar** antes de merge
- **Squash commits** al hacer merge
- **Eliminar rama** después de merge

---

## 14. Code Review Checklist

### Antes de crear PR

- [ ] Tests passing
- [ ] Coverage >= 80%
- [ ] Lint passing
- [ ] CHANGELOG.md actualizado
- [ ] No hay console.log/debug
- [ ] Código sigue naming conventions
- [ ] Documentación actualizada

### Al hacer Review

- [ ] Código es maintainable
- [ ] Lógica es correcta
- [ ] Tests son suficientes
- [ ] No hay security issues
- [ ] Naming es consistente
- [ ] Comments claros (si needed)

### Guidelines

- **Máx 400 líneas** por archivo
- **Máx 20 funciones** por archivo
- **100% coverage** en archivos modificados
- **2 reviewers** mínimo por PR
- **Comments constructivos**

---

## 15. Observability

### Logging

#### Reglas de Logging

| Nivel | Cuándo usar |
|-------|-------------|
| `error` | Errores que rompen funcionalidad |
| `warn` | Cosas que pueden causar problemas |
| `info` | Información importante (startup, eventos clave) |
| `debug` | Información para debugging (dev only) |

#### Estructura de Log

```typescript
// Formato recomendado: JSON estructurado
{
  "timestamp": "2026-04-16T10:30:00Z",
  "level": "info",
  "message": "User logged in",
  "context": {
    "userId": "123",
    "ip": "192.168.1.1"
  }
}
```

#### Reglas

- **NUNCA** loggear passwords, tokens, datos sensibles
- **SIEMPRE** incluir requestId para trazabilidad
- **NO** usar console.log en producción (usar logger)
- **NUNCA** loggear en loop sin rate limiting

#### Ejemplo de implementación (Node.js)

```typescript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' 
    ? { target: 'pino-pretty' }
    : undefined,
});

// En un controller
export const getUser = (req, res) => {
  const requestId = req.headers['x-request-id'];
  logger.info({ requestId, userId: req.params.id }, 'Fetching user');
  // ...
};
```

### Metrics

#### Métricas Obligatorias

| Métrica | Tipo | Descripción |
|---------|------|-------------|
| `request_duration` | Histogram | Tiempo de respuesta |
| `request_count` | Counter | Total de requests |
| `error_rate` | Counter | Errores por endpoint |
| `active_users` | Gauge | Usuarios activos |

#### Prometheus/NPM recomendado

```
npm install prom-client
```

#### Ejemplo

```typescript
import { Registry, Counter, Histogram } from 'prom-client';

const register = new Registry();

const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'status', 'endpoint'],
  registers: [register],
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'endpoint'],
  buckets: [0.1, 0.5, 1, 2, 5],
  registers: [register],
});

// En middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    httpRequestsTotal.inc({ method: req.method, status: res.statusCode, endpoint: req.route?.path });
    httpRequestDuration.observe({ method: req.method, endpoint: req.route?.path }, (Date.now() - start) / 1000);
  });
  next();
});
```

### Health Checks

#### Endpoint de Health

```
GET /health
```

#### Respuesta

```json
{
  "status": "healthy",
  "timestamp": "2026-04-16T10:30:00Z",
  "checks": {
    "database": "up",
    "redis": "up",
    "external_api": "up"
  }
}
```

#### Tipos de Health Check

| Tipo | Frecuencia | Timeout |
|------|------------|---------|
| `liveness` | Cada 10s | 5s |
| `readiness` | Cada 30s | 10s |

#### Implementación

```typescript
app.get('/health', async (req, res) => {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
  };
  
  const isHealthy = Object.values(checks).every(c => c === 'up');
  
  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    checks,
  });
});
```

### Tracing (Opcional)

- Usar **OpenTelemetry** para distributed tracing
- Incluir `trace_id` en todos los logs
- Sampling: 10% en producción, 100% en dev

---

## 16. Seguridad

### Reglas Generales

| Regla | Descripción |
|-------|-------------|
| **Input Validation** | Validar TODOS los inputs (schema validation) |
| **Output Encoding** | Escapar outputs para prevenir XSS |
| **Authentication** | JWT/ OAuth2 con tokens short-lived |
| **Authorization** | RBAC con permisos por recurso |
| **Secrets** | NUNCA hardcodear secrets en código |
| **HTTPS** | Siempre en producción |
| **Rate Limiting** | Limitar requests por IP/user |

### Security Checklist

- [ ] Validación de inputs en todos los endpoints
- [ ] Headers de seguridad (helmet.js)
- [ ] CORS configurado correctamente
- [ ] Rate limiting implementado
- [ ] SQL injection previene (parametrized queries)
- [ ] XSS previene (sanitize inputs)
- [ ] CSRF protection (si aplica)
- [ ] Logs de seguridad (login failed, etc)

### Headers de Seguridad (Node.js)

```typescript
import helmet from 'helmet';

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
  },
}));
```

### Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // 100 requests
  message: 'Too many requests',
});

app.use('/api/', limiter);
```

---

## 17. Performance

### Reglas

| Regla | Límite |
|-------|--------|
| Response Time | < 200ms (p95) |
| Memory Usage | < 512MB por instancia |
| CPU Usage | < 70% sostenido |
| DB Queries por request | < 5 |
| Payload Size | < 1MB |

### Optimizaciones Recomendadas

- **Caching**: Redis para datos frecuentes
- **Pagination**: Siempre paginar listas
- **Indexing**: Índices en campos de búsqueda
- **Lazy Loading**: Cargar datos bajo demanda
- **Compression**: gzip para responses grandes
- **CDN**: Para assets estáticos

### Performance Checklist

- [ ] Endpoints paginados
- [ ] Queries optimizadas (indices)
- [ ] Caching implementado (si aplica)
- [ ] Compression habilitado
- [ ] N+1 queries evitadas
- [ ] Connection pooling (DB)

### Herramientas de Medición

```bash
# Node.js
npm install clinic doctor flare

# Uso
clinic doctor -- node server.js
```

---

## 18. Checklist por Tipo de Proyecto

### Frontend (Next.js/React/Vue)

- [ ] Component structure
- [ ] Routing configuration
- [ ] State management
- [ ] API integration
- [ ] UI testing

### Backend (Node/Python/Go)

- [ ] API routes/endpoints
- [ ] Database models/schema
- [ ] Authentication/Authorization
- [ ] API testing (integration)
- [ ] Error handling

### Mobile (Flutter/React Native)

- [ ] Screen structure
- [ ] Navigation
- [ ] State management
- [ ] API integration
- [ ] Platform-specific testing

---

## 19. Información General

| Campo | Descripción |
|-------|-------------|
| **Proyecto** | COMPLETAR |
| **Tipo** | COMPLETAR (frontend/backend/mobile/fullstack/api/cli) |
| **Tech Stack** | COMPLETAR |
| **Metodología** | SDD (Specification-Driven Development) |
| **Repo** | COMPLETAR (opcional) |

### Tech Stack del Proyecto

```
COMPLETAR con el tech stack específico:

Ejemplo 1 (Frontend Next.js):
- Frontend: Next.js 14, React 19, TypeScript
- Estilos: Tailwind CSS
- Testing: Jest, React Testing Library
- Lint: ESLint, Prettier

Ejemplo 2 (Backend Python):
- Backend: Python 3.11, FastAPI
- Base de datos: PostgreSQL + SQLAlchemy
- Testing: Pytest, httpx
- Lint: flake8, black, mypy

Ejemplo 3 (Mobile Flutter):
- Mobile: Flutter 3.x, Dart 3.x
- Estado: Riverpod
- Testing: flutter_test, mocktail
- Lint: flutter analyze, dart format
```

---

## 20. Notas de Adaptación

- **Este template es adaptable** a cualquier tech stack
- **Las secciones pueden moverse** según necesidad del proyecto
- **Coverage puede ajustarse** según complejidad del proyecto
- **La clave es:** SPEC → CODE → TEST → VERIFY → DOCS → COMMIT
- **Man in the Loop:** siempre preguntar antes de continuar

---

## 21. Mantenimiento

| Fecha | Cambio |
|-------|--------|
| 2026-04-16 | Template inicial basado en Dummy Books SDD |
| 2026-04-16 | Agregadas secciones: Observability, Seguridad, Performance |

**Última actualización:** 2026-04-16