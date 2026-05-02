import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Rutas públicas — no necesitan auth
  const publicRoutes = ['/', '/transsync', '/inventarios', '/cuenta/login', '/cuenta/registro', '/cuenta/recuperar', '/cuenta/restablecer'];
  
  const isPublicRoute = publicRoutes.includes(pathname);

  // Obtenemos el token de la cookie del ecosistema workspace
  const token = req.cookies.get('workspace_token');

  if (isPublicRoute) {
    // Si tiene el JWT y va al login — redirigir al hub central
    if (token && pathname === '/cuenta/login') {
      url.pathname = '/cuenta/portal';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Rutas de aplicación protegidas (ej: /transsync/app/*)
  // Si no hay token, redirigir al login único con el parámetro de redirección
  if (!token) {
    url.pathname = '/cuenta/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // En una fase posterior, aquí podríamos validar el acceso por producto
  // analizando el contenido del JWT (productAccess[])
  
  return NextResponse.next();
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
