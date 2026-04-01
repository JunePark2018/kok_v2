import Link from 'next/link';
import { LayoutDashboard, Package, Image as ImageIcon, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col">
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-xl font-bold tracking-tight">Kokkok Garden</h2>
          <p className="text-xs text-neutral-400 mt-1">Admin CMS</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors text-sm text-neutral-300 hover:text-white">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors text-sm text-neutral-300 hover:text-white">
            <Package className="w-4 h-4" /> Products
          </Link>
          <Link href="/admin/media" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors text-sm text-neutral-300 hover:text-white">
            <ImageIcon className="w-4 h-4" /> Media & Story
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors text-sm text-neutral-300 hover:text-white">
            <Settings className="w-4 h-4" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-neutral-800">
          <Link href="/" className="text-sm text-neutral-500 hover:text-white transition-colors">
            Exit to Site &rarr;
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-neutral-900 p-8">
        {children}
      </main>
    </div>
  );
}
