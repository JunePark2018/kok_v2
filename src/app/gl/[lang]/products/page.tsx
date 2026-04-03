import ProductsPage from '@/components/pages/ProductsPage';

export default async function GlProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <ProductsPage lang={lang} region="gl" canPurchase={false} />;
}
