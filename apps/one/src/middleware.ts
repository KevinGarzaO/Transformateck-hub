import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Rutas públicas en One
  const publicRoutes = ['/', '/avocado', '/specforge', '/cuenta/login', '/cuenta/registro'];
  const isPublicRoute = publicRoutes.some(r => pathname === r || pathname.startsWith(r + '/'));

  // Token para el ecosistema One
  const token = req.cookies.get('one_token');

  if (isPublicRoute) {
    if (token && pathname === '/cuenta/login') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Rutas protegidas de las apps (avocado/app, specforge/app)
  if (!token) {
    url.pathname = '/cuenta/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.next();
    // En producción usaríamos redirect:
    // return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
