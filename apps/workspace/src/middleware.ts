import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Rutas públicas — no necesitan auth
  // Incluimos las landings de productos específicos y el login
  const publicRoutes = ['/', '/transsync', '/inventarios', '/login'];
  
  const isPublicRoute = publicRoutes.some(r => pathname === r || pathname.startsWith(r + '/'));

  // Obtenemos el token de la cookie del ecosistema workspace
  const token = req.cookies.get('workspace_token');

  if (isPublicRoute) {
    // Si tiene el JWT y va al login — redirigir al hub central
    if (token && pathname === '/login') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Rutas de aplicación protegidas (ej: /transsync/app/*)
  // Si no hay token, redirigir al login único con el parámetro de redirección
  if (!token) {
    url.pathname = '/login';
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
