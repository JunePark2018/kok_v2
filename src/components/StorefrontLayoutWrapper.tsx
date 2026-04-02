'use client';

import { usePathname } from 'next/navigation';
import PromoBanner from '@/components/PromoBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StorefrontLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Bypass global headers/footers for Admin CMS and Login routes
  const isAdmin = pathname.startsWith('/admin') || pathname.startsWith('/login');

  if (isAdmin) return <>{children}</>;

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <PromoBanner />
      <Header />
      <main className="flex-1 w-full bg-white">{children}</main>
      <Footer />
    </div>
  );
}
