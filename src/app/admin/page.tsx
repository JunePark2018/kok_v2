import { Users, Package, Video } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { title: '총 사용자', value: '1,204', icon: Users, color: 'bg-blue-500', href: '/admin/users' },
    { title: '활성 상품', value: '12', icon: Package, color: 'bg-green-500', href: '/admin/products' },
    { title: '라이브 숏츠', value: '10', icon: Video, color: 'bg-purple-500', href: '/admin/shorts' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex items-center">
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-white ${stat.color} shadow-sm group-hover:scale-105 transition-transform`}>
                <Icon className="w-7 h-7" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">콕콕가든 관리자 포털에 오신 것을 환영합니다</h2>
        <p className="text-gray-600">
          현재 대시보드는 <strong>목업 모드</strong>로 실행 중입니다. 사이드바를 통해 사용자, 상품, 숏츠의 목업 데이터를 확인하실 수 있습니다.
          곧 Supabase PostgreSQL 데이터베이스와 직접 연동될 예정입니다.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
            <p className="text-sm font-semibold text-gray-700 mb-1">🌍 지역 라우팅</p>
            <p className="text-xs text-gray-500">한국 방문자 → /kr/kr (구매 가능)<br/>해외 방문자 → /gl/en (열람 전용 + AI 챗봇)</p>
          </div>
          <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
            <p className="text-sm font-semibold text-gray-700 mb-1">🌐 다국어 지원</p>
            <p className="text-xs text-gray-500">한국어, 영어, 중국어, 일본어, 베트남어, 태국어</p>
          </div>
        </div>
      </div>
    </div>
  );
}
