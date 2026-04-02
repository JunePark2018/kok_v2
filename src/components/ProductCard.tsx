'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface ProductCardProps {
  id: string;
  name: string;
  summary: string;
  price: number;
  originalPrice: number;
  discountRate: number;
  imageUrl: string;
  canPurchase?: boolean;
}

export default function ProductCard({ id, name, summary, price, originalPrice, discountRate, imageUrl, canPurchase = true }: ProductCardProps) {
  const { t, lang, region } = useI18n();

  return (
    <div className="group block">
      <Link href={`/${region}/${lang}/products/${id}`} className="block">
        <div className="relative aspect-[5/6] w-full rounded-[16px] overflow-hidden bg-[#F5F5F5] mb-4">
          <img 
            src={imageUrl} 
            alt={name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {canPurchase && (
            <button className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black hover:text-white">
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex flex-col space-y-1 px-1">
          <h3 className="text-[13px] font-bold text-[#333] leading-tight break-keep">{name}</h3>
          <p className="text-[12px] text-[#999] leading-tight line-clamp-1">{summary}</p>
          
          <div className="flex items-center space-x-1.5 mt-2">
            {discountRate > 0 && (
              <span className="text-[15px] font-extrabold text-[#f15a24]">{discountRate}%</span>
            )}
            <span className="text-[15px] font-extrabold text-[#111]">{price.toLocaleString()}원</span>
          </div>
          
          {originalPrice > price && (
            <span className="text-[13px] text-[#b5b5b5] line-through block mt-0.5">
              {originalPrice.toLocaleString()}원
            </span>
          )}

          {!canPurchase && (
            <span className="text-[11px] text-[#6b9fd4] font-medium mt-1 flex items-center gap-1">
              🌏 {t('product.unavailable')}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
