'use client';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client defensively
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function RegisterAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setIsLoading(false);
      return;
    }

    try {
      if (supabase) {
        // Genuine DB Account Creation
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
        });
        
        if (authError) {
           setError(authError.message);
        } else {
           setSuccess(true);
        }
      } else {
        // Simulation Environment Trigger
        throw new Error("No database connected.");
      }
    } catch (err) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans px-4 animate-in fade-in duration-500">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 font-extrabold text-2xl">
            ✓
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#111111] mb-4">Account Created</h1>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            Your account has been securely provisioned (or simulated in mock mode). You can now log into the portal.
          </p>
          <Link href="/login" className="px-8 py-3 bg-[#111111] text-white tracking-widest text-xs font-bold w-full block">
            RETURN TO LOGIN
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans px-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full max-w-sm">
        
        <div className="text-center mb-10">
          <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 flex-shrink-0 bg-gray-50">
            <UserPlus className="w-5 h-5 text-[#111111]" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#111111] mb-2 uppercase">Create Account</h1>
          <p className="text-sm text-gray-500">Register securely for the Kokkok Garden storefront.</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-4">
            <div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="w-full bg-white border-b border-gray-200 px-2 py-3 focus:outline-none focus:border-black transition text-sm text-[#111111] placeholder:text-gray-400" 
              />
            </div>
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Secure Password (min 6 chars)"
                required
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
            {isLoading ? 'CREATING...' : 'REGISTER'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <Link href="/login" className="text-gray-500 hover:text-black transition-colors font-medium underline underline-offset-4">
            Back to login
          </Link>
        </div>
        
        <div className="mt-12 text-center border-t border-gray-100 pt-6">
           <p className="text-[11px] font-semibold text-gray-400 tracking-widest uppercase">Secured via Supabase Auth</p>
        </div>
      </div>
    </div>
  );
}
