import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  // Update session and protect /admin routes using Supabase
  let { supabaseResponse } = await updateSession(request);

  // Vercel Edge automatically injects the 'x-vercel-ip-country' header
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  const country = vercelCountry || 'US'; // Default to global US

  // Next.js middleware returns the modified response headers
  supabaseResponse.headers.set('x-user-country', country);

  // Custom Admin Gating Logic
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const hasMockCookie = request.cookies.has('kokkok_admin_auth');
    const hasSupabaseCookie = Array.from(request.cookies.getAll()).some(c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'));
    
    if (!hasMockCookie && !hasSupabaseCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
