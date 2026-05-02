# SECURITY_TEMPLATE.md - Template de Política de Seguridad

> **IMPORTANTE:** Este es un **TEMPLATE REUSABLE**.
> 
> Para usarlo en un proyecto:
> 1. Copiar este archivo al proyecto
> 2. Completar la información de contacto
> 3. Adaptar según el tipo de proyecto

---

## Versiones Soportadas

| Versión | Soportada | Estado |
|--------|-----------|---------|
| 1.x.x | ✅ | Actual |
| 0.x.x | ⚠️ | Legacy |

---

## Reportar Vulnerabilidades

Si descubres una vulnerabilidad de seguridad, por favor:

1. **NO** crear un issue público
2. Enviar email a: `security@example.com`
3. O contactar directamente al Tech Lead

### Qué Incluir en el Reporte

- Descripción de la vulnerabilidad
- Pasos detallados para reproducir
- Potencial impacto
- Posibles correcciones (si las conoces)

### Timeline de Respuesta

- **Acknowledge:** 24 horas
- **Updates:** Cada 3 días
- **Resolution:** Según severidad

---

## Severidad de Vulnerabilidades

| Nivel | Descripción | Tiempo de Respuesta |
|-------|-------------|-------------------|
| **Crítica** | RCE, SQL Injection, Acceso no autorizado | 24 horas |
| **Alta** | XSS, CSRF, Broken Auth | 3 días |
| **Media** | Information Disclosure, UX | 1 semana |
| **Baja** | Mejoras menores | 1 mes |

---

## Mejores Prácticas de Seguridad

### Para Desarrolladores

| Regla | Descripción |
|-------|-------------|
| **Input Validation** | Validar TODOS los inputs (schema validation) |
| **Output Encoding** | Escapar outputs para prevenir XSS |
| **Authentication** | JWT/OAuth2 con tokens short-lived |
| **Authorization** | RBAC con permisos por recurso |
| **Secrets** | NUNCA hardcodear secrets en código |
| **HTTPS** | Siempre en producción |
| **Rate Limiting** | Limitar requests por IP/user |

### Checklist de Seguridad

- [ ] Validación de inputs en todos los endpoints
- [ ] Headers de seguridad (helmet.js)
- [ ] CORS configurado correctamente
- [ ] Rate limiting implementado
- [ ] SQL injection previene (parametrized queries)
- [ ] XSS previene (sanitize inputs)
- [ ] CSRF protection (si aplica)
- [ ] Logs de seguridad (login failed, etc)
- [ ] Tokens JWT con expiración corta
- [ ] Contraseñas hasheadas (bcrypt/argon2)
- [ ] Sesiones con timeout

---

## Configuración de Seguridad

### Headers de Seguridad (Node.js/Express)

```typescript
import helmet from 'helmet';

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'"],
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"],
  },
}));

// HSTS
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true,
}));
```

### Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // 100 requests
  message: 'Too many requests',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Stricter for auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts
  message: 'Too many auth attempts',
});

app.use('/api/auth/', authLimiter);
```

### CORS

```typescript
import cors from 'cors';

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400,
}));
```

### JWT

```typescript
import jwt from 'jsonwebtoken';

const signOptions = {
  expiresIn: '15m', // Token corto
  algorithm: 'RS256',
};

const refreshOptions = {
  expiresIn: '7d',
  algorithm: 'RS256',
};
```

---

## Autenticación

### Contraseñas

```typescript
import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12); // Work factor 12
};

const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
```

### Validación de Inputs

```typescript
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  name: z.string().min(2).max(100),
});
```

---

## Protección de Datos

### Datos Sensibles

| Tipo | Cómo manejar |
|------|-------------|
| Contraseñas | Hash con bcrypt/argon2 |
| Tokens | JWT con expiración corta |
| API Keys | Env vars, nunca en código |
| Keys SSH | SSH keys, nunca en repo |
| Credenciales | Secret manager |
| PII | Encriptar en DB |

### Environment Variables

```env
# ❌ NO hacer esto
API_KEY=sk_live_123456789

# ✅ Usar env vars
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
JWT_SECRET=${JWT_SECRET}
ENCRYPTION_KEY=${ENCRYPTION_KEY}
```

---

## Logging de Seguridad

### Eventos a Loggear

```typescript
const securityLogger = {
  loginFailed: (email, ip) => logger.warn({ email, ip }, 'Login failed'),
  loginSuccess: (email, ip) => logger.info({ email, ip }, 'Login success'),
  logout: (email) => logger.info({ email }, 'Logout'),
  passwordReset: (email) => logger.info({ email }, 'Password reset requested'),
  suspiciousActivity: (ip, details) => logger.warn({ ip, details }, 'Suspicious activity'),
};
```

---

## Dependency Security

### Actualizar Dependencias

```bash
# Ver vulnerabilidades
npm audit

# Ver outdated
npm outdated

# Actualizar seguro
npm update --audit
```

### Configurar GitHub Alerts

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
```

---

## Incidentes

### Si Occurre un Incidente

1. ** Containment:** Aislar sistemas afectados
2. ** Assessment:** Evaluar impacto
3. ** Eradication:** Eliminar amenaza
4. ** Recovery:** Restaurar servicios
5. ** Post-Incident:** Documentar y mejorar

### Contacto de Emergencia

| Contacto | Email |
|----------|-------|
| Security Lead | security-lead@example.com |
| Tech Lead | tech-lead@example.com |

---

## Recursos

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security](https://nodejs.org/en/docs/guides/security/)
- [Helmet.js](https://helmetjs.github.io/)

---

## Mantenimiento

| Fecha | Cambio | Autor |
|-------|--------|-------|
| YYYY-MM-DD | Template inicial | @dev |

---

*Para dudas sobre seguridad, contactar security@example.com*