import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET_ONE || 'debug-secret-one-transformateck-2026'
);

export const COOKIE_NAME = 'one_token';

export interface OneUser {
  userId: string;
  email: string;
  role: string;
  projects: string[]; // Access list for avocado, specforge, etc.
}

/**
 * Genera un token JWT para el ecosistema One
 */
export async function createToken(user: OneUser) {
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
    return payload as unknown as OneUser;
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
  });
}

/**
 * Elimina la cookie de sesión
 */
export async function deleteAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
