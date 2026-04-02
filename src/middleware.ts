import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // If user is trying to access /admin routes directly
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for our custom auth cookie
    const hasAuthCookie = request.cookies.has('kokkok_admin_auth');
    
    // If not authenticated, permanently redirect to /login
    if (!hasAuthCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Otherwise continue normally
  return NextResponse.next();
}

// Ensure the middleware only runs on specific routes to save performance
export const config = {
  matcher: '/admin/:path*',
};
