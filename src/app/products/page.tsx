import Link from 'next/link';
import { Filter } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/api/products';

export default async function ProductsList() {
  const allProducts = await getProducts();
  const activeProducts = allProducts.filter(p => p.is_active);

  // Calculate discount rates on the fly to match frontend props
  const calculateDiscount = (price: number, original: number) => {
    if (original > price) return Math.round(((original - price) / original) * 100);
    return 0;
  };

  const formattedProducts = activeProducts.map(p => ({
    id: p.id,
    name: p.name,
    summary: p.summary,
    price: p.price,
    originalPrice: p.originalPrice,
    discountRate: calculateDiscount(p.price, p.originalPrice),
    imageUrl: p.imageUrl
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-neutral-100 pb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">SHOP ALL</h1>
          <p className="text-sm text-neutral-500">모든 제품을 성분별로 한눈에 확인하세요.</p>
        </div>
        
        <div className="mt-6 md:mt-0 flex gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto pb-2 md:pb-0">
           <Link href="/products" className="px-5 py-2 rounded-full bg-black text-white text-xs font-semibold whitespace-nowrap">전체</Link>
           <Link href="/products?ingredient=heartleaf" className="px-5 py-2 rounded-full bg-white border border-neutral-200 text-neutral-600 text-xs font-semibold hover:bg-neutral-50 transition whitespace-nowrap">어성초 스킨케어</Link>
           <Link href="/products?ingredient=jericho" className="px-5 py-2 rounded-full bg-white border border-neutral-200 text-neutral-600 text-xs font-semibold hover:bg-neutral-50 transition whitespace-nowrap">부활초 스킨케어</Link>
           <Link href="/products?ingredient=sedum" className="px-5 py-2 rounded-full bg-white border border-neutral-200 text-neutral-600 text-xs font-semibold hover:bg-neutral-50 transition whitespace-nowrap">수분초 라인</Link>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <span className="text-sm font-medium text-neutral-500">총 {activeProducts.length}개의 상품</span>
        <button className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-black transition">
          <Filter className="w-3.5 h-3.5" /> 필터 및 정렬
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {formattedProducts.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
