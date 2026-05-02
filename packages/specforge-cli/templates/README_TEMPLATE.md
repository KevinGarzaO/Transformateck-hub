# README.md - Template de Proyecto

> **IMPORTANTE:** Este es un **TEMPLATE REUSABLE**.

> Para usarlo en un proyecto, la IA debe:
> 1. Copiar este archivo al proyecto
> 2. Completar la información en cada sección
> 3. Adaptar según el tipo de proyecto

---

# NOMBRE DEL PROYECTO

> Descripción breve del proyecto (máx 2 líneas)

[![Version](https://img.shields.io/badge/version-1.0.0-blue)](#)
[![License](https://img.shields.io/badge/license-MIT-green)](#)
[![Status](https://img.shields.io/badge/status-Active-success)](#)

## 📋 Descripción

Descripción detallada del proyecto:
- Qué resuelve
- Para quién es
- Cuál es el valor agregado

### Características Principales

- ✅ Característica 1
- ✅ Característica 2
- ✅ Característica 3

---

## 🚀 Inicio Rápido (Onboarding)

### Prerrequisitos

| Herramienta | Versión Mínima | Cómo verificar |
|-------------|----------------|----------------|
| Node.js | 18.x | `node --version` |
| npm | 9.x | `npm --version` |
| Git | 2.x | `git --version` |
| Docker | 24.x | `docker --version` |

> **Para Windows:** Instalar [Node.js LTS](https://nodejs.org/) y [Git for Windows](https://git-scm.com/)

### Instalación (5 minutos)

```bash
# 1. Clonar el repo
git clone https://github.com/org/project-name.git
cd project-name

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Iniciar desarrollo
npm run dev
```

### Verificar Setup

```
✅ npm install completado
✅ Servidor corriendo en http://localhost:3000
✅ Tests pasando: npm test
✅ Coverage >= 80%
```

---

## 📚 Documentación

| Documento | Descripción | Dónde está |
|-----------|-------------|------------|
| **AGENTS.md** | Normas de desarrollo del equipo | Raíz del proyecto |
| **SPEC.md** | Especificación técnica general | `docs/SPEC.md` |
| **ARCHITECTURE.md** | Arquitectura del sistema | `docs/ARCHITECTURE.md` |
| **API Docs** | Documentación de endpoints | `docs/api/` o Postman |
| **CHANGELOG.md** | Historial de cambios | Raíz del proyecto |

### Documentación por Feature

```
docs/features/<feature_name>/
├── <feature>.md          ← User Story + Criterios
├── spec-<feature>.md     ← SPEC técnica
├── PLAN.md               ← Plan de implementación
└── COMPLETED.md          ← Resumen al completar
```

---

## 💻 Comandos de Desarrollo

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor en desarrollo |
| `npm run build` | Build para producción |
| `npm start` | Iniciar servidor producción |
| `npm test` | Ejecutar tests con coverage |
| `npm run test:watch` | Tests en modo watch |
| `npm run lint` | Verificar código |
| `npm run lint:fix` | Corregir errores de lint |
| `npm run format` | Formatear código |
| `npm run pre-commit` | Ejecutar lint + test antes de commit |

### Variables de Entorno

```env
# Base de datos
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname

# API Keys
API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here

# Servicios externos
REDIS_URL=redis://localhost:6379
SMTP_HOST=smtp.example.com
```

---

## 🏗️ Estructura del Proyecto

```
project-name/
├── src/                      ← Código fuente
│   ├── controllers/         ← Controladores (lógica de negocio)
│   ├── routes/             ← Rutas API
│   ├── services/           ← Servicios (datos, lógica)
│   ├── types/              ← Tipos TypeScript/interfaces
│   ├── middlewares/        ← Middlewares Express
│   ├── utils/              ← Utilidades
│   └── index.ts            ← Entry point
│
├── tests/                    ← Tests unitarios
│   └── routes/
│
├── docs/                     ← Documentación
│   ├── features/           ← Docs por feature
│   ├── SPEC.md             ← SPEC general
│   └── ARCHITECTURE.md     ← Arquitectura
│
├── scripts/                  ← Scripts de utilidad
├── public/                   ← Archivos estáticos
├── .env.example             ← Variables de ejemplo
├── AGENTS.md               ← Normas del equipo
├── CHANGELOG.md            ← Historial de cambios
├── package.json
└── README.md
```

---

## 🔄 Flujo de Trabajo (Team Guidelines)

### Antes de Empezar

1. **Revisar Issues** → Buscar tareas disponibles en GitHub/GitLab
2. **Crear Rama** → Desde `develop` usando convención de nombres
3. **Leer Spec** → Revisar `docs/features/<feature>/spec-<feature>.md`
4. **Ask Questions** → Si algo no está claro, preguntar

### Workflow por Feature (SDD)

```
1. SPEC    → Revisar especificación en docs/features/<name>/
2. CODE    → Implementar código
3. TEST    → Escribir tests
4. VERIFY  → npm run lint && npm test
5. DOCS    → Actualizar documentación del feature
6. COMMIT  → Commit con mensaje Conventional Commits
7. PR      → Crear Pull Request
```

### Reglas del Equipo

| Regla | Descripción |
|-------|-------------|
| **Man in the Loop** | Siempre preguntar antes de continuar al siguiente paso |
| **Code Review** | Mínimo 1 reviewer aprobado para merge |
| **Tests** | Coverage mínimo 80% (branches 78%) |
| **Lint** | Código debe pasar lint antes de commit |
| **Docs** | Documentar todo en docs/features/<feature>/ |
| **CHANGELOG** | Actualizar en cada commit |

### Comunicación

| Cuándo | Cómo |
|--------|------|
| Dudas técnicas | Slack: #dev-team |
| Bugs encontrados | GitHub Issues con labels |
| Feature request | GitHub Issues con label "enhancement" |
| Blockers | Notify immediately en Slack |
| Code Review | PR comments constructivos |

---

## 👥 Roles y Responsabilidades

| Rol | Responsabilidad |
|-----|-----------------|
| **Developer** | Implementar features, tests, docs |
| **Reviewer** | Code review, asegurar quality |
| **Tech Lead** | Arquitectura, decisiones técnicas |
| **Product Owner** | Priorización, requisitos |

### Decision Making

```
❓ Pregunta técnica
   ↓
📖 Revisar AGENTS.md y documentación
   ↓
💬 Preguntar en #dev-team
   ↓
🧪 Experimentar en branch local
   ↓
📝 Documentar decisión
```

---

## 🛠️ Configuración de Entorno

### Editor Recomendado

**VS Code** con extensiones:
- ESLint
- Prettier
- GitLens
- Thunder Client / REST Client

### Configuración VS Code

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true
  }
}
```

### Git Config (primera vez)

```bash
git config user.name "Tu Nombre"
git config user.email "tu@email.com"
```

---

## 📖 Guía de Estilo de Código

### TypeScript

```typescript
// ✅ Correcto
interface User {
  id: string;
  name: string;
  email: string;
}

export const getUserById = async (id: string): Promise<User | null> => {
  const user = await db.users.findById(id);
  return user;
};

// ❌ Evitar
function getUser(id) {
  return db.users.findById(id);
}
```

### Naming

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Archivos | kebab-case | `user-service.ts` |
| Componentes | PascalCase | `UserProfile.tsx` |
| Funciones | camelCase | `getUserById()` |
| Constantes | UPPER_SNAKE | `MAX_RETRY = 3` |
| Rutas API | RESTful | `/api/users/:id` |

---

## 🧪 Testing

### Estrategias

| Tipo | Cuándo | Herramienta |
|------|--------|-------------|
| Unit | Funciones individuales | Jest, Pytest |
| Integration | APIs, DB | Supertest, httpx |
| E2E | Flujos completos | Playwright, Cypress |

### Coverage Requerido

| Métrica | Mínimo | Objetivo |
|---------|--------|----------|
| Statements | 70% | 80% |
| Branches | 65% | 78% |
| Functions | 70% | 80% |
| Lines | 70% | 80% |

### Ejecutar Tests

```bash
# Todos los tests con coverage
npm test

# Solo tests de un archivo
npm test -- --testPathPattern="users"

# Modo watch
npm run test:watch

# Coverage detallado
npm test -- --coverage
```

---

## 🚢 Deployment

### Environments

| Environment | URL | Rama |
|-------------|-----|------|
| Development | dev.project.com | `develop` |
| Staging | staging.project.com | `release/*` |
| Production | project.com | `main` |

### Pipeline CI/CD

```
Commit → Lint → Test → Build → Deploy (Staging) → QA → Deploy (Production)
```

### Comandos de Deploy

```bash
# Build producción
npm run build

# Deploy a staging (ejemplo)
npm run deploy:staging

# Deploy a producción (solo desde main)
npm run deploy:production
```

---

## 🤝 Contributing

### Cómo Contribuir

1. Fork del repo
2. Crear rama: `feature/nombre` o `fix/nombre`
3. Implementar siguiendo SDD workflow
4. Crear PR con description clara
5. Esperar code review

### PR Requirements

- [ ] Tests passing
- [ ] Coverage >= 80%
- [ ] Lint passing
- [ ] CHANGELOG.md actualizado
- [ ] Docs actualizadas (si aplica)
- [ ] Mínimo 1 approval

### Commit Message Format

```
<type>(<scope>): <description>

[ body ]
[ footer ]
```

**Types:** feat, fix, docs, style, refactor, test, config, perf

---

## ❓ FAQ

### Preguntas Frecuentes de Nuevos Desarrolladores

**P: ¿Cómo obtengo acceso a los servicios?**
R: Solicitar al Tech Lead via Slack #dev-team

**P: ¿Dónde está la base de datos?**
R: Ver `docker-compose.yml` para servicios locales

**P: ¿Qué hago si algo no funciona?**
R: 
1. Revisar docs en `docs/`
2. Preguntar en Slack #dev-team
3. Crear issue si es bug

**P: ¿Puedo hacer cambios grandes?**
R: Discutir con Tech Lead primero. Grandes cambios requieren RFC.

**P: ¿Cómo reporto un security issue?**
R: NO crear issue público. Notificar directamente al Tech Lead.

---

## 📞 Contacto

| Contacto | Canal |
|----------|-------|
| Tech Lead | @tech-lead en Slack |
| Soporte técnico | #dev-team en Slack |
| Issues/Bugs | GitHub Issues |
| Documentación | docs/ folder |

---

## 📝 Información del Proyecto

| Campo | Valor |
|-------|-------|
| **Nombre** | COMPLETAR |
| **Tipo** | COMPLETAR (frontend/backend/mobile/fullstack) |
| **Tech Stack** | COMPLETAR |
| **Fecha Inicio** | COMPLETAR |
| **Versión Actual** | COMPLETAR |
| **Licencia** | COMPLETAR |

### Tech Stack

```
COMPLETAR:

Ejemplo:
- Frontend: Next.js 14, React 19, TypeScript
- Backend: Node.js 18, Express, TypeScript
- Base de datos: PostgreSQL
- Testing: Jest, Supertest
- CI/CD: GitHub Actions
- Cloud: AWS
```

---

## 🔖 Changelog

Ver [CHANGELOG.md](CHANGELOG.md) para historial completo de versiones.

---

## 📜 Licencia

COMPLETAR - Ver [LICENSE](LICENSE) para detalles.

---

*Para dudas sobre este documento, consultar en #dev-team Slack*