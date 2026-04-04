import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLang } from '@/lib/i18n/types';
import { I18nProvider } from '@/lib/i18n/context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import PromoBanner from '@/components/PromoBanner';

export const metadata: Metadata = {
  title: 'Kokkok Garden — Global',
  description: 'Discover premium Korean skincare from Kokkok Garden. Heartleaf, Jericho Rose, and Sedum collection.',
};

export default async function GlLangLayout({
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
    <I18nProvider region="gl" lang={lang}>
      <div className="flex flex-col min-h-screen font-sans">
        <PromoBanner />
        <Header canPurchase={false} region="gl" />
        <main className="flex-1 w-full bg-white">{children}</main>
        <Footer />
        {/* AI Chatbot — Global only */}
        <AIChatbot />
      </div>
    </I18nProvider>
  );
}
