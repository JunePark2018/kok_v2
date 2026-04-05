import MenuPage from '@/components/pages/MenuPage';

export default async function GlMenuPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { lang, slug } = await params;
  const { page } = await searchParams;
  return <MenuPage slug={slug} lang={lang} region="gl" page={page} />;
}
