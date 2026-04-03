'use client';

import { useState } from 'react';
import { ExternalLink, Globe } from 'lucide-react';

/* ── DATA ───────────────────────────────────────────────────────────────
   Each entry: flag emoji, country name (in native + english), region tag,
   storeName, storeUrl, and optional bannerBg (CSS gradient or color).
   Add real store URLs when available — placeholders marked with #.
──────────────────────────────────────────────────────────────────────── */
export interface RetailerEntry {
  id: string;
  flag: string;
  country: string;        // display name (auto-translated by parent if needed)
  countryEn: string;      // always English for filter logic
  region: 'ASIA' | 'NORTH AMERICA' | 'SOUTH AMERICA' | 'EUROPE' | 'OCEANIA' | 'MIDDLE EAST' | 'AFRICA' | 'CIS';
  storeName: string;
  storeUrl: string;
  bannerColor: string;    // CSS color / gradient for the card accent
}

export const RETAILERS: RetailerEntry[] = [
  // ── ASIA ──
  { id: 'kr', flag: '🇰🇷', country: '한국', countryEn: 'South Korea', region: 'ASIA', storeName: 'Kokkok Garden Official', storeUrl: 'https://kokv2.vercel.app/kr/kr', bannerColor: '#4a7ab5' },
  { id: 'jp', flag: '🇯🇵', country: '日本', countryEn: 'Japan', region: 'ASIA', storeName: 'Kokkok Garden Japan', storeUrl: '#', bannerColor: '#bc002d' },
  { id: 'cn', flag: '🇨🇳', country: '中国', countryEn: 'China', region: 'ASIA', storeName: 'Kokkok Garden China', storeUrl: '#', bannerColor: '#de2910' },
  { id: 'tw', flag: '🇹🇼', country: '台灣', countryEn: 'Taiwan', region: 'ASIA', storeName: 'Kokkok Garden Taiwan', storeUrl: '#', bannerColor: '#003070' },
  { id: 'hk', flag: '🇭🇰', country: '香港', countryEn: 'Hong Kong', region: 'ASIA', storeName: 'Kokkok Garden HK', storeUrl: '#', bannerColor: '#de2910' },
  { id: 'sg', flag: '🇸🇬', country: 'Singapore', countryEn: 'Singapore', region: 'ASIA', storeName: 'Kokkok Garden SG', storeUrl: '#', bannerColor: '#ef3340' },
  { id: 'my', flag: '🇲🇾', country: 'Malaysia', countryEn: 'Malaysia', region: 'ASIA', storeName: 'Kokkok Garden Malaysia', storeUrl: '#', bannerColor: '#cc0001' },
  { id: 'th', flag: '🇹🇭', country: 'ประเทศไทย', countryEn: 'Thailand', region: 'ASIA', storeName: 'Kokkok Garden Thailand', storeUrl: '#', bannerColor: '#2d2a4a' },
  { id: 'vn', flag: '🇻🇳', country: 'Việt Nam', countryEn: 'Vietnam', region: 'ASIA', storeName: 'Kokkok Garden Vietnam', storeUrl: '#', bannerColor: '#da251d' },
  { id: 'id', flag: '🇮🇩', country: 'Indonesia', countryEn: 'Indonesia', region: 'ASIA', storeName: 'Kokkok Garden Indonesia', storeUrl: '#', bannerColor: '#ce1126' },
  { id: 'ph', flag: '🇵🇭', country: 'Philippines', countryEn: 'Philippines', region: 'ASIA', storeName: 'Kokkok Garden Philippines', storeUrl: '#', bannerColor: '#0038a8' },

  // ── NORTH AMERICA ──
  { id: 'us', flag: '🇺🇸', country: 'United States', countryEn: 'United States', region: 'NORTH AMERICA', storeName: 'Kokkok Garden USA', storeUrl: '#', bannerColor: '#3c3b6e' },
  { id: 'ca', flag: '🇨🇦', country: 'Canada', countryEn: 'Canada', region: 'NORTH AMERICA', storeName: 'Kokkok Garden Canada', storeUrl: '#', bannerColor: '#ff0000' },
  { id: 'mx', flag: '🇲🇽', country: 'México', countryEn: 'Mexico', region: 'NORTH AMERICA', storeName: 'Kokkok Garden Mexico', storeUrl: '#', bannerColor: '#006847' },

  // ── EUROPE ──
  { id: 'gb', flag: '🇬🇧', country: 'United Kingdom', countryEn: 'United Kingdom', region: 'EUROPE', storeName: 'Kokkok Garden UK', storeUrl: '#', bannerColor: '#012169' },
  { id: 'de', flag: '🇩🇪', country: 'Deutschland', countryEn: 'Germany', region: 'EUROPE', storeName: 'Kokkok Garden Germany', storeUrl: '#', bannerColor: '#2a2a2a' },
  { id: 'fr', flag: '🇫🇷', country: 'France', countryEn: 'France', region: 'EUROPE', storeName: 'Kokkok Garden France', storeUrl: '#', bannerColor: '#002395' },
  { id: 'it', flag: '🇮🇹', country: 'Italia', countryEn: 'Italy', region: 'EUROPE', storeName: 'Kokkok Garden Italy', storeUrl: '#', bannerColor: '#009246' },
  { id: 'es', flag: '🇪🇸', country: 'España', countryEn: 'Spain', region: 'EUROPE', storeName: 'Kokkok Garden Spain', storeUrl: '#', bannerColor: '#aa151b' },
  { id: 'nl', flag: '🇳🇱', country: 'Nederland', countryEn: 'Netherlands', region: 'EUROPE', storeName: 'Kokkok Garden NL', storeUrl: '#', bannerColor: '#ae1c28' },
  { id: 'pl', flag: '🇵🇱', country: 'Polska', countryEn: 'Poland', region: 'EUROPE', storeName: 'Kokkok Garden Poland', storeUrl: '#', bannerColor: '#dc143c' },

  // ── MIDDLE EAST ──
  { id: 'ae', flag: '🇦🇪', country: 'UAE', countryEn: 'UAE', region: 'MIDDLE EAST', storeName: 'Kokkok Garden UAE', storeUrl: '#', bannerColor: '#00732f' },
  { id: 'sa', flag: '🇸🇦', country: 'Saudi Arabia', countryEn: 'Saudi Arabia', region: 'MIDDLE EAST', storeName: 'Kokkok Garden KSA', storeUrl: '#', bannerColor: '#006c35' },

  // ── OCEANIA ──
  { id: 'au', flag: '🇦🇺', country: 'Australia', countryEn: 'Australia', region: 'OCEANIA', storeName: 'Kokkok Garden Australia', storeUrl: '#', bannerColor: '#00008b' },
  { id: 'nz', flag: '🇳🇿', country: 'New Zealand', countryEn: 'New Zealand', region: 'OCEANIA', storeName: 'Kokkok Garden NZ', storeUrl: '#', bannerColor: '#00247d' },

  // ── SOUTH AMERICA ──
  { id: 'br', flag: '🇧🇷', country: 'Brasil', countryEn: 'Brazil', region: 'SOUTH AMERICA', storeName: 'Kokkok Garden Brazil', storeUrl: '#', bannerColor: '#009c3b' },
  { id: 'cl', flag: '🇨🇱', country: 'Chile', countryEn: 'Chile', region: 'SOUTH AMERICA', storeName: 'Kokkok Garden Chile', storeUrl: '#', bannerColor: '#d52b1e' },

  // ── CIS ──
  { id: 'ru', flag: '🇷🇺', country: 'Россия', countryEn: 'Russia', region: 'CIS', storeName: 'Kokkok Garden Russia', storeUrl: '#', bannerColor: '#cc0000' },
  { id: 'kz', flag: '🇰🇿', country: 'Қазақстан', countryEn: 'Kazakhstan', region: 'CIS', storeName: 'Kokkok Garden Kazakhstan', storeUrl: '#', bannerColor: '#00AFCA' },
];

