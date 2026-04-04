'use client';

import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import LanguagePicker from '@/components/LanguagePicker';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/api/products';

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

const PRODUCT_MEGA: Record<string, { label: string; items: { name: string; slug: string }[] }[]> = {
  kr: [
    { label: '유형별', items: [{ name: '세럼/앰플', slug: 'serum' }, { name: '크림/로션', slug: 'cream' }, { name: '클렌징', slug: 'cleansing' }, { name: '선케어', slug: 'suncare' }, { name: '마스크', slug: 'mask' }] },
    { label: '성분별', items: [{ name: 'PDRN', slug: 'pdrn' }, { name: 'EGF/펩타이드', slug: 'egf' }, { name: 'CICA', slug: 'cica' }, { name: '레티놀', slug: 'retinol' }, { name: '어성초', slug: 'heartleaf' }] },
    { label: '피부고민', items: [{ name: '수분/보습', slug: 'moisture' }, { name: '진정/트러블', slug: 'soothing' }, { name: '미백/광채', slug: 'brightening' }, { name: '탄력/안티에이징', slug: 'antiaging' }, { name: '모공/피지', slug: 'pore' }] },
    { label: '기획전', items: [{ name: '신상품', slug: 'new' }, { name: '베스트셀러', slug: 'best' }, { name: '세일', slug: 'sale' }, { name: '세트/기프트', slug: 'set' }] },
  ],
  en: [
    { label: 'By Type', items: [{ name: 'Serum / Ampoule', slug: 'serum' }, { name: 'Cream / Lotion', slug: 'cream' }, { name: 'Cleansing', slug: 'cleansing' }, { name: 'Sun Care', slug: 'suncare' }, { name: 'Mask', slug: 'mask' }] },
    { label: 'By Ingredient', items: [{ name: 'PDRN', slug: 'pdrn' }, { name: 'EGF / Peptide', slug: 'egf' }, { name: 'CICA', slug: 'cica' }, { name: 'Retinol', slug: 'retinol' }, { name: 'Heartleaf', slug: 'heartleaf' }] },
    { label: 'By Concern', items: [{ name: 'Hydration', slug: 'moisture' }, { name: 'Soothing', slug: 'soothing' }, { name: 'Brightening', slug: 'brightening' }, { name: 'Anti-Aging', slug: 'antiaging' }, { name: 'Pore Care', slug: 'pore' }] },
    { label: 'Collections', items: [{ name: 'New Arrivals', slug: 'new' }, { name: 'Best Sellers', slug: 'best' }, { name: 'Sale', slug: 'sale' }, { name: 'Gifts & Sets', slug: 'set' }] },
  ],
  cn: [
    { label: '按类型', items: [{ name: '精华/安瓶', slug: 'serum' }, { name: '面霜/乳液', slug: 'cream' }, { name: '洁肤', slug: 'cleansing' }, { name: '防晒', slug: 'suncare' }, { name: '面膜', slug: 'mask' }] },
    { label: '按成分', items: [{ name: 'PDRN', slug: 'pdrn' }, { name: 'EGF/肽', slug: 'egf' }, { name: 'CICA', slug: 'cica' }, { name: '视黄醇', slug: 'retinol' }, { name: '鱼腥草', slug: 'heartleaf' }] },
    { label: '按肌肤需求', items: [{ name: '保湿补水', slug: 'moisture' }, { name: '舒缓镇定', slug: 'soothing' }, { name: '美白亮肤', slug: 'brightening' }, { name: '抗衰老', slug: 'antiaging' }, { name: '毛孔护理', slug: 'pore' }] },
    { label: '精选系列', items: [{ name: '新品', slug: 'new' }, { name: '畅销榜', slug: 'best' }, { name: '特惠', slug: 'sale' }, { name: '礼盒套装', slug: 'set' }] },
  ],
  jp: [
    { label: 'タイプ別', items: [{ name: 'セラム/アンプル', slug: 'serum' }, { name: 'クリーム/ローション', slug: 'cream' }, { name: 'クレンジング', slug: 'cleansing' }, { name: 'サンケア', slug: 'suncare' }, { name: 'マスク', slug: 'mask' }] },
    { label: '成分別', items: [{ name: 'PDRN', slug: 'pdrn' }, { name: 'EGF/ペプチド', slug: 'egf' }, { name: 'CICA', slug: 'cica' }, { name: 'レチノール', slug: 'retinol' }, { name: 'ドクダミ', slug: 'heartleaf' }] },
    { label: '悩み別', items: [{ name: '保湿', slug: 'moisture' }, { name: '鎮静', slug: 'soothing' }, { name: '美白/ツヤ', slug: 'brightening' }, { name: '抗老化', slug: 'antiaging' }, { name: '毛穴', slug: 'pore' }] },
    { label: 'コレクション', items: [{ name: '新着', slug: 'new' }, { name: 'ベストセラー', slug: 'best' }, { name: 'セール', slug: 'sale' }, { name: 'ギフトセット', slug: 'set' }] },
  ],
  vn: [
    { label: 'Theo Loại', items: [{ name: 'Serum/Ampoule', slug: 'serum' }, { name: 'Kem/Lotion', slug: 'cream' }, { name: 'Tẩy Trang', slug: 'cleansing' }, { name: 'Chống Nắng', slug: 'suncare' }, { name: 'Mặt Nạ', slug: 'mask' }] },
    { label: 'Theo Thành Phần', items: [{ name: 'PDRN', slug: 'pdrn' }, { name: 'EGF/Peptide', slug: 'egf' }, { name: 'CICA', slug: 'cica' }, { name: 'Retinol', slug: 'retinol' }, { name: 'Diếp Cá', slug: 'heartleaf' }] },
    { label: 'Theo Vấn Đề Da', items: [{ name: 'Dưỡng Ẩm', slug: 'moisture' }, { name: 'Làm Dịu Da', slug: 'soothing' }, { name: 'Làm Sáng Da', slug: 'brightening' }, { name: 'Chống Lão Hoá', slug: 'antiaging' }, { name: 'Se Lỗ Chân Lông', slug: 'pore' }] },
    { label: 'Bộ Sưu Tập', items: [{ name: 'Hàng Mới', slug: 'new' }, { name: 'Bán Chạy', slug: 'best' }, { name: 'Khuyến Mãi', slug: 'sale' }, { name: 'Bộ Quà Tặng', slug: 'set' }] },
  ],
  th: [
    { label: 'ตามประเภท', items: [{ name: 'เซรั่ม/แอมพูล', slug: 'serum' }, { name: 'ครีม/โลชั่น', slug: 'cream' }, { name: 'คลีนซิ่ง', slug: 'cleansing' }, { name: 'ครีมกันแดด', slug: 'suncare' }, { name: 'มาสก์', slug: 'mask' }] },
    { label: 'ตามส่วนผสม', items: [{ name: 'PDRN', slug: 'pdrn' }, { name: 'EGF/เปปไทด์', slug: 'egf' }, { name: 'CICA', slug: 'cica' }, { name: 'เรตินอล', slug: 'retinol' }, { name: 'พลูคาว', slug: 'heartleaf' }] },
    { label: 'ตามปัญหาผิว', items: [{ name: 'มอยส์เจอไรซิ่ง', slug: 'moisture' }, { name: 'บรรเทาผิว', slug: 'soothing' }, { name: 'ผิวกระจ่างใส', slug: 'brightening' }, { name: 'ต้านริ้วรอย', slug: 'antiaging' }, { name: 'รูขุมขน', slug: 'pore' }] },
    { label: 'คอลเลคชัน', items: [{ name: 'สินค้าใหม่', slug: 'new' }, { name: 'ขายดี', slug: 'best' }, { name: 'ลดราคา', slug: 'sale' }, { name: 'เซ็ตของขวัญ', slug: 'set' }] },
  ],
};

