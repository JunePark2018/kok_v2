import ProductDetailPage from '@/components/pages/ProductDetailPage';

export default async function GlProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  return <ProductDetailPage lang={lang} region="gl" canPurchase={false} id={id} />;
}
