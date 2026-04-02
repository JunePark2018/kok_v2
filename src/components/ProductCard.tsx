import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  summary: string;
  price: number;
  originalPrice: number;
  discountRate: number;
  imageUrl: string;
}

export default function ProductCard({ id, name, summary, price, originalPrice, discountRate, imageUrl }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="group block">
      <div className="relative aspect-square w-full rounded-[16px] overflow-hidden bg-[#F5F5F5] mb-4">
        <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded z-10 font-mono backdrop-blur-sm">
          Target: 800x800 (1:1)
        </div>
        <img 
          src={imageUrl} 
          alt={name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
        />
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
      </div>
    </Link>
  );
}
