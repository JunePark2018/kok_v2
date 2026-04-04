'use client';

import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import LanguagePicker from '@/components/LanguagePicker';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/api/products';
import { getCategoriesTree, type CategoryWithChildren } from '@/lib/api/categories';
import { useCart } from '@/lib/cart/CartContext';

interface HeaderProps {
  canPurchase?: boolean;
  region?: 'gl' | 'kr';
}

/* ── i18n utility strings ───────────────────────────────────────────── */
const UTILITY: Record<string, { join: string; login: string; logout: string; order: string; recent: string; cs: string }> = {
  kr: { join: '회원가입', login: '로그인', logout: '로그아웃', order: '주문조회', recent: '최근본상품', cs: '고객센터' },
  en: { join: 'Sign Up', login: 'Login', logout: 'Logout', order: 'Order', recent: 'Recently Viewed', cs: 'Support' },
  cn: { join: '注册', login: '登录', logout: '退出', order: '订单查询', recent: '最近浏览', cs: '客服' },
  jp: { join: '会員登録', login: 'ログイン', logout: 'ログアウト', order: '注文照会', recent: '最近見た商品', cs: 'サポート' },
  vn: { join: 'Đăng ký', login: 'Đăng nhập', logout: 'Đăng xuất', order: 'Đơn hàng', recent: 'Đã xem', cs: 'Hỗ trợ' },
  th: { join: 'สมัครสมาชิก', login: 'เข้าสู่ระบบ', logout: 'ออกจากระบบ', order: 'ติดตามออเดอร์', recent: 'ดูล่าสุด', cs: 'ช่วยเหลือ' },
};

const NAV_LABELS: Record<string, { product: string; event: string; brand: string; review: string; global: string; worldwide: string; contact: string }> = {
  kr: { product: 'Product', event: 'EVENT & NOTICE', brand: 'BRAND STORY', review: 'REVIEW & COMMUNITY', global: 'SHOP Worldwide', worldwide: 'SHOP Worldwide', contact: '고객센터' },
  en: { product: 'Product', event: 'EVENT & NOTICE', brand: 'BRAND STORY', review: 'REVIEWS', global: 'SHOP Worldwide', worldwide: 'SHOP Worldwide', contact: 'Contact' },
  cn: { product: '商品', event: '活动 & 通知', brand: '品牌故事', review: '评价社区', global: '全球购物', worldwide: '全球购物', contact: '联系我们' },
  jp: { product: '商品', event: 'イベント & お知らせ', brand: 'ブランドストーリー', review: 'レビュー', global: 'ショップ全世界', worldwide: 'ショップ全世界', contact: 'お問い合わせ' },
  vn: { product: 'Sản Phẩm', event: 'SỰ KIỆN & TIN TỨC', brand: 'CÂU CHUYỆN THƯƠNG HIỆU', review: 'ĐÁNH GIÁ', global: 'MUA HÀNG TOÀN CẦU', worldwide: 'MUA HÀNG TOÀN CẦU', contact: 'Liên Hệ' },
  th: { product: 'สินค้า', event: 'อีเวนต์ & ข่าวสาร', brand: 'เรื่องราวแบรนด์', review: 'รีวิว', global: 'ช้อปทั่วโลก', worldwide: 'ช้อปทั่วโลก', contact: 'ติดต่อเรา' },
};

