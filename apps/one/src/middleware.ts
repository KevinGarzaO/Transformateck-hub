import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  let pathname = url.pathname;
  const hostname = req.headers.get('host') || '';

  // 1. Mapeo de Subdominios (Rewrites)
  let isRewritten = false;
  if (hostname.includes('avocado.transformateck.com')) {
    if (!pathname.startsWith('/avocado')) {
      pathname = `/avocado${pathname === '/' ? '' : pathname}`;
      isRewritten = true;
    }
  } else if (hostname.includes('specforge.transformateck.com')) {
    if (!pathname.startsWith('/specforge')) {
      pathname = `/specforge${pathname === '/' ? '' : pathname}`;
      isRewritten = true;
    }
  } else if (hostname.includes('cuenta.transformateck.com')) {
    if (!pathname.startsWith('/cuenta')) {
      // Si entran a la raíz de la cuenta, enviarlos al portal
      if (pathname === '/') pathname = '/portal';
      pathname = `/cuenta${pathname}`;
      isRewritten = true;
    }
  } else if (hostname.includes('one.transformateck.com')) {
    // Rutas limpias para el dominio principal de identidad
    const cleanPath = pathname.replace(/\/$/, ''); // Quitar barra final si existe
    if (cleanPath === '/login') {
      pathname = '/cuenta/login';
      isRewritten = true;
    } else if (cleanPath === '/portal') {
      pathname = '/cuenta/portal';
      isRewritten = true;
    } else if (cleanPath === '/registro') {
      pathname = '/cuenta/registro';
      isRewritten = true;
    }
  }

  // Actualizar el pathname para que la lógica de Auth funcione con las rutas reales
  url.pathname = pathname;

  // 2. Lógica de Autenticación
  const publicRoutes = ['/', '/avocado', '/specforge', '/cuenta/login', '/cuenta/registro'];
  const isPublicRoute = publicRoutes.some(r => pathname === r || pathname.startsWith(r + '/'));

  // Token para el ecosistema One
  const token = req.cookies.get('one_token');

  if (isPublicRoute) {
    if (token && pathname === '/cuenta/login') {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/';
      return NextResponse.redirect(redirectUrl);
    }
    return isRewritten ? NextResponse.rewrite(url) : NextResponse.next();
  }

  // Rutas protegidas (ej. /avocado/app, /specforge/app, /cuenta/portal)
  if (!token) {
    const loginUrl = new URL('https://one.transformateck.com/login', req.url);
    // Guardar la URL COMPLETA (incluyendo subdominio) para volver exactamente ahí después del login
    loginUrl.searchParams.set('redirect', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return isRewritten ? NextResponse.rewrite(url) : NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