const REGIONS = ['ALL', 'ASIA', 'NORTH AMERICA', 'SOUTH AMERICA', 'EUROPE', 'OCEANIA', 'MIDDLE EAST', 'AFRICA', 'CIS'] as const;

const PAGE_LABELS: Record<string, {
  heroTitle: string; heroSub: string; filterLabel: string; visitStore: string; comingSoon: string;
}> = {
  kr: { heroTitle: '전 세계에서 콕콕가든을 만나보세요', heroSub: '글로벌 파트너와 함께하는 K-뷰티', filterLabel: '지역 선택', visitStore: '스토어 방문', comingSoon: '준비중' },
  en: { heroTitle: 'Shop Kokkok Garden Worldwide', heroSub: 'Available across the globe through our trusted partners', filterLabel: 'Filter by Region', visitStore: 'Visit Store', comingSoon: 'Coming Soon' },
  cn: { heroTitle: '全球购买 Kokkok Garden', heroSub: '通过我们的全球合作伙伴体验韩国美妆', filterLabel: '按地区筛选', visitStore: '访问商店', comingSoon: '即将上线' },
  jp: { heroTitle: '世界中でコッコクガーデンを', heroSub: 'グローバルパートナーと共にお届けするK-ビューティー', filterLabel: 'エリアで絞り込む', visitStore: 'ストアへ', comingSoon: '準備中' },
  vn: { heroTitle: 'Mua Kokkok Garden Toàn Cầu', heroSub: 'Có mặt khắp nơi qua các đối tác tin cậy của chúng tôi', filterLabel: 'Lọc theo khu vực', visitStore: 'Ghé Cửa Hàng', comingSoon: 'Sắp Ra Mắt' },
  th: { heroTitle: 'ช้อป Kokkok Garden ทั่วโลก', heroSub: 'พบกับผลิตภัณฑ์ K-Beauty ผ่านพาร์ทเนอร์ทั่วโลก', filterLabel: 'กรองตามภูมิภาค', visitStore: 'เข้าร้านค้า', comingSoon: 'เร็วๆ นี้' },
};

