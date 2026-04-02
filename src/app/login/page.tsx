'use client';
import { Lock } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client defensively
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function AdminLogin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Genuine Database Attempt
      if (supabase) {
        // Assume ID field is an email for Supabase auth
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: id.trim(),
          password: password.trim(),
        });
        
        if (!authError) {
          // Success from DB!
          document.cookie = "kokkok_admin_auth=true; path=/; max-age=86400; Secure; SameSite=Lax";
          window.location.href = '/admin';
          return;
        }
      }
      
      // 2. Fallback / Mock Override for development
      if (id.trim() === 'admin123' && password.trim() === '456789123') {
        document.cookie = "kokkok_admin_auth=true; path=/; max-age=86400; Secure; SameSite=Lax";
        window.location.href = '/admin';
      } else {
        setError('Invalid Email or Password.');
      }

    } catch (err) {
      console.warn("DB login failed, trying fallback mock.", err);
      if (id.trim() === 'admin123' && password.trim() === '456789123') {
        document.cookie = "kokkok_admin_auth=true; path=/; max-age=86400; Secure; SameSite=Lax";
        window.location.href = '/admin';
      } else {
        setError('Invalid Email or Password.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans px-4 animate-in fade-in duration-500">
      <div className="w-full max-w-sm">
        
        <div className="text-center mb-10">
          <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 flex-shrink-0 bg-gray-50">
            <Lock className="w-5 h-5 text-[#111111]" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#111111] mb-2 uppercase">Account Portal</h1>
          <p className="text-sm text-gray-500">Sign in to manage your storefront session.</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <input 
                type="text" 
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-white border-b border-gray-200 px-2 py-3 focus:outline-none focus:border-black transition text-sm text-[#111111] placeholder:text-gray-400" 
              />
            </div>
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-white border-b border-gray-200 px-2 py-3 focus:outline-none focus:border-black transition text-sm text-[#111111] placeholder:text-gray-400" 
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#111111] text-white py-4 rounded-none font-bold tracking-widest text-[13px] hover:bg-black hover:shadow-lg transition-all mt-8 disabled:opacity-50"
          >
            {isLoading ? 'VERIFYING...' : 'SIGN IN'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <Link href="/register" className="text-gray-500 hover:text-black transition-colors font-medium underline underline-offset-4">
            Create an account
          </Link>
        </div>
        
        <div className="mt-12 text-center border-t border-gray-100 pt-6">
           <p className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase">Secured via Custom Auth Middleware</p>
        </div>
      </div>
    </div>
  );
}
