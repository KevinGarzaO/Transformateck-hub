# SpecForge-TX - SDD CLI

CLI para Specification-Driven Development (SDD) con IA.

## Instalación

```bash
# Instalar globalmente
npm install specforge-tx -g

# O usar directamente
npx specforge-tx <comando>
```

## Flujo SDD Completo

El CLI sigue la metodología Specification-Driven Development con 6 fases:

```
📋 FASE 1: SPEC    → Escribir especificación
💻 FASE 2: CODE    → Implementar código  
🧪 FASE 3: TEST    → Escribir tests
✅ FASE 4: VERIFY   → Tests + lint + coverage
📝 FASE 5: DOCS    → Completar documentación
🔧 FASE 6: COMMIT  → git commit + push
```

**Regla SDD:** Man in the Loop - Siempre pregunta confirmación antes de continuar.

## Comandos

### Crear proyecto

```bash
sftx create <nombre-proyecto>    # Crear nuevo proyecto SDD
sftx install                  # Instalar SDD en proyecto existente
```

### Fases SDD (por feature)

```bash
# FASE 1: Escribir SPEC
sftx spec "carrito de compras"

# FASE 2: Implementar código
sftx code "carrito de compras"

# FASE 3: Escribir tests
sftx test "carrito de compras"

# FASE 4: Verificar (tests + lint + coverage)
sftx verify "carrito de compras"

# FASE 5: Completar docs
sftx docs "carrito de compras"

# FASE 6: Commit y push
sftx commit "carrito de compras"
```

### Atajo

```bash
# Ejecuta todas las fases automáticamente
sftx all "carrito de compras"
```

### Otros

```bash
sftx fix "bug en login"    # Corregir bug con IA
sftx help               # Ver ayuda
```

## Ejemplo: Carrito de Compras

### Paso 1: Escribir SPEC

```bash
sftx spec "carrito de compras"
```

**Archivos generados:**
- `docs/features/carrito-de-compras/carrito-de-compras.md` - User Story, criterios, reglas
- `docs/features/carrito-de-compras/spec-carrito-de-compras.md` - Technical SPEC

### Paso 2: Implementar código

```bash
sftx code "carrito de compras"
```

**Archivos generados:**
- `src/features/carrito-de-compras/index.ts`
- `src/features/carrito-de-compras/CartService.ts`

### Paso 3: Escribir tests

```bash
sftx test "carrito de compras"
```

**Archivos generados:**
- `src/features/carrito-de-compras/carrito-de-compras.test.ts`

### Paso 4: Verificar

```bash
sftx verify "carrito de compras"
```

**Ejecuta:**
- `npm test -- --coverage`
- `npm run lint`
- Muestra coverage

### Paso 5: Completar docs

```bash
sftx docs "carrito de compras"
```

**Archivos generados:**
- `docs/features/carrito-de-compras/COMPLETED.md` - Resumen completo
- Actualiza criterios a [x]

### Paso 6: Commit y push

```bash
sftx commit "carrito de compras"
```

**Ejecuta:**
- `git add -A`
- `git commit -m "feat(carrito-de-compras): add shopping cart"`
- `git push`
- Actualiza `CHANGELOG.md`

## Estructura Generada

```
proyecto/
├── src/
│   └── features/
│       └── carrito-de-compras/
│           ├── index.ts
│           └── cart.test.ts
├── docs/
│   └── features/
│       └── carrito-de-compras/
│           ├── SPEC.md
│           ├── spec-carrito-de-compras.md
│           └── COMPLETED.md
├── SpecForge-TX/
│   ├── AGENTS_RULES.md      # Reglas SDD
│   └── .sdd-state.json    # Estado de features
└── CHANGELOG.md
```

## Testing Strategy

### Tres Tipos de Tests

SpecForge-TX soporta **tres tipos de testing** para cobertura completa:

#### 1. Unit Tests (DEFAULT)
Prueban funciones y componentes individuales en aislamiento.

```bash
sftx test "carrito-de-compras"
# Genera: carrito-de-compras.test.ts (con tests unitarios)
```

**Características:**
- Rápidos de ejecutar
- Mockean dependencias externas
- Prueban happy path + edge cases
- Coverage: 80%+ recomendado

**Ejemplo Jest:**
```typescript
describe('Cart Service', () => {
  it('should calculate total correctly', () => {
    const cart = new CartService();
    cart.addItem({ id: 1, price: 10, qty: 2 });
    expect(cart.getTotal()).toBe(20);
  });
});
```

#### 2. Integration Tests
Prueban interacción entre múltiples módulos y dependencias reales.

```bash
sftx test "carrito-de-compras" --type integration
# Genera: carrito-de-compras.integration.test.ts
```

**Características:**
- Prueban flujos completos (API → Service → DB)
- Usan bases de datos de prueba reales
- Simulan workflows del usuario
- Más lentos que unit tests

