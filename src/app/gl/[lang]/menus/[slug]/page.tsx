import MenuPage from '@/components/pages/MenuPage';

export default async function GlMenuPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  return <MenuPage slug={slug} lang={lang} region="gl" />;
}
