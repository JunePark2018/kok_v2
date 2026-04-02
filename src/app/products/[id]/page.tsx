import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductActionButtons from '@/components/ProductActionButtons';

// Mock Product Catalog matching the homepage IDs
const PROD_CATALOG: Record<string, any> = {
  "1": {
    name: "레티놀 바운스 세럼",
    summary: "끈적임없이 촉촉한 기능성 세럼",
    price: 23400,
    originalPrice: 26000,
    imageUrl: "https://plus.unsplash.com/premium_photo-1681996500858-ff9cc3f28203?w=800&q=80&auto=format&fit=crop",
    ingredient: "RETINOL",
    description: "순수 레티놀을 안정화하여 민감한 피부도 안심하고 사용할 수 있는 데일리 기능성 탄력 세럼입니다. 탱탱한 마무리감을 선사합니다."
  },
  "2": {
    name: "EGF 글로우 젤리 세럼",
    summary: "탱글한 젤리로 피부 탄성 회복 케어",
    price: 23400,
    originalPrice: 26000,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80&auto=format&fit=crop",
    ingredient: "EGF & PEPTIDE",
    description: "고순도 EGF 성분이 피부 본연의 힘을 길러주고, 촉촉한 젤리 제형이 빈틈없이 수분을 채워줍니다."
  },
  "3": {
    name: "액티브 리커버리 크림",
    summary: "트러블 부터 자극 진정까지 하나로!",
    price: 23400,
    originalPrice: 26000,
    imageUrl: "https://plus.unsplash.com/premium_photo-1675842663249-a8b70126afbc?w=800&q=80&auto=format&fit=crop",
    ingredient: "CICA & PANTHENOL",
    description: "시카와 판테놀이 배합되어 예민해진 피부를 빠르게 진정시키고 장벽을 탄탄하게 회복시켜 줍니다."
  },
  "4": {
    name: "퓨어 클렌징 오일",
    summary: "블랙헤드를 녹이는 클렌징 오일",
    price: 26000,
    originalPrice: 38000,
    imageUrl: "https://images.unsplash.com/photo-1608248593842-b062b0afdf93?w=800&q=80&auto=format&fit=crop",
    ingredient: "JOJOBA OIL",
    description: "부드럽게 롤링되어 모공 속 화이트헤드와 블랙헤드를 깨끗하게 녹여내는 산뜻한 포뮬러의 클렌징 오일입니다."
  }
};

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Resolve base id if it's a "NEW " appended item from homepage
  const baseId = id.replace('_new', '');
  const productData = PROD_CATALOG[baseId];

  if (!productData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-neutral-500 tracking-widest text-sm">PRODUCT NOT FOUND</p>
      </div>
    );
  }

  const name = id.includes('_new') ? 'NEW ' + productData.name : productData.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 animate-in fade-in duration-500 bg-white">
      {/* Breadcrumb */}
      <div className="flex items-center text-[11px] font-semibold text-neutral-400 mb-10 tracking-widest">
        <Link href="/" className="hover:text-black transition-colors">HOME</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <Link href="/products" className="hover:text-black transition-colors">SHOP</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <span className="text-[#111111]">{productData.ingredient}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Product Image Gallery Block */}
        <div className="space-y-4">
          <div className="w-full aspect-[5/6] bg-[#f8f8f8] flex items-center justify-center overflow-hidden relative">
            <div className={`absolute left-4 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded z-20 font-mono backdrop-blur-sm ${id.includes('_new') ? 'top-12' : 'top-4'}`}>
              Target: 1000x1200 (5:6)
            </div>
            {id.includes('_new') && (
              <span className="absolute top-4 left-4 bg-[#111111] text-white text-[10px] font-bold px-2 py-1 tracking-widest z-10">NEW</span>
            )}
            <img src={productData.imageUrl} alt={name} className="w-full h-full object-cover mix-blend-multiply" />
          </div>
        </div>

        {/* Product Info Block */}
        <div className="flex flex-col pt-4">
          <p className="text-[11px] font-bold tracking-widest text-neutral-400 mb-3 uppercase">{productData.ingredient}</p>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111111] mb-4">{name}</h1>
          <p className="text-neutral-500 text-sm font-medium mb-8 leading-relaxed">
            {productData.summary}
          </p>
          
          <div className="flex items-end gap-3 mb-10 pb-8 border-b border-neutral-100">
            {productData.originalPrice > productData.price && (
              <span className="text-[#111111] font-bold text-lg mb-0.5 tracking-tight">{Math.round((productData.originalPrice - productData.price) / productData.originalPrice * 100)}%</span>
            )}
            <span className="text-3xl font-extrabold tracking-tight text-[#111111]">{productData.price.toLocaleString()}<span className="text-xl font-bold ml-1">원</span></span>
            {productData.originalPrice > productData.price && (
              <span className="text-neutral-400 line-through text-sm font-medium mb-1 ml-1">{productData.originalPrice.toLocaleString()}원</span>
            )}
          </div>
          
          <div className="space-y-6">
            <h3 className="text-[12px] font-bold tracking-widest text-[#111111]">PRODUCT DETAILS</h3>
            <p className="text-neutral-600 text-[14px] leading-loose break-keep">
              {productData.description}
            </p>
          </div>

          <ProductActionButtons productId={id} price={productData.price} />
        </div>
      </div>
      
      {/* Brand Story Details Below via long-scroll */}
      <div className="mt-32 pt-20 border-t border-neutral-100 text-center">
        <h2 className="text-xl font-extrabold tracking-widest mb-16 uppercase">Detail view</h2>
        <div className="w-full max-w-4xl mx-auto aspect-video bg-[#f8f8f8] flex items-center flex-col justify-center text-neutral-400 text-sm space-y-4 relative">
           <div className="absolute top-4 left-4 bg-black/70 text-white text-[10px] px-2 py-1 rounded z-10 font-mono backdrop-blur-sm">
              Target: 1920x1080 (16:9)
           </div>
           <span className="tracking-widest text-[11px] font-semibold">Premium Visuals Placeholder</span>
        </div>
      </div>
    </div>
  );
}
