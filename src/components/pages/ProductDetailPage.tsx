import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductActionButtons from '@/components/ProductActionButtons';
import { getProducts } from '@/lib/api/products';

const labels: Record<string, {
  home: string; shop: string; details: string; notFound: string;
  detailView: string; unavailable: string; visitKr: string;
}> = {
  kr: { home: '홈', shop: '상품', details: '상품 상세', notFound: '상품을 찾을 수 없습니다', detailView: '상품 상세', unavailable: '', visitKr: '' },
  en: { home: 'HOME', shop: 'SHOP', details: 'PRODUCT DETAILS', notFound: 'PRODUCT NOT FOUND', detailView: 'DETAIL VIEW', unavailable: 'This product is available for purchase in South Korea only.', visitKr: 'Visit Korean Store →' },
  cn: { home: '首页', shop: '商店', details: '商品详情', notFound: '未找到商品', detailView: '商品详细图片', unavailable: '此产品仅在韩国销售。', visitKr: '访问韩国商店 →' },
  jp: { home: 'ホーム', shop: 'ショップ', details: '商品詳細', notFound: '商品が見つかりません', detailView: '詳細画像', unavailable: 'この商品は韓国のみでご購入いただけます。', visitKr: '韓国ストアへ →' },
  vn: { home: 'TRANG CHỦ', shop: 'CỬA HÀNG', details: 'CHI TIẾT SẢN PHẨM', notFound: 'KHÔNG TÌM THẤY SẢN PHẨM', detailView: 'ẢNH CHI TIẾT', unavailable: 'Sản phẩm này chỉ có thể mua tại Hàn Quốc.', visitKr: 'Đến Cửa Hàng Hàn Quốc →' },
  th: { home: 'หน้าหลัก', shop: 'ร้านค้า', details: 'รายละเอียดสินค้า', notFound: 'ไม่พบสินค้า', detailView: 'ภาพรายละเอียด', unavailable: 'สินค้านี้วางจำหน่ายในเกาหลีใต้เท่านั้น', visitKr: 'ไปที่ร้านค้าเกาหลี →' },
};

interface Props {
  lang: string;
  region: 'kr' | 'gl';
  canPurchase: boolean;
  id: string;
}

export default async function ProductDetailPage({ lang, region, canPurchase, id }: Props) {
  const lb = labels[lang] ?? labels['en'];

  const allProducts = await getProducts();
  const productData = allProducts.find(p => p.id === id);

  if (!productData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-neutral-500 tracking-widest text-sm">{lb.notFound}</p>
        <Link href={`/${region}/${lang}/products`} className="text-xs font-bold tracking-widest underline underline-offset-4 hover:text-black transition-colors">
          ← {lb.shop}
        </Link>
      </div>
    );
  }

  const discountPct = productData.originalPrice > productData.price
    ? Math.round((productData.originalPrice - productData.price) / productData.originalPrice * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 animate-in fade-in duration-500 bg-white">
      {/* Breadcrumb */}
      <div className="flex items-center text-[11px] font-semibold text-neutral-400 mb-10 tracking-widest flex-wrap gap-y-1">
        <Link href={`/${region}/${lang}`} className="hover:text-black transition-colors">{lb.home}</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <Link href={`/${region}/${lang}/products`} className="hover:text-black transition-colors">{lb.shop}</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <span className="text-[#111111]">{productData.ingredient || productData.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="w-full aspect-[5/6] bg-[#f8f8f8] flex items-center justify-center overflow-hidden">
            {productData.imageUrl ? (
              <img
                src={productData.imageUrl}
                alt={productData.name}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            ) : (
              <div className="text-neutral-300 text-sm tracking-widest">NO IMAGE</div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col pt-4">
          {productData.ingredient && (
            <p className="text-[11px] font-bold tracking-widest text-neutral-400 mb-3 uppercase">{productData.ingredient}</p>
          )}
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#111111] mb-4">{productData.name}</h1>
          <p className="text-neutral-500 text-sm font-medium mb-8 leading-relaxed">{productData.summary}</p>
          
          <div className="flex items-end gap-3 mb-10 pb-8 border-b border-neutral-100">
            {discountPct > 0 && (
              <span className="text-[#f15a24] font-bold text-lg mb-0.5 tracking-tight">{discountPct}%</span>
            )}
            <span className="text-3xl font-extrabold tracking-tight text-[#111111]">
              {productData.price.toLocaleString()}<span className="text-xl font-bold ml-1">원</span>
            </span>
            {productData.originalPrice > productData.price && (
              <span className="text-neutral-400 line-through text-sm font-medium mb-1 ml-1">
                {productData.originalPrice.toLocaleString()}원
              </span>
            )}
          </div>
          
          {productData.description && (
            <div className="space-y-4 mb-8">
              <h3 className="text-[12px] font-bold tracking-widest text-[#111111]">{lb.details}</h3>
              <p className="text-neutral-600 text-[14px] leading-loose break-keep">{productData.description}</p>
            </div>
          )}

          {canPurchase ? (
            <ProductActionButtons productId={id} price={productData.price} />
          ) : lb.unavailable ? (
            <div className="pt-8 mt-8 border-t border-neutral-100 space-y-4">
              <p className="text-sm text-neutral-500">{lb.unavailable}</p>
              <Link
                href="/kr/kr"
                className="inline-block bg-[#111111] text-white px-6 py-3 text-xs font-bold tracking-widest hover:bg-black transition-colors"
              >
                {lb.visitKr}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
      
      {/* Detail image placeholder */}
      <div className="mt-24 pt-16 border-t border-neutral-100 text-center">
        <h2 className="text-lg font-extrabold tracking-widest mb-12 uppercase">{lb.detailView}</h2>
        <div className="w-full max-w-3xl mx-auto aspect-video bg-[#f8f8f8] flex items-center justify-center text-neutral-400 text-sm rounded-lg">
          <span className="tracking-widest text-[11px] font-semibold">DETAIL IMAGE AREA</span>
        </div>
      </div>
    </div>
  );
}
