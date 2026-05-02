import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  let pathname = url.pathname;
  const hostname = req.headers.get('host') || '';

  // 1. Mapeo de Subdominios (Rewrites)
  let isRewritten = false;
  if (hostname.includes('transsync.transformateck.com')) {
    pathname = `/transsync${pathname === '/' ? '' : pathname}`;
    isRewritten = true;
  } else if (hostname.includes('inventarios.transformateck.com')) {
    pathname = `/inventarios${pathname === '/' ? '' : pathname}`;
    isRewritten = true;
  }

  // Actualizar el pathname para la lógica de Auth
  url.pathname = pathname;

  // 2. Rutas públicas — no necesitan auth
  const publicRoutes = ['/', '/transsync', '/inventarios', '/cuenta/login', '/cuenta/registro', '/cuenta/recuperar', '/cuenta/restablecer'];
  
  // Modificado para aceptar subrutas (ej. /transsync/app no es público, pero /transsync sí)
  // El includes original era muy estricto.
  const isPublicRoute = publicRoutes.some(r => pathname === r || pathname.startsWith(r + '/') && r.includes('cuenta'));

  // Obtenemos el token de la cookie del ecosistema workspace
  const token = req.cookies.get('workspace_token');

  if (isPublicRoute) {
    // Si tiene el JWT y va al login — redirigir al hub central
    if (token && pathname === '/cuenta/login') {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/cuenta/portal';
      return NextResponse.redirect(redirectUrl);
    }
    return isRewritten ? NextResponse.rewrite(url) : NextResponse.next();
  }

  // Rutas de aplicación protegidas (ej: /transsync/app/*)
  // Si no hay token, redirigir al login único con el parámetro de redirección
  if (!token) {
    const loginUrl = req.nextUrl.clone();
    // Redirigir al dominio corporativo
    loginUrl.host = hostname.includes('transformateck.com') ? 'workspace.transformateck.com' : loginUrl.host;
    loginUrl.pathname = '/cuenta/login';
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // En una fase posterior, aquí podríamos validar el acceso por producto
  // analizando el contenido del JWT (productAccess[])
  
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
