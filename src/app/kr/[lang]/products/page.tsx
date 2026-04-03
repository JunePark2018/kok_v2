import ProductsPage from '@/components/pages/ProductsPage';

export default async function KrProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <ProductsPage lang={lang} region="kr" canPurchase={true} />;
}