const NAV_LABELS: Record<string, { product: string; event: string; brand: string; review: string; global: string; worldwide: string; contact: string }> = {
  kr: { product: 'Product', event: 'EVENT & NOTICE', brand: 'BRAND STORY', review: 'REVIEW & COMMUNITY', global: 'Global & CS', worldwide: 'SHOP Worldwide', contact: '고객센터' },
  en: { product: 'Product', event: 'EVENT & NOTICE', brand: 'BRAND STORY', review: 'REVIEWS', global: 'Global & CS', worldwide: 'SHOP Worldwide', contact: 'Contact' },
  cn: { product: '商品', event: '活动 & 通知', brand: '品牌故事', review: '评价社区', global: '全球 & 服务', worldwide: '全球购物', contact: '联系我们' },
  jp: { product: '商品', event: 'イベント & お知らせ', brand: 'ブランドストーリー', review: 'レビュー', global: 'グローバル & CS', worldwide: 'ショップ全世界', contact: 'お問い合わせ' },
  vn: { product: 'Sản Phẩm', event: 'SỰ KIỆN & TIN TỨC', brand: 'CÂU CHUYỆN THƯƠNG HIỆU', review: 'ĐÁNH GIÁ', global: 'Toàn Cầu & CS', worldwide: 'MUA HÀNG TOÀN CẦU', contact: 'Liên Hệ' },
  th: { product: 'สินค้า', event: 'อีเวนต์ & ข่าวสาร', brand: 'เรื่องราวแบรนด์', review: 'รีวิว', global: 'ทั่วโลก & CS', worldwide: 'ช้อปทั่วโลก', contact: 'ติดต่อเรา' },
};

