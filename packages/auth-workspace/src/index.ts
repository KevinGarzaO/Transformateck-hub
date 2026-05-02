import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET_WORKSPACE || 'debug-secret-workspace-transformateck-2026'
);

export const COOKIE_NAME = 'workspace_token';

export interface WorkspaceUser {
  userId: string;
  email: string;
  role: string;
  products: Array<{
    product: string;
    companyId: string;
    role: string;
    plan: string;
  }>;
}

/**
 * Genera un token JWT para el ecosistema Workspace
 */
export async function createToken(user: WorkspaceUser) {
  return await new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET);
}

/**
 * Verifica un token JWT
 */
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as WorkspaceUser;
  } catch (err) {
    return null;
  }
}

/**
 * Guarda el token en una cookie de larga duración compartida
 */
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 horas
    // Si estuviéramos en producción con dominios reales:
    // domain: '.transformateck.com'
  });
}

/**
 * Elimina la cookie de sesión
 */
export async function deleteAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
