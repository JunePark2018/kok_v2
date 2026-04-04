import MyPage from '@/components/pages/MyPage';

export default async function GlMyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <MyPage lang={lang} region="gl" />;
}