export default function Header({ canPurchase = true, region = 'kr' }: HeaderProps) {
  const { lang } = useI18n();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navPages, setNavPages] = useState<{ slug: string; title: string }[]>([]);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => { fetchNavPages(); }, [fetchNavPages]);
  const util = UTILITY[lang] ?? UTILITY['en'];
  const nav = NAV_LABELS[lang] ?? NAV_LABELS['en'];
  const productMega = PRODUCT_MEGA[lang] ?? PRODUCT_MEGA['en'];

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

  return (
    <>
      {/* ── UTILITY BAR ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-neutral-100 hidden lg:block">
        <div className="max-w-[1600px] mx-auto px-8 flex justify-end items-center h-9 gap-5 text-[11px] text-neutral-500 font-medium tracking-wide">
          {isAdmin && (
            <Link href="/admin" className="hover:text-black transition-colors text-[#4a7a3e] font-bold">ADMIN</Link>
          )}
          {!isAdmin && (
            <Link href="/register" className="hover:text-black transition-colors">{util.join}</Link>
          )}
          {isAdmin ? (
            <button
              onClick={() => {
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
                  {page.title}
                </Link>
              ))}

              {/* Global & CS — dropdown */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => openMenu('global')}
                onMouseLeave={closeMenu}
              >
                <button className={`flex items-center gap-1 px-4 h-full text-[13.5px] font-semibold tracking-wide transition-colors ${activeMenu === 'global' ? 'text-black' : 'text-neutral-800 hover:text-black'}`}>
                  {nav.global}
                </button>
                {activeMenu === 'global' && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2.5px] bg-[#4a7a3e] rounded-full" />
                )}

                {activeMenu === 'global' && (
                  <div
                    className="absolute top-full left-0 bg-white border-t-2 border-black shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 min-w-[200px]"
                    onMouseEnter={keepMenu}
                    onMouseLeave={closeMenu}
                  >
                    <ul className="py-2">
                      {[
                        { label: nav.worldwide, href: `/${region}/${lang}/worldwide`, icon: '🌍' },
                        { label: nav.contact, href: `/${region}/${lang}/support`, icon: '💬' },
                      ].map(item => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 px-5 py-3 text-[13px] text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
                            onClick={() => setActiveMenu(null)}
                          >
                            <span className="text-base">{item.icon}</span>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </nav>

            {/* ── Right Icons ──────────────────────────────────────────── */}
            <div className="ml-auto flex items-center gap-2">
              <button className="p-2 text-neutral-900 hover:opacity-60 transition-opacity" aria-label="Search">
                <Search className="w-[21px] h-[21px]" />
              </button>
              <Link href="/login" className="hidden sm:flex p-2 text-neutral-900 hover:opacity-60 transition-opacity" aria-label="Account">
                <User className="w-[21px] h-[21px]" />
              </Link>
              {canPurchase && (
                <div className="relative group">
                  <Link href="/cart" className="p-2 text-neutral-900 hover:opacity-60 transition-opacity flex" aria-label="Cart">
                    <ShoppingBag className="w-[21px] h-[21px]" />
                  </Link>
                  <div className="absolute top-10 right-0 hidden group-hover:block whitespace-nowrap bg-[#8eaad9] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow z-50 animate-in fade-in duration-150">
                    신규회원 5,000원 쿠폰
                  </div>
                </div>
              )}
              <LanguagePicker />
            </div>

          </div>
        </div>

          {/* ── Product Submenu Bar (slim, reference style) ─────────────── */}
        {activeMenu === 'product' && (
          <div
            className="absolute top-full left-0 w-full bg-white border-t border-neutral-100 shadow-sm z-30"
            onMouseEnter={keepMenu}
            onMouseLeave={closeMenu}
          >
            <div className="max-w-[1600px] mx-auto px-8 flex items-center h-11 gap-8">
              {productMega.slice(0, 3).map(col => (
                <Link
                  key={col.label}
                  href={`/${region}/${lang}/products?category=${col.items[0]?.slug ?? ''}`}
                  className="text-[13px] text-neutral-600 hover:text-black font-medium tracking-wide transition-colors"
                  onClick={() => setActiveMenu(null)}
                >
                  {col.label}
                </Link>
              ))}
            </div>
          </div>
        )}

      {/* ── Mobile Menu Drawer ───────────────────────────────────────── */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-100 px-6 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <Link href={`/${region}/${lang}/products`} className="block text-sm font-bold text-neutral-800 py-2 border-b border-neutral-100" onClick={() => setMobileOpen(false)}>{nav.product}</Link>
            {navPages.map(page => (
              <Link key={page.slug} href={`/${region}/${lang}/pages/${page.slug}`} className="block text-sm font-bold text-neutral-800 py-2 border-b border-neutral-100" onClick={() => setMobileOpen(false)}>{page.title}</Link>
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
      </header>
    </>
  );
}
