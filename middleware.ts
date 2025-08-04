import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Rutas que requieren autenticación
  const protectedRoutes = ['/profile', '/orders', '/admin'];
  
  // Verificar si la ruta actual está protegida
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );

  // Por ahora, solo redirigimos si es una ruta protegida
  // La verificación de sesión se hará del lado del cliente
  if (isProtectedRoute) {
    // Podrías agregar lógica adicional aquí si necesitas verificación del lado del servidor
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
