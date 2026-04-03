import ProductDetailPage from '@/components/pages/ProductDetailPage';

export default async function KrProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  return <ProductDetailPage lang={lang} region="kr" canPurchase={true} id={id} />;
}
