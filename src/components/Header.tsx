'use client';

import Link from 'next/link';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import LanguagePicker from '@/components/LanguagePicker';

interface HeaderProps {
  canPurchase?: boolean;
  region?: 'gl' | 'kr';
}

export default function Header({ canPurchase = true, region = 'kr' }: HeaderProps) {
  const { t, lang } = useI18n();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-100 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* Left Navigation */}
          <div className="flex-1 flex items-center">
            {/* Mobile Menu Icon */}
            <button className="lg:hidden text-neutral-900 p-2 -ml-2 mr-2">
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Left Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href={`/${region}/${lang}/products?category=type`} className="text-[14px] font-semibold text-neutral-900 hover:opacity-70 transition-opacity">
                {t('nav.type')}
              </Link>
              <Link href={`/${region}/${lang}/products?category=concern`} className="text-[14px] font-semibold text-neutral-900 hover:opacity-70 transition-opacity">
                {t('nav.concern')}
              </Link>
              <Link href={`/${region}/${lang}/products?category=hotdeal`} className="text-[14px] font-semibold text-neutral-900 hover:opacity-70 transition-opacity">
                {t('nav.hotdeal')}<span className="text-red-500 ml-0.5">•</span>
              </Link>
              <Link href={`/${region}/${lang}/reviews`} className="text-[14px] font-semibold text-neutral-900 hover:opacity-70 transition-opacity">
                {t('nav.review')}
              </Link>
              <Link href={`/${region}/${lang}/events`} className="text-[14px] font-semibold text-neutral-900 hover:opacity-70 transition-opacity">
                {t('nav.event')}
              </Link>
            </nav>
          </div>

          {/* Center Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${region}/${lang}`} className="text-xl sm:text-2xl font-bold tracking-widest text-[#111111] uppercase">
              KOKKOK GARDEN
            </Link>
          </div>

          {/* Right Navigation & Icons */}
          <div className="flex-1 flex items-center justify-end gap-3">
            <nav className="hidden lg:flex items-center space-x-6 mr-4">
              <Link href={`/${region}/${lang}/brand`} className="text-[14px] text-neutral-600 hover:text-black transition-colors">
                {t('nav.brand')}
              </Link>
              <Link href={`/${region}/${lang}/support`} className="text-[14px] text-neutral-600 hover:text-black transition-colors">
                {t('nav.support')}
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              <button className="text-neutral-900 hover:opacity-70 transition-opacity p-1">
                <Search className="w-[22px] h-[22px]" />
              </button>
              <Link href="/login" className="hidden sm:block text-neutral-900 hover:opacity-70 transition-opacity p-1">
                <User className="w-[22px] h-[22px]" />
              </Link>
              
              {canPurchase && (
                <div className="relative p-1 group">
                  <Link href="/cart" className="text-neutral-900 hover:opacity-70 transition-opacity block">
                    <ShoppingBag className="w-[22px] h-[22px]" />
                  </Link>
                  <div className="absolute top-10 right-0 hidden group-hover:block w-36 text-center bg-[#8eaad9] text-white text-[11px] font-medium py-1 px-2 rounded-full shadow-sm whitespace-nowrap z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {t('coupon.newMember')}
                  </div>
                </div>
              )}

              {/* Language Picker */}
              <LanguagePicker />
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
}
