import ProductsPage from '@/components/pages/ProductsPage';

export default async function GlProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string; category?: string; sub?: string }>;
}) {
  const { lang } = await params;
  const { q, category, sub } = await searchParams;
  return <ProductsPage lang={lang} region="gl" canPurchase={false} searchQuery={q} categorySlug={category} subSlug={sub} />;
}
