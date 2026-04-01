import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex flex-col items-center justify-center bg-neutral-100 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center">
          <span className="text-neutral-400 text-sm tracking-widest uppercase font-mono">Hero Campaign Visual Background</span>
        </div>
        <div className="relative z-10 text-center px-4 w-full">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-black mb-4 drop-shadow-md">
            비워서 채운 완벽함
          </h1>
          <p className="text-sm md:text-base text-neutral-800 font-medium mb-8 max-w-md mx-auto leading-relaxed">
            가장 효과적인 자연유래 더마 성분으로 완성하는<br/>당신의 안티 그래비티 솔루션.
          </p>
          <Link href="/products" className="inline-block bg-black text-white px-8 py-3.5 text-sm font-semibold tracking-wider hover:bg-neutral-800 transition-all duration-300">
            SHOP NOW
          </Link>
        </div>
      </section>

      {/* Ingredient Categories (Abib style scroll) */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-center text-xl font-extrabold tracking-tight mb-12">성분 중심 카테고리</h2>
        <div className="flex gap-4 overflow-x-auto pb-6 snap-x hide-scrollbar justify-start md:justify-center">
          {[
            { id: 'heartleaf', label: '어성초 (Heartleaf)', sub: '진정/수분' },
            { id: 'jericho', label: '부활초 (Jericho Rose)', sub: '보습/장벽' },
            { id: 'sedum', label: '수분초 (Sedum)', sub: '수분 폭탄' },
            { id: 'glutathione', label: '글루타치온 (Glutathione)', sub: '미백/톤업' }
          ].map((item) => (
            <Link key={item.id} href={`/products?ingredient=${item.id}`} className="snap-center flex-shrink-0 w-44 md:w-56 bg-neutral-50 rounded-2xl p-6 md:p-8 text-center hover:bg-neutral-100 transition-colors border border-neutral-100 cursor-pointer group">
              <div className="w-16 h-16 mx-auto bg-white rounded-full mb-4 shadow-sm flex items-center justify-center text-xl group-hover:scale-105 transition-transform duration-500">
                🌱
              </div>
              <h3 className="font-semibold text-sm text-neutral-900">{item.label}</h3>
              <p className="text-xs text-neutral-500 mt-2">{item.sub}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="py-20 px-4 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-2xl font-bold tracking-tight">베스트셀러</h2>
            <Link href="/products" className="text-xs font-semibold underline underline-offset-4 text-neutral-500 hover:text-black transition">VIEW ALL</Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <Link href="/products/1" className="group block">
              <div className="w-full aspect-[3/4] bg-neutral-200 rounded-lg overflow-hidden relative mb-4">
                <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 z-10 tracking-widest">BEST</span>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-neutral-400 tracking-wider">어성초 (HEARTLEAF)</p>
                <h3 className="text-sm font-bold text-neutral-900 group-hover:underline underline-offset-2">어성초 약산성 클렌징 폼</h3>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-sm font-extrabold">14,000원</span>
                  <span className="text-xs text-neutral-400 line-through">20,000원</span>
                </div>
              </div>
            </Link>
            
            <Link href="/products/1" className="group block">
              <div className="w-full aspect-[3/4] bg-neutral-200 rounded-lg overflow-hidden relative mb-4"></div>
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-neutral-400 tracking-wider">부활초 (JERICHO ROSE)</p>
                <h3 className="text-sm font-bold text-neutral-900 group-hover:underline underline-offset-2">부활초 수면팩 50ml</h3>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-sm font-extrabold">25,000원</span>
                </div>
              </div>
            </Link>
            
            <Link href="/products/1" className="group block">
              <div className="w-full aspect-[3/4] bg-neutral-200 rounded-lg overflow-hidden relative mb-4">
                 <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 z-10 tracking-widest">NEW</span>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-neutral-400 tracking-wider">수분초 (SEDUM)</p>
                <h3 className="text-sm font-bold text-neutral-900 group-hover:underline underline-offset-2">수분초 히알루론 수분크림</h3>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-sm font-extrabold">22,000원</span>
                </div>
              </div>
            </Link>

            <Link href="/products/1" className="group block">
              <div className="w-full aspect-[3/4] bg-neutral-200 rounded-lg overflow-hidden relative mb-4"></div>
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-neutral-400 tracking-wider">어성초 (HEARTLEAF)</p>
                <h3 className="text-sm font-bold text-neutral-900 group-hover:underline underline-offset-2">어성초 77 진정 패드</h3>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-sm font-extrabold">16,000원</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
