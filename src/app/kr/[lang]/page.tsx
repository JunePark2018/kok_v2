import HeroSlider from '@/components/HeroSlider';
import ProductGrid from '@/components/ProductGrid';
import ShortsFeed from '@/components/ShortsFeed';
import { createClient } from '@supabase/supabase-js';
import { getProducts } from '@/lib/api/products';
import type { Lang } from '@/lib/i18n/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const FALLBACK_YT_IDS = ['ho0EhuO3RNs', 'lD1VId0ec2s', 'mkBTUDxMKtU', 'yPRcriD4FcM'];

const SECTION_TITLES: Record<string, { weeklyBest: string; newArrivals: string }> = {
  kr: { weeklyBest: '이번주 베스트', newArrivals: '신상품' },
  en: { weeklyBest: 'WEEKLY BEST', newArrivals: 'NEW ARRIVALS' },
  cn: { weeklyBest: '本周精选', newArrivals: '新品上架' },
  jp: { weeklyBest: '今週のベスト', newArrivals: '新着商品' },
  vn: { weeklyBest: 'BÁN CHẠY TUẦN NÀY', newArrivals: 'SẢN PHẨM MỚI' },
  th: { weeklyBest: 'ยอดนิยมประจำสัปดาห์', newArrivals: 'สินค้าใหม่' },
};

export default async function KrHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const titles = SECTION_TITLES[lang] ?? SECTION_TITLES['en'];

  const allProducts = await getProducts();
  const activeProducts = allProducts.filter(p => p.is_active);

  const calculateDiscount = (price: number, original: number) =>
    original > price ? Math.round(((original - price) / original) * 100) : 0;

  const formattedProducts = activeProducts.map(p => ({
    id: p.id,
    name: p.name,
    summary: p.summary,
    price: p.price,
    originalPrice: p.originalPrice,
    discountRate: calculateDiscount(p.price, p.originalPrice),
    imageUrl: p.imageUrl,
  }));

  // Split into two grids: first half as "best", second half (reversed) as "new arrivals"
  const half = Math.ceil(formattedProducts.length / 2);
  const bestProducts = formattedProducts.slice(0, Math.max(half, 4));
  const newProducts = [...formattedProducts].reverse().slice(0, Math.max(half, 4));

  let liveShorts: string[] = [];
  try {
    if (supabase) {
      const { data, error } = await supabase.from('shorts').select('youtube_id').order('created_at', { ascending: false }).limit(10);
      if (!error && data && data.length > 0) {
        liveShorts = data.map(d => `https://www.youtube.com/embed/${d.youtube_id}`);
      }
    }
  } catch { /* use fallback */ }

  const finalShorts = liveShorts.length > 0
    ? liveShorts
    : FALLBACK_YT_IDS.map(id => `https://www.youtube.com/embed/${id}`);

  return (
    <div className="animate-in fade-in duration-700">
      <HeroSlider lang={lang as Lang} />
      <ProductGrid title={titles.weeklyBest} products={bestProducts} canPurchase={true} />
      <ProductGrid title={titles.newArrivals} products={newProducts} canPurchase={true} />
      <ShortsFeed shorts={finalShorts} />
    </div>
  );
}
