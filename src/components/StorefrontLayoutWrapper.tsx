'use client';

import { usePathname } from 'next/navigation';
import PromoBanner from '@/components/PromoBanner';
import Header from '@/components/Header';

export default function StorefrontLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Bypass global headers/footers for Admin CMS and Login routes
  const isAdmin = pathname.startsWith('/admin') || pathname.startsWith('/login');

  if (isAdmin) return <>{children}</>;

  return (
    <div className="flex flex-col min-h-screen">
      <PromoBanner />
      <Header />
      <main className="flex-1 w-full bg-white">{children}</main>
      <footer className="bg-neutral-50 border-t border-neutral-100 py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-neutral-400">
          <p className="mb-2 font-medium text-neutral-800 tracking-wider">KOKKOK GARDEN</p>
          <p>1688-9407 | AM 10:00 - PM 17:00 | KOREA</p>
          <p className="mt-6 opacity-50">© 2026 Kokkok Garden (Anti-Gravity Architecture). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
