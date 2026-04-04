import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLang, isValidRegion } from '@/lib/i18n/types';
import { I18nProvider } from '@/lib/i18n/context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoBanner from '@/components/PromoBanner';
import PageTracker from '@/components/PageTracker';

export const metadata: Metadata = {
  title: 'Kokkok Garden — Korea',
  description: 'Premium Korean Skincare — Shop Heartleaf, Jericho Rose, and Sedum skincare.',
};

export default async function KrLangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  return (
    <I18nProvider region="kr" lang={lang}>
      <div className="flex flex-col min-h-screen font-sans">
        <PromoBanner />
        <Header canPurchase={true} region="kr" />
        <main className="flex-1 w-full bg-white">{children}</main>
        <Footer />
        <PageTracker />
      </div>
    </I18nProvider>
  );
}