export default function Header({ canPurchase = true, region = 'kr' }: HeaderProps) {
  const { lang } = useI18n();
  const { totalCount } = useCart();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [navPages, setNavPages] = useState<{ slug: string; title: Record<string, string> }[]>([]);
  const [megaCategories, setMegaCategories] = useState<CategoryWithChildren[]>([]);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLoggedIn = useMemo(() => typeof document !== 'undefined' && document.cookie.includes('kokkok_auth=true'), []);
  const isAdmin = useMemo(() => typeof document !== 'undefined' && document.cookie.includes('kokkok_admin_auth=true'), []);

  const fetchNavPages = useCallback(async () => {
    try {
      if (!supabase) return;
      const { data } = await supabase
        .from('pages')
        .select('slug, title')
        .eq('show_in_nav', true)
        .eq('is_published', true)
        .order('nav_order', { ascending: true });
      if (data) setNavPages(data);
    } catch { /* ignore */ }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const tree = await getCategoriesTree();
      setMegaCategories(tree);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchNavPages(); fetchCategories(); }, [fetchNavPages, fetchCategories]);
  const util = UTILITY[lang] ?? UTILITY['en'];
  const nav = NAV_LABELS[lang] ?? NAV_LABELS['en'];

  const productMega = megaCategories.map(cat => ({
    label: cat.name[lang] || cat.name['en'] || cat.slug,
    slug: cat.slug,
    items: cat.children.map(sub => ({
      name: sub.name[lang] || sub.name['en'] || sub.slug,
      slug: sub.slug,
    })),
  }));

  const openMenu = (name: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setActiveMenu(name);
  };
  const closeMenu = () => {
    hoverTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };
  const keepMenu = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  useEffect(() => () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    window.location.href = `/${region}/${lang}/products?q=${encodeURIComponent(searchQuery.trim())}`;
  };

  return (
    <>
      {/* ── UTILITY BAR ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-neutral-100 hidden lg:block">
        <div className="max-w-[1600px] mx-auto px-8 flex justify-end items-center h-9 gap-5 text-[11px] text-neutral-500 font-medium tracking-wide">
          {isAdmin && (
            <Link href="/admin" className="hover:text-black transition-colors text-[#4a7a3e] font-bold">ADMIN</Link>
          )}
          {!isLoggedIn && (
            <Link href="/register" className="hover:text-black transition-colors">{util.join}</Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={() => {
                document.cookie = "kokkok_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "kokkok_admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.reload();
              }}
              className="hover:text-black transition-colors"
            >
              {util.logout}
            </button>
          ) : (
            <Link href="/login" className="hover:text-black transition-colors">{util.login}</Link>
          )}
          <Link href={`/${region}/${lang}/orders`} className="hover:text-black transition-colors">{util.order}</Link>
          <Link href={`/${region}/${lang}/recent`} className="hover:text-black transition-colors">{util.recent}</Link>
          <Link href={`/${region}/${lang}/support`} className="hover:text-black transition-colors">{util.cs} ›</Link>
        </div>
      </div>

      {/* ── MAIN HEADER ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-100 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
          <div className="flex items-center h-[66px] gap-4">

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 -ml-2 text-neutral-900"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link
              href={`/${region}/${lang}`}
              className="text-[22px] font-black tracking-[0.12em] text-[#111111] uppercase flex-shrink-0 mr-8"
            >
              KOKKOK<br className="hidden" /> GARDEN
            </Link>

            {/* ── Desktop Nav ─────────────────────────────────────────── */}
            <nav className="hidden lg:flex items-center flex-1 h-full">

              {/* Product — slim submenu bar (reference style) */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => openMenu('product')}
                onMouseLeave={closeMenu}
              >
                <button className={`flex items-center gap-1 px-4 h-full text-[13.5px] font-semibold tracking-wide transition-colors ${activeMenu === 'product' ? 'text-black' : 'text-neutral-800 hover:text-black'}`}>
                  {nav.product}
                </button>
                {/* Green underline indicator */}
                {activeMenu === 'product' && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2.5px] bg-[#4a7a3e] rounded-full" />
                )}
              </div>

              {/* Dynamic CMS pages from DB */}
              {navPages.map(page => (
                <Link
                  key={page.slug}
                  href={`/${region}/${lang}/pages/${page.slug}`}
                  className="px-4 h-full flex items-center text-[13.5px] font-semibold text-neutral-800 hover:text-black tracking-wide transition-colors"
                >
                  {page.title?.[lang] || page.title?.kr || page.title?.en || ''}
                </Link>
              ))}

              {/* Shop Worldwide — direct link */}
              <Link
                href={`/${region}/${lang}/worldwide`}
                className="px-4 h-full flex items-center text-[13.5px] font-semibold text-neutral-800 hover:text-black tracking-wide transition-colors"
              >
                {nav.global}
              </Link>
            </nav>

            {/* ── Right Icons ──────────────────────────────────────────── */}
            <div className="ml-auto flex items-center gap-2">
              <button onClick={() => setSearchOpen(v => !v)} className="p-2 text-neutral-900 hover:opacity-60 transition-opacity" aria-label="Search">
                <Search className="w-[21px] h-[21px]" />
              </button>
              <Link href={isLoggedIn ? `/${region}/${lang}/mypage` : '/login'} className="hidden sm:flex p-2 text-neutral-900 hover:opacity-60 transition-opacity" aria-label="Account">
                <User className="w-[21px] h-[21px]" />
              </Link>
              {canPurchase && (
                <Link href="/cart" className="relative p-2 text-neutral-900 hover:opacity-60 transition-opacity flex" aria-label="Cart">
                  <ShoppingBag className="w-[21px] h-[21px]" />
                  {totalCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-[#111] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {totalCount > 99 ? '99' : totalCount}
                    </span>
                  )}
                </Link>
              )}
              <LanguagePicker />
            </div>

          </div>
        </div>

          {/* ── Product Mega Menu ─────────────────────────────────────── */}
        {activeMenu === 'product' && productMega.length > 0 && (
          <div
            className="absolute top-full left-0 w-full bg-white border-t border-neutral-100 shadow-lg z-30"
            onMouseEnter={keepMenu}
            onMouseLeave={closeMenu}
          >
            <div className="max-w-[1600px] mx-auto px-8 py-6 flex gap-12">
              {productMega.map(col => (
                <div key={col.slug}>
                  <Link
                    href={`/${region}/${lang}/products?category=${col.slug}`}
                    className="text-[13px] font-bold text-neutral-900 hover:text-[#4a7a3e] tracking-wide transition-colors"
                    onClick={() => setActiveMenu(null)}
                  >
                    {col.label}
                  </Link>
                  {col.items.length > 0 && (
                    <ul className="mt-2.5 space-y-1.5">
                      {col.items.map(item => (
                        <li key={item.slug}>
                          <Link
                            href={`/${region}/${lang}/products?sub=${item.slug}`}
                            className="text-[12.5px] text-neutral-500 hover:text-black transition-colors"
                            onClick={() => setActiveMenu(null)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* ── Mobile Menu Drawer ───────────────────────────────────────── */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-100 px-6 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <Link href={`/${region}/${lang}/products`} className="block text-sm font-bold text-neutral-800 py-2 border-b border-neutral-100" onClick={() => setMobileOpen(false)}>{nav.product}</Link>
            {navPages.map(page => (
              <Link key={page.slug} href={`/${region}/${lang}/pages/${page.slug}`} className="block text-sm font-bold text-neutral-800 py-2 border-b border-neutral-100" onClick={() => setMobileOpen(false)}>{page.title?.[lang] || page.title?.kr || page.title?.en || ''}</Link>
            ))}
            <Link href={`/${region}/${lang}/worldwide`} className="flex items-center gap-2 text-sm font-bold text-neutral-800 py-2 border-b border-neutral-100" onClick={() => setMobileOpen(false)}>
              <Globe className="w-4 h-4" /> {nav.worldwide}
            </Link>
            <Link href={`/${region}/${lang}/support`} className="block text-sm font-bold text-neutral-800 py-2" onClick={() => setMobileOpen(false)}>{nav.contact}</Link>
            <div className="pt-2 flex gap-4 text-[12px] text-neutral-400">
              <Link href="/login" onClick={() => setMobileOpen(false)}>{util.login}</Link>
              <Link href="/register" onClick={() => setMobileOpen(false)}>{util.join}</Link>
            </div>
          </div>
        )}
        {/* ── Search Overlay ─────────────────────────────────────────── */}
        {searchOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-neutral-100 shadow-lg z-40 animate-in fade-in slide-in-from-top-1 duration-150">
            <form onSubmit={handleSearch} className="max-w-[1600px] mx-auto px-4 sm:px-8 py-4 flex items-center gap-3">
              <Search className="w-5 h-5 text-neutral-400 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={lang === 'kr' ? '상품명, 성분, 키워드 검색...' : 'Search products...'}
                className="flex-1 text-sm bg-transparent outline-none placeholder:text-neutral-400"
              />
              <button type="submit" className="px-4 py-2 bg-[#111111] text-white text-xs font-bold tracking-widest rounded hover:bg-black transition-colors">
                {lang === 'kr' ? '검색' : 'Search'}
              </button>
              <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="p-1.5 text-neutral-400 hover:text-black transition-colors">
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>
    </>
  );
}
