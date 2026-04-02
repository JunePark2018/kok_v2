import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get geo country from Vercel Edge header (only present on Vercel prod)
  // In local dev this header is absent, so we default to 'KR' for testing
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  const country = vercelCountry || 'KR'; // 'KR' default for local dev

  // Build base response with country header forwarded
  const response = NextResponse.next();
  response.headers.set('x-user-country', country);

  // --- Geo-routing: Redirect root "/" based on country ---
  if (pathname === '/') {
    const targetUrl = country === 'KR'
      ? new URL('/kr/kr', request.url)
      : new URL('/gl/en', request.url);
    return NextResponse.redirect(targetUrl);
  }

  // --- Admin gating with cookie-based auth ---
  if (pathname.startsWith('/admin')) {
    const hasMockCookie = request.cookies.has('kokkok_admin_auth');
    const hasSupabaseCookie = Array.from(request.cookies.getAll()).some(
      c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
    );
    
    if (!hasMockCookie && !hasSupabaseCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
