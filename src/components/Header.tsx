import Link from 'next/link';
import { Search, ShoppingBag, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Mobile Menu Icon (Hamburger) */}
          <div className="flex items-center sm:hidden">
            <button className="text-neutral-900 p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 sm:flex-none">
            <Link href="/" className="text-xl font-extrabold tracking-tighter text-black uppercase">
              Kokkok Garden
            </Link>
          </div>

          {/* Desktop Nav - Centered Ingredient Filtering */}
          <nav className="hidden sm:flex sm:space-x-8 sm:flex-1 sm:justify-center">
            <Link href="/products" className="text-neutral-900 text-xs font-semibold hover:text-neutral-500 transition-colors">SHOP ALL</Link>
            <Link href="/products?ingredient=heartleaf" className="text-neutral-900 text-xs font-semibold hover:text-neutral-500 transition-colors">어성초</Link>
            <Link href="/products?ingredient=jericho" className="text-neutral-900 text-xs font-semibold hover:text-neutral-500 transition-colors">부활초</Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-5">
            <button className="text-neutral-900 hover:text-neutral-600 transition-colors"><Search className="w-5 h-5" /></button>
            <Link href="/login" className="text-neutral-900 hover:text-neutral-600 transition-colors"><User className="w-5 h-5" /></Link>
            <Link href="/cart" className="text-neutral-900 hover:text-neutral-600 transition-colors"><ShoppingBag className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>
    </header>
  );
}
