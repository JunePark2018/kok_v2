import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Valid language codes
const VALID_LANGS = ['kr', 'en'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get geo country from Vercel Edge header
  // In local dev this is absent → default to 'KR' for easy testing
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  const country = vercelCountry || 'KR';
  const defaultRegion = country === 'KR' ? 'kr' : 'gl';
  const defaultLang = country === 'KR' ? 'kr' : 'en';

  // Build base response with country header forwarded
  const response = NextResponse.next();
  response.headers.set('x-user-country', country);

  // --- Skip redirect for auth / admin pages ---
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/kr/') ||
    pathname.startsWith('/gl/')
  ) {
    // Admin gating
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

  // --- Geo-routing: Redirect root "/" and legacy paths ---
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultRegion}/${defaultLang}`, request.url));
  }

  // Redirect old /products/* paths → /<region>/<lang>/products/*
  if (pathname.startsWith('/products')) {
    const rest = pathname.replace('/products', '');
    return NextResponse.redirect(new URL(`/${defaultRegion}/${defaultLang}/products${rest}${request.nextUrl.search}`, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