interface ShopWorldwideProps { lang: string; }

export default function ShopWorldwide({ lang }: ShopWorldwideProps) {
  const [activeRegion, setActiveRegion] = useState<string>('ALL');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const labels = PAGE_LABELS[lang] ?? PAGE_LABELS['en'];

  const filtered = activeRegion === 'ALL'
    ? RETAILERS
    : RETAILERS.filter(r => r.region === activeRegion);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="relative bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* Subtle globe grid background */}
          <svg viewBox="0 0 800 400" className="w-full h-full" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <ellipse key={i} cx="400" cy="200" rx={40 + i * 35} ry={40 + i * 16} fill="none" stroke="white" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1="400" y1="0" x2={400 + 300 * Math.cos((i * Math.PI) / 6)} y2={200 + 200 * Math.sin((i * Math.PI) / 6)} stroke="white" strokeWidth="0.5" />
            ))}
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest border border-white/20">
            <Globe className="w-3.5 h-3.5" />
            SHOP WORLDWIDE
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            {labels.heroTitle}
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">
            {labels.heroSub}
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            {['🇰🇷', '🇺🇸', '🇯🇵', '🇨🇳', '🇬🇧', '🇸🇬', '🇦🇺', '🇫🇷', '🇩🇪', '🇹🇭', '🇻🇳', '🇦🇪'].map(f => (
              <span key={f} className="text-2xl opacity-70 hover:opacity-100 transition-opacity">{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Breadcrumb + Filter Tabs ───────────────────────────────────── */}
      <div className="sticky top-[66px] z-30 bg-white border-b border-neutral-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-1 py-1 text-[11px] text-neutral-400 font-semibold mb-2 pt-3">
            <span>HOME</span><span className="mx-1">›</span><span>SHOP WORLDWIDE</span><span className="mx-1">›</span>
            <span className="text-black">{activeRegion}</span>
          </div>
          <div className="flex gap-1 overflow-x-auto pb-3 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {REGIONS.map(r => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`flex-none px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider transition-all whitespace-nowrap ${
                  activeRegion === r
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Countries Grid ────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-[11px] text-neutral-400 font-semibold tracking-widest mb-8">
          {labels.filterLabel} — <span className="text-black">{filtered.length}</span>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(retailer => {
            const isHovered = hoveredId === retailer.id;
            const isComingSoon = retailer.storeUrl === '#';

            return (
              <div
                key={retailer.id}
                className="relative group rounded-2xl overflow-hidden border border-neutral-100 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                onMouseEnter={() => setHoveredId(retailer.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Color banner / accent */}
                <div
                  className="h-16 flex items-center justify-center text-4xl transition-all duration-300"
                  style={{ backgroundColor: retailer.bannerColor, opacity: isHovered ? 1 : 0.85 }}
                >
                  {retailer.flag}
                </div>

                {/* Card body */}
                <div className="p-4 bg-white">
                  <p className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase mb-0.5">
                    {retailer.countryEn}
                  </p>
                  <p className="text-sm font-bold text-[#111111] leading-snug">{retailer.country}</p>
                  <p className="text-[11px] text-neutral-500 mt-1 leading-tight truncate">{retailer.storeName}</p>
                </div>

                {/* Hover overlay → Visit Store CTA */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  style={{ backgroundColor: `${retailer.bannerColor}ee` }}>
                  <span className="text-3xl">{retailer.flag}</span>
                  <p className="text-white font-bold text-sm text-center px-2">{retailer.storeName}</p>

                  {isComingSoon ? (
                    <span className="mt-1 px-3 py-1 bg-white/20 text-white text-[10px] font-bold rounded-full tracking-widest border border-white/30">
                      {labels.comingSoon}
                    </span>
                  ) : (
                    <a
                      href={retailer.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center gap-1.5 px-4 py-1.5 bg-white text-[#111111] text-[11px] font-black rounded-full tracking-widest hover:bg-neutral-100 transition-colors"
                    >
                      {labels.visitStore} <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── B2B Footer CTA ───────────────────────────────────────────── */}
      <div className="bg-neutral-50 border-t border-neutral-100 py-16 text-center mt-8">
        <p className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase mb-3">
          Become a Partner
        </p>
        <h2 className="text-2xl font-black text-[#111111] mb-4">
          {lang === 'kr' ? '파트너십 문의' : 'Want to carry Kokkok Garden?'}
        </h2>
        <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
          {lang === 'kr'
            ? '전 세계 파트너 모집 중입니다. 아래 버튼으로 문의해주세요.'
            : 'We are actively seeking new global retail partners. Reach out to us to learn more.'}
        </p>
        <a
          href="mailto:global@kokkok.garden"
          className="inline-flex items-center gap-2 bg-[#111111] text-white px-8 py-3 text-xs font-bold tracking-widest hover:bg-black transition-colors rounded-none"
        >
          global@kokkok.garden
        </a>
      </div>
    </div>
  );
}
