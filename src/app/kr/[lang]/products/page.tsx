import ProductsPage from '@/components/pages/ProductsPage';

export default async function KrProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { lang } = await params;
  const { q } = await searchParams;
  return <ProductsPage lang={lang} region="kr" canPurchase={true} searchQuery={q} />;
}
