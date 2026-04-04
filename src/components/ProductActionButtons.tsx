'use client';
import { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';

interface ProductActionButtonsProps {
  productId: string;
  price: number;
  naverStoreUrl?: string;
}

export default function ProductActionButtons({ productId, price, naverStoreUrl }: ProductActionButtonsProps) {
  const [quantity, setQuantity] = useState(1);
  const { t } = useI18n();

  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    alert(`[장바구니] 상품이 추가되었습니다!\n\n상품 ID: ${productId}\n수량: ${quantity}개\n\n* 실제 장바구니 DB 연결은 Phase 2에서 진행됩니다.`);
  };

  const handleBuyNow = () => {
    if (naverStoreUrl) {
      window.open(naverStoreUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(`[결제] 결제 페이지로 이동합니다.\n\n총 결제금액: ${(price * quantity).toLocaleString()}원\n\n* 실제 결제 모듈 연동은 Phase 2에서 진행됩니다.`);
    }
  };

  return (
    <div className="space-y-6 pt-8 mt-8 border-t border-neutral-100">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-neutral-800 tracking-wider">수량</span>
        <div className="flex items-center border border-neutral-200">
          <button onClick={decrease} className="px-4 py-2.5 text-lg text-neutral-400 hover:bg-neutral-50 hover:text-black transition-colors" disabled={quantity <= 1}>−</button>
          <span className="w-12 text-center text-sm font-semibold">{quantity}</span>
          <button onClick={increase} className="px-4 py-2.5 text-lg text-neutral-400 hover:bg-neutral-50 hover:text-black transition-colors">+</button>
        </div>
      </div>

      {/* Total Price preview */}
      <div className="flex justify-between items-end pb-4 pt-2">
         <span className="text-sm font-semibold text-neutral-500">총 상품금액</span>
         <span className="text-2xl font-extrabold text-[#111111]">{(price * quantity).toLocaleString()}원</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-white border border-[#111111] text-[#111111] py-4.5 font-bold tracking-widest text-[13px] hover:bg-neutral-50 transition-colors"
        >
          {t('product.addToCart')}
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-[#111111] text-white py-4.5 font-bold tracking-widest text-[13px] hover:bg-black transition-colors shadow-lg shadow-black/10"
        >
          {t('product.buyNow')}
          {naverStoreUrl && (
            <span className="ml-1 text-[10px] opacity-70">↗</span>
          )}
        </button>
      </div>
    </div>
  );
}
