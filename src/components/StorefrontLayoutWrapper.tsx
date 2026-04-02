'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StorefrontLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // These routes have their own layouts and don't need the global header/footer
  const isAdmin = pathname.startsWith('/admin');
  const isAuth = pathname.startsWith('/login') || pathname.startsWith('/register');
  // /kr/* and /gl/* routes have their own layouts via the route group layout files
  const isRegionRoute = pathname.startsWith('/kr/') || pathname.startsWith('/gl/');

  if (isAdmin || isAuth || isRegionRoute) return <>{children}</>;

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <main className="flex-1 w-full bg-white">{children}</main>
    </div>
  );
}
