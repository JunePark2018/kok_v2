import React from 'react';
import ProductCard from './ProductCard';

interface ProductGridProps {
  title?: string;
  products: any[];
  canPurchase?: boolean;
}

export default function ProductGrid({ title, products, canPurchase = true }: ProductGridProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {title && (
          <h2 className="text-2xl font-extrabold text-center mb-12 text-[#111]">{title}</h2>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 lg:gap-x-8">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} canPurchase={canPurchase} />
          ))}
        </div>
      </div>
    </section>
  );
}
