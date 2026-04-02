import { Users, Package, Video } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Users', value: '1,204', icon: Users, color: 'bg-blue-500', href: '/admin/users' },
    { title: 'Active Products', value: '12', icon: Package, color: 'bg-green-500', href: '/admin/products' },
    { title: 'Live Shorts', value: '10', icon: Video, color: 'bg-purple-500', href: '/admin/shorts' },
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
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Welcome to Kokkok Garden Admin</h2>
        <p className="text-gray-600">
          This dashboard is currently running in <strong>Mock Mode</strong>. You can navigate through the sidebar to view mock data for Users, Products, and Shorts. 
          When Phase 2 begins, we will connect these tables directly to your Supabase PostgreSQL database.
        </p>
      </div>
    </div>
  );
}