**Ejemplo:**
```typescript
describe('Cart API Integration', () => {
  it('should create cart and add items', async () => {
    const response = await request(app)
      .post('/api/cart')
      .send({ userId: 123 });
    
    expect(response.status).toBe(201);
    expect(response.body.total).toBe(0);
  });
});
```

#### 3. E2E Tests (End-to-End)
Prueban workflows completos desde el navegador del usuario.

```bash
sftx test "carrito-de-compras" --type e2e
# Genera: carrito-de-compras.e2e.test.ts (Cypress/Playwright)
```

**Características:**
- Simulan usuarios reales en navegador
- Prueban interfaz completa
- Validan flujos de checkout completos
- Más lentos pero más realistas

**Ejemplo Cypress:**
```typescript
describe('Shopping Cart E2E', () => {
  it('should complete purchase', () => {
    cy.visit('/products');
    cy.get('[data-testid="product"]').first().click();
    cy.get('button:contains("Add to Cart")').click();
    cy.get('[data-testid="cart-count"]').should('contain', '1');
  });
});
```

### Opciones de Verify

El comando `verify` ahora soporta múltiples opciones:

```bash
# Ejecución normal con coverage
sftx verify "carrito-de-compras"

# Watch mode - Desarrolla con rerun automático
sftx verify "carrito-de-compras" --watch
# Equivalente: npm run test:watch

# Solo tests del feature actual
sftx verify "carrito-de-compras" --only-feature

# Coverage mínimo personalizado (default: 80%)
sftx verify "carrito-de-compras" --min-coverage 90

# Combinar opciones
sftx verify "carrito-de-compras" --watch --only-feature
```

### Framework-Aware Testing

SpecForge-TX automáticamente detecta tu framework y genera tests con el test runner correcto:

| Framework | Test Runner | Config File |
|-----------|------------|-------------|
| Next.js | Jest | `jest.config.js` |
| React | Vitest | `vitest.config.ts` |
| Vue | Vitest | `vitest.config.ts` |
| Express | Jest | `jest.config.js` |
| FastAPI | Pytest | `pytest.ini` |
| Angular | Jasmine | `karma.conf.js` |
| Flutter | flutter_test | `test/` |

Cada proyecto nuevo genera automáticamente la configuración correcta.

### Coverage Reports

Los reportes de coverage se guardan automáticamente:

```
proyecto/
├── coverage/                    # Reporte actual
│   ├── index.html              # Vista HTML
│   ├── coverage-final.json     # Datos raw
│   └── lcov.info               # Para CI/CD
└── coverage-reports/           # Histórico
    ├── 2026-04-18/
    │   └── coverage/           # Snapshot del día
    └── 2026-04-19/
        └── coverage/
```

Perfectamente integrables con:
- Codecov
- Coveralls
- Code Climate

## Opciones

| Opción | Descripción |
|--------|------------|
| `-f, --framework` | Framework (nextjs, react, vue, express, fastapi) |
| `-a, --author` | Nombre del autor |
| `-y, --yes` | Auto-aprobar confirmaciones |
| `-w, --watch` | Modo watch para verify |
| `--only-feature` | Solo tests del feature actual |
| `--min-coverage <N>` | Umbral mínimo de coverage (default: 80) |
| `--type <type>` | Tipo de test: unit \| integration \| e2e |

## Frameworks Soportados

| Framework | Descripción | Testing |
|----------|------------|---------|
| `nextjs` | Next.js 14 + React + TypeScript | Jest + RTL |
| `react` | React + Vite + TypeScript | Vitest + RTL |
| `vue` | Vue 3 + Vite + TypeScript | Vitest + VTU |
| `express` | Express + TypeScript | Jest + Supertest |
| `fastapi` | FastAPI + Python 3.11 | Pytest |
| `angular` | Angular 17+ + TypeScript | Jasmine + Karma |
| `flutter` | Flutter 3.x + Dart | flutter_test |
| `react-native` | React Native + Expo | Jest |
| `ionic-angular` | Ionic + Angular | Jasmine + Karma |
| `ionic-react` | Ionic + React | Vitest + RTL |
| `ionic-vue` | Ionic + Vue | Vitest + VTU |

## Definition of Done

| ✅ | Requisito |
|----|----------|
| ☐ | SPEC escrita y aprobada |
| ☐ | Código implementa la spec |
| ☐ | Tests passing |
| ☐ | Coverage >= 80% |
| ☐ | Lint passing |
| ☐ | CHANGELOG.md actualizado |
| ☐ | git commit + push |

## Comandos de Desarrollo

```bash
npm run dev      # Desarrollo
npm run build    # Build
npm test        # Tests con coverage
npm run lint    # Verificar código
```

## Licencia

MIT