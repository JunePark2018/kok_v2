import Link from 'next/link';
import { Filter } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/api/products';

// i18n labels
const labels: Record<string, {
  title: string; sub: string; all: string; heartleaf: string;
  jericho: string; sedum: string; count: string; filter: string;
}> = {
  kr: { title: 'SHOP ALL', sub: '모든 제품을 성분별로 한눈에 확인하세요.', all: '전체', heartleaf: '어성초 스킨케어', jericho: '부활초 스킨케어', sedum: '수분초 라인', count: '총 {n}개의 상품', filter: '필터 및 정렬' },
  en: { title: 'SHOP ALL', sub: 'Browse all products by ingredient.', all: 'All', heartleaf: 'Heartleaf Skincare', jericho: 'Jericho Rose Skincare', sedum: 'Sedum Line', count: '{n} Products', filter: 'Filter & Sort' },
  cn: { title: '全部商品', sub: '按成分浏览所有产品。', all: '全部', heartleaf: '鱼腥草护肤', jericho: '耶利哥玫瑰护肤', sedum: '景天系列', count: '共 {n} 件商品', filter: '筛选与排序' },
  jp: { title: '全商品', sub: '成分別に全商品をご覧ください。', all: 'すべて', heartleaf: 'ドクダミスキンケア', jericho: 'エリコの花スキンケア', sedum: 'セダムライン', count: '全 {n} 件', filter: 'フィルター＆ソート' },
  vn: { title: 'TẤT CẢ SẢN PHẨM', sub: 'Duyệt tất cả sản phẩm theo thành phần.', all: 'Tất Cả', heartleaf: 'Dưỡng Da Diếp Cá', jericho: 'Dưỡng Da Hoa Jericho', sedum: 'Dòng Sedum', count: '{n} Sản Phẩm', filter: 'Lọc & Sắp Xếp' },
  th: { title: 'สินค้าทั้งหมด', sub: 'เลือกสินค้าตามส่วนผสม', all: 'ทั้งหมด', heartleaf: 'สกินแคร์พลูคาว', jericho: 'สกินแคร์เจริโค', sedum: 'ไลน์เซดัม', count: 'สินค้าทั้งหมด {n} รายการ', filter: 'กรอง & เรียงลำดับ' },
};

interface Props {
  lang: string;
  region: 'kr' | 'gl';
  canPurchase: boolean;
}

export default async function ProductsPage({ lang, region, canPurchase }: Props) {
  const lb = labels[lang] ?? labels['en'];

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-neutral-100 pb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">{lb.title}</h1>
          <p className="text-sm text-neutral-500">{lb.sub}</p>
        </div>
        <div className="mt-6 md:mt-0 flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Link href={`/${region}/${lang}/products`} className="px-5 py-2 rounded-full bg-black text-white text-xs font-semibold whitespace-nowrap">{lb.all}</Link>
          <Link href={`/${region}/${lang}/products?ingredient=heartleaf`} className="px-5 py-2 rounded-full bg-white border border-neutral-200 text-neutral-600 text-xs font-semibold hover:bg-neutral-50 transition whitespace-nowrap">{lb.heartleaf}</Link>
          <Link href={`/${region}/${lang}/products?ingredient=jericho`} className="px-5 py-2 rounded-full bg-white border border-neutral-200 text-neutral-600 text-xs font-semibold hover:bg-neutral-50 transition whitespace-nowrap">{lb.jericho}</Link>
          <Link href={`/${region}/${lang}/products?ingredient=sedum`} className="px-5 py-2 rounded-full bg-white border border-neutral-200 text-neutral-600 text-xs font-semibold hover:bg-neutral-50 transition whitespace-nowrap">{lb.sedum}</Link>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <span className="text-sm font-medium text-neutral-500">
          {lb.count.replace('{n}', String(activeProducts.length))}
        </span>
        <button className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-black transition">
          <Filter className="w-3.5 h-3.5" /> {lb.filter}
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {formattedProducts.map(p => (
          <ProductCard key={p.id} {...p} canPurchase={canPurchase} />
        ))}
      </div>
    </div>
  );
}
