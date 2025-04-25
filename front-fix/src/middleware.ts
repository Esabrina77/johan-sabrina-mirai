import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const user = request.cookies.get('user')?.value;

  // Si l'utilisateur est sur une page d'auth et est déjà connecté
  if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        const redirectPath = userData.role === 'freelancer' ? '/freelancer/dashboard' : '/company/dashboard';
        return NextResponse.redirect(new URL(redirectPath, request.url));
      } catch {
        
        // Si le parsing échoue, on supprime les cookies invalides
        const response = NextResponse.next();
        response.cookies.delete('token');
        response.cookies.delete('user');
        return response;
      }
    }
    return NextResponse.next();
  }

  // Protection des routes dashboard
  if (request.nextUrl.pathname.includes('/dashboard')) {
    if (!token || !user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const userData = JSON.parse(user);
      const isFreelancerPath = request.nextUrl.pathname.startsWith('/freelancer');
      const isCompanyPath = request.nextUrl.pathname.startsWith('/company');

      if ((isFreelancerPath && userData.role !== 'freelancer') || 
          (isCompanyPath && userData.role !== 'company')) {
        const correctPath = userData.role === 'freelancer' ? '/freelancer/dashboard' : '/company/dashboard';
        return NextResponse.redirect(new URL(correctPath, request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/freelancer/:path*',
    '/company/:path*',
  ],
}; 