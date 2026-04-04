'use client';

import { Users, Package, Video, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/api/products';

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalShorts: number;
  isLive: boolean; // true if DB connected, false if mock
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeProducts: 0,
    totalShorts: 0,
    isLive: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  async function fetchStats() {
    setIsLoading(true);
    try {
      if (!supabase) throw new Error('No client');

      const [productsRes, activeRes, shortsRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('shorts').select('id', { count: 'exact', head: true }),
      ]);

      if (productsRes.error && activeRes.error) throw new Error('DB error');

      setStats({
        totalProducts: productsRes.count ?? 0,
        activeProducts: activeRes.count ?? 0,
        totalShorts: shortsRes.count ?? 0,
        isLive: true,
      });
    } catch {
      setStats({
        totalProducts: 3,
        activeProducts: 3,
        totalShorts: 4,
        isLive: false,
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchStats(); }, []);

  const cards = [
    { title: '전체 상품', value: stats.totalProducts, icon: Package, color: 'bg-blue-500', href: '/admin/products' },
    { title: '게시중 상품', value: stats.activeProducts, icon: Package, color: 'bg-green-500', href: '/admin/products' },
    { title: '등록 숏츠', value: stats.totalShorts, icon: Video, color: 'bg-purple-500', href: '/admin/shorts' },
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
        <button
          onClick={fetchStats}
          disabled={isLoading}
          className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          새로고침
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex items-center">
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-white ${card.color} shadow-sm group-hover:scale-105 transition-transform`}>
                <Icon className="w-7 h-7" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoading ? '...' : card.value}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">콕콕가든 관리자 포털</h2>
        <p className="text-gray-600 text-sm">
          사이드바를 통해 상품, 숏츠를 관리할 수 있습니다. 상품 추가 시 네이버 스토어 URL을 입력하면 고객이 바로 네이버 스토어에서 구매할 수 있습니다.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
            <p className="text-sm font-semibold text-gray-700 mb-1">지역 라우팅</p>
            <p className="text-xs text-gray-500">한국 방문자 → /kr/kr (구매 가능)<br/>해외 방문자 → /gl/en (열람 전용 + AI 챗봇)</p>
          </div>
          <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
            <p className="text-sm font-semibold text-gray-700 mb-1">다국어 지원</p>
            <p className="text-xs text-gray-500">한국어, 영어, 중국어, 일본어, 베트남어, 태국어<br/>상품 정보 GPT 자동 번역 (24시간 캐시)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
