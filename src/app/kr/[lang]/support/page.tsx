import MenuPage from '@/components/pages/MenuPage';

export default async function KrSupportPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { lang } = await params;
  const { page } = await searchParams;
  return <MenuPage slug="support" lang={lang} region="kr" page={page} />;
}
