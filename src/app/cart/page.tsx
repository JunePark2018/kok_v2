'use client';

import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { CartProvider, useCart } from '@/lib/cart/CartContext';

function CartContent() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag className="w-16 h-16 text-neutral-200 mb-6" />
        <h2 className="text-xl font-bold text-neutral-800 mb-2">장바구니가 비어있습니다</h2>
        <p className="text-sm text-neutral-400 mb-8">상품을 담아보세요!</p>
        <Link
          href="/kr/kr/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#111] text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> 쇼핑 계속하기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-neutral-100">
        <h1 className="text-2xl font-extrabold tracking-tight">장바구니</h1>
        <button
          onClick={clearCart}
          className="text-xs text-neutral-400 hover:text-red-500 transition-colors"
        >
          전체 삭제
        </button>
      </div>

      <div className="space-y-0 divide-y divide-neutral-100">
        {items.map(item => (
          <div key={item.productId} className="flex gap-4 sm:gap-6 py-6">
            {/* Image */}
            <Link href={`/kr/kr/products/${item.productId}`} className="flex-shrink-0">
              <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden bg-neutral-100">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-neutral-300" />
                  </div>
                )}
              </div>
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <Link href={`/kr/kr/products/${item.productId}`} className="block">
                <h3 className="text-sm font-bold text-neutral-900 truncate">{item.name}</h3>
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-extrabold text-[#111]">{item.price.toLocaleString()}원</span>
                {item.originalPrice > item.price && (
                  <span className="text-xs text-neutral-400 line-through">{item.originalPrice.toLocaleString()}원</span>
                )}
              </div>

              {/* Quantity + Delete */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center border border-neutral-200 rounded-md">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-2.5 py-1.5 text-neutral-400 hover:text-black disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="px-2.5 py-1.5 text-neutral-400 hover:text-black transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="p-1.5 text-neutral-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="hidden sm:flex flex-col items-end justify-center">
              <span className="text-sm font-extrabold text-[#111]">
                {(item.price * item.quantity).toLocaleString()}원
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 pt-8 border-t-2 border-neutral-900">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-neutral-500">상품 금액</span>
          <span className="text-sm font-semibold">{totalPrice.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-neutral-500">배송비</span>
          <span className="text-sm font-semibold text-green-600">무료</span>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
          <span className="text-base font-bold">총 결제금액</span>
          <span className="text-2xl font-extrabold text-[#111]">{totalPrice.toLocaleString()}원</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-3">
        <Link
          href="/kr/kr/products"
          className="flex-1 text-center py-4 border border-neutral-200 text-neutral-700 text-sm font-semibold hover:bg-neutral-50 transition-colors"
        >
          쇼핑 계속하기
        </Link>
        <button
          onClick={() => alert('결제 기능은 준비 중입니다.')}
          className="flex-1 py-4 bg-[#111] text-white text-sm font-bold tracking-wider hover:bg-black transition-colors"
        >
          결제하기
        </button>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        {/* Simple header */}
        <header className="border-b border-neutral-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/kr/kr" className="text-xl font-black tracking-[0.12em] text-[#111]">
              KOKKOK GARDEN
            </Link>
            <Link href="/kr/kr/products" className="text-xs text-neutral-500 hover:text-black transition-colors">
              쇼핑 계속하기
            </Link>
          </div>
        </header>
        <CartContent />
      </div>
    </CartProvider>
  );
}
