import ShopWorldwide from '@/components/ShopWorldwide';

export default async function KrWorldwidePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <ShopWorldwide lang={lang} />;
}
