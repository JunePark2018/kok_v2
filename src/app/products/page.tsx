import Link from 'next/link';
import { Filter } from 'lucide-react';

export default function ProductsList() {
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
        <span className="text-sm font-medium text-neutral-500">총 12개의 상품</span>
        <button className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-black transition">
          <Filter className="w-3.5 h-3.5" /> 필터 및 정렬
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {[1,2,3,4,5,6].map((idx) => (
          <Link key={idx} href="/products/1" className="group block">
            <div className="w-full aspect-[5/6] bg-neutral-100 rounded-lg overflow-hidden relative mb-4 flex items-center justify-center transition-opacity group-hover:opacity-90">
              <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded z-20 font-mono backdrop-blur-sm">
                 Target: 1000x1200 (5:6)
              </div>
              {idx === 1 && <span className="absolute top-8 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 z-10 tracking-widest">BEST</span>}
              <span className="text-neutral-300 text-xs text-center px-4 font-mono">Product Visual {idx}</span>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-[11px] font-semibold text-neutral-400 tracking-wider">어성초 (HEARTLEAF)</p>
              <h3 className="text-sm font-bold text-neutral-900 group-hover:underline underline-offset-2">어성초 약산성 클렌징 폼 {idx}</h3>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-sm font-extrabold">14,000원</span>
                {idx === 1 && <span className="text-[10px] text-red-500 border border-red-500 px-1 rounded font-bold">30%</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
