'use client';
import { Lock } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === 'admin123' && password === '456789123') {
      // Set a simple cookie to simulate auth token
      document.cookie = "kokkok_admin_auth=true; path=/; max-age=86400"; // 1 day expiry
      window.location.href = '/admin';
    } else {
      setError('Invalid User ID or Password.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white p-4">
      <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6 flex-shrink-0">
          <Lock className="w-5 h-5 text-neutral-400" />
        </div>
        
        <h1 className="text-2xl font-bold tracking-tight text-center mb-2">Admin Login</h1>
        <p className="text-sm text-neutral-400 text-center mb-8">Access the Kokkok Garden CMS</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">User ID</label>
            <input 
              type="text" 
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="e.g. admin123"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-600 transition text-sm text-white" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-600 transition text-sm text-white" 
            />
          </div>

          {error && <p className="text-red-400 text-xs font-semibold text-center pt-2">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-white text-black py-2.5 rounded-lg font-medium text-sm hover:bg-neutral-200 transition mt-4"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6 text-center">
           <p className="text-xs text-neutral-500">Secured via Custom Next.js Auth Middleware</p>
        </div>
      </div>
    </div>
  );
}
