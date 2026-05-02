import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  let pathname = url.pathname;
  const hostname = req.headers.get('host') || '';

  // 1. Mapeo de Subdominios (Rewrites)
  let isRewritten = false;
  if (hostname.includes('transsync.transformateck.com')) {
    if (!pathname.startsWith('/transsync')) {
      pathname = `/transsync${pathname === '/' ? '' : pathname}`;
      isRewritten = true;
    }
  } else if (hostname.includes('inventarios.transformateck.com')) {
    if (!pathname.startsWith('/inventarios')) {
      pathname = `/inventarios${pathname === '/' ? '' : pathname}`;
      isRewritten = true;
    }
  } else if (hostname.includes('workspace.transformateck.com')) {
    // Rutas limpias para el dominio de identidad de Workspace
    const cleanPath = pathname.replace(/\/$/, '');
    if (cleanPath === '/login') {
      pathname = '/cuenta/login';
      isRewritten = true;
    } else if (cleanPath === '/portal' || cleanPath === '/app') {
      pathname = '/cuenta/portal';
      isRewritten = true;
    } else if (cleanPath === '/registro') {
      pathname = '/cuenta/registro';
      isRewritten = true;
    }
  } else if (pathname === '/app') {
    // Redirección genérica de /app a dashboard si estamos en un subdominio de producto
    if (hostname.includes('transsync.')) {
      pathname = '/transsync/dashboard/inicio';
      isRewritten = true;
    } else if (hostname.includes('inventarios.')) {
      pathname = '/inventarios/dashboard/inicio';
      isRewritten = true;
    }
  }

  // Actualizar el pathname para la lógica de Auth
  url.pathname = pathname;

  // 2. Lógica de Autenticación
  const isLandingPage = pathname === '/' || pathname === '/transsync' || pathname === '/inventarios' || pathname.startsWith('/transsync/landing') || pathname.startsWith('/inventarios/landing');
  const isAuthPage = pathname.startsWith('/cuenta/login') || pathname.startsWith('/cuenta/registro');
  const isPublicRoute = isLandingPage || isAuthPage || pathname === '/transsync' || pathname === '/inventarios';

  // Obtenemos el token de la cookie del ecosistema workspace
  const token = req.cookies.get('workspace_token');

  if (isPublicRoute) {
    // Si tiene sesión activa y va al login o landing, mandarlo directo a la App
    if (token && (isAuthPage || isLandingPage)) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/app';
      return NextResponse.redirect(redirectUrl);
    }
    return isRewritten ? NextResponse.rewrite(url) : NextResponse.next();
  }

  // Rutas de aplicación protegidas (ej: /transsync/app/*)
  if (!token) {
    const loginUrl = new URL('https://workspace.transformateck.com/login', req.url);
    // Guardar URL completa para retorno inteligente
    loginUrl.searchParams.set('redirect', req.url);
    return NextResponse.redirect(loginUrl);
  }
  
  return isRewritten ? NextResponse.rewrite(url) : NextResponse.next();
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
