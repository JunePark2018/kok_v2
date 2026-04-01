import Link from 'next/link';
import { ArrowLeft, ExternalLink, Share2, Heart } from 'lucide-react';

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = {
    id: id,
    name: '어성초 약산성 클렌징 폼 150ml',
    ingredient: '어성초 (HEARTLEAF)',
    price: 14000,
    originalPrice: 20000,
    naver_store_url: 'https://smartstore.naver.com/',
    description: '어성초 추출물이 듬뿍 담겨 피부 진정과 노폐물 제거를 동시에 도와주는 밀도 높은 거품 클렌저입니다. 조밀하고 탄력 있는 미세 거품이 모공 속까지 개운하게 세정해줍니다.'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 animate-in fade-in duration-500 bg-white">
      <Link href="/products" className="inline-flex items-center text-xs font-semibold text-neutral-500 hover:text-black mb-10 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> 전체 상품으로 돌아가기
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Product Image Gallery Block */}
        <div className="space-y-4">
          <div className="w-full aspect-[4/5] bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-300 border border-neutral-100 font-mono text-sm">
            상품 메인 이미지 (Placeholder)
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="aspect-square bg-neutral-50 rounded-xl border border-neutral-100"></div>
            <div className="aspect-square bg-neutral-50 rounded-xl border border-neutral-100"></div>
            <div className="aspect-square bg-neutral-50 rounded-xl border border-neutral-100"></div>
            <div className="aspect-square bg-neutral-50 rounded-xl border border-neutral-100"></div>
          </div>
        </div>

        {/* Product Info Block */}
        <div className="flex flex-col pt-4">
          <p className="text-[11px] font-bold tracking-widest text-neutral-400 mb-3">{product.ingredient}</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950 mb-4">{product.name}</h1>
          
          <div className="flex items-end gap-3 mb-8">
            <span className="text-3xl font-extrabold">{product.price.toLocaleString()}원</span>
            {product.originalPrice && (
              <>
                <span className="text-neutral-400 line-through text-sm font-medium mb-1">{product.originalPrice.toLocaleString()}원</span>
                <span className="text-red-500 font-bold text-lg mb-0.5">30% OFF</span>
              </>
            )}
          </div>
          
          {/* New Member USP Banner embedded in PDP */}
          <div className="bg-neutral-50 border border-neutral-200/60 rounded-xl p-5 mb-8 flex items-start gap-4">
            <div className="bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded tracking-wider mt-0.5">BENEFIT</div>
            <p className="text-sm text-neutral-700 leading-relaxed font-medium">신규 가입 시 <strong className="text-black">15% 추가 할인 쿠폰</strong> 증정<br/><span className="text-neutral-500 text-xs">가입 후 즉시 사용 가능합니다.</span></p>
          </div>

          <p className="text-neutral-600 text-sm leading-loose mb-12">
            {product.description}
          </p>

          <div className="mt-auto pt-8 border-t border-neutral-100 space-y-4">
            <div className="flex gap-3">
              <a 
                href={product.naver_store_url} 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
              >
                네이버스토어 구매하기 <ExternalLink className="w-4 h-4 ml-1" />
              </a>
              <button className="w-14 h-14 border border-neutral-200 rounded-xl flex items-center justify-center hover:bg-neutral-50 transition-colors">
                <Heart className="w-5 h-5 text-neutral-400" />
              </button>
              <button className="w-14 h-14 border border-neutral-200 rounded-xl flex items-center justify-center hover:bg-neutral-50 transition-colors">
                <Share2 className="w-5 h-5 text-neutral-400" />
              </button>
            </div>
            <p className="text-xs text-center text-neutral-400 font-medium pt-2">결제 및 배송은 네이버 공식 스토어를 통해 안전하게 진행됩니다.</p>
          </div>
        </div>
      </div>
      
      {/* Brand Story Details Below via long-scroll */}
      <div className="mt-24 pt-20 border-t border-neutral-100 text-center">
        <h2 className="text-xl font-extrabold tracking-tight mb-12">상세정보</h2>
        <div className="w-full max-w-4xl mx-auto aspect-[4/10] bg-neutral-50 rounded-2xl flex items-center flex-col justify-center text-neutral-400 border border-neutral-100 font-mono text-sm space-y-4">
           <span>Abib/Anua Style Detail Layout</span>
           <span className="text-xs text-neutral-300">(Long scroll storytelling content mapped here)</span>
        </div>
      </div>
    </div>
  );
}
