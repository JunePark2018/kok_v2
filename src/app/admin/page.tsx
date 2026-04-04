'use client';

import { Package, Video, RefreshCw, Globe, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/api/products';

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalShorts: number;
  totalVisits: number;
  isLive: boolean;
}

interface CountryStat {
  country: string;
  count: number;
}

interface TopPage {
  path: string;
  count: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0, activeProducts: 0, totalShorts: 0, totalVisits: 0, isLive: false,
  });
  const [countries, setCountries] = useState<CountryStat[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchStats() {
    setIsLoading(true);
    try {
      if (!supabase) throw new Error('No client');

      const [productsRes, activeRes, shortsRes, visitsRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('shorts').select('id', { count: 'exact', head: true }),
        supabase.from('analytics').select('id', { count: 'exact', head: true }),
      ]);

      if (productsRes.error && activeRes.error) throw new Error('DB error');

      // Fetch country breakdown
      const { data: analyticsData } = await supabase
        .from('analytics')
        .select('country, path');

      const countryMap: Record<string, number> = {};
      const pageMap: Record<string, number> = {};
      if (analyticsData) {
        for (const row of analyticsData) {
          countryMap[row.country || 'UNKNOWN'] = (countryMap[row.country || 'UNKNOWN'] || 0) + 1;
          pageMap[row.path || '/'] = (pageMap[row.path || '/'] || 0) + 1;
        }
      }

      const sortedCountries = Object.entries(countryMap)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count);

      const sortedPages = Object.entries(pageMap)
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setCountries(sortedCountries);
      setTopPages(sortedPages);

      setStats({
        totalProducts: productsRes.count ?? 0,
        activeProducts: activeRes.count ?? 0,
        totalShorts: shortsRes.count ?? 0,
        totalVisits: visitsRes.count ?? 0,
        isLive: true,
      });
    } catch {
      setStats({ totalProducts: 0, activeProducts: 0, totalShorts: 0, totalVisits: 0, isLive: false });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchStats(); }, []);

  const COUNTRY_NAMES: Record<string, string> = {
    KR: '한국', US: '미국', JP: '일본', CN: '중국', GB: '영국', DE: '독일',
    FR: '프랑스', SG: '싱가포르', AU: '호주', CA: '캐나다', TH: '태국',
    VN: '베트남', TW: '대만', HK: '홍콩', UNKNOWN: '알 수 없음',
  };

  const cards = [
    { title: '전체 상품', value: stats.totalProducts, icon: Package, color: 'bg-blue-500', href: '/admin/products' },
    { title: '게시중 상품', value: stats.activeProducts, icon: Package, color: 'bg-green-500', href: '/admin/products' },
    { title: '등록 숏츠', value: stats.totalShorts, icon: Video, color: 'bg-purple-500', href: '/admin/shorts' },
    { title: '총 방문수', value: stats.totalVisits, icon: Eye, color: 'bg-orange-500', href: '#' },
  ];

  return (
    <div>
      {/* Connection status */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${stats.isLive ? 'bg-green-500' : 'bg-amber-400'}`} />
          <span className="text-xs font-semibold text-gray-500">
            {stats.isLive ? 'Supabase 연결됨' : '목업 모드 (DB 미연결)'}
          </span>
        </div>
        <button onClick={fetchStats} disabled={isLoading}
          className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors">
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} /> 새로고침
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex items-center">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${card.color} shadow-sm group-hover:scale-105 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-xs font-medium text-gray-500">{card.title}</p>
                <p className="text-xl font-bold text-gray-900">{isLoading ? '...' : card.value}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Analytics section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Country breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-5 h-5 text-gray-400" />
            <h3 className="font-bold text-gray-800">국가별 방문</h3>
          </div>
          {countries.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">아직 방문 데이터가 없습니다</p>
          ) : (
            <div className="space-y-3">
              {countries.slice(0, 10).map(({ country, count }) => {
                const maxCount = countries[0]?.count || 1;
                const pct = Math.round((count / maxCount) * 100);
                return (
                  <div key={country}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {COUNTRY_NAMES[country] || country}
                      </span>
                      <span className="text-xs font-bold text-gray-500">{count}회</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top pages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Eye className="w-5 h-5 text-gray-400" />
            <h3 className="font-bold text-gray-800">인기 페이지</h3>
          </div>
          {topPages.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">아직 방문 데이터가 없습니다</p>
          ) : (
            <div className="space-y-2">
              {topPages.map(({ path, count }, i) => (
                <div key={path} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">{i + 1}</span>
                  <span className="text-sm text-gray-700 font-mono truncate flex-1">{path}</span>
                  <span className="text-xs font-bold text-gray-400">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
