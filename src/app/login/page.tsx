import { Lock } from 'lucide-react';

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white p-4">
      <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6 flex-shrink-0">
          <Lock className="w-5 h-5 text-neutral-400" />
        </div>
        
        <h1 className="text-2xl font-bold tracking-tight text-center mb-2">Admin Login</h1>
        <p className="text-sm text-neutral-400 text-center mb-8">Access the Kokkok Garden CMS</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Email / ID</label>
            <input 
              type="text" 
              placeholder="admin@kokkokgarden.com"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-600 transition text-sm text-white" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-600 transition text-sm text-white" 
            />
          </div>
          <button 
            type="button" 
            className="w-full bg-white text-black py-2.5 rounded-lg font-medium text-sm hover:bg-neutral-200 transition mt-4"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-500">Authentication is simulated pending live Supabase integration.</p>
        </div>
      </div>
    </div>
  );
}
