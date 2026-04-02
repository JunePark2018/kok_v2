'use client';
import { useState } from 'react';
import { Video, Trash2, Plus } from 'lucide-react';

export default function ShortsAdminPage() {
  const [shorts, setShorts] = useState([
    { id: '1', youtubeId: 'ho0EhuO3RNs', addedAt: '2026-04-01' },
    { id: '2', youtubeId: 'lD1VId0ec2s', addedAt: '2026-04-01' },
    { id: '3', youtubeId: 'mkBTUDxMKtU', addedAt: '2026-04-02' },
    { id: '4', youtubeId: 'yPRcriD4FcM', addedAt: '2026-04-02' },
  ]);

  const [newUrl, setNewUrl] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    
    // Simple extraction logic for youtube URLs
    const match = newUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|shorts\/)([^"&?\/\s]{11})/);
    const videoId = match ? match[1] : (newUrl.length === 11 ? newUrl : null);

    if (videoId) {
      setShorts([{ id: Date.now().toString(), youtubeId: videoId, addedAt: new Date().toISOString().split('T')[0] }, ...shorts]);
      setNewUrl('');
      alert(`[MOCK SUCCESS] YouTube ID '${videoId}' added! In Phase 2, this will update the Supabase 'public.shorts' table and immediately reflect on the homepage.`);
    } else {
      alert('Invalid YouTube URL or ID');
    }
  };

  const handleDelete = (id: string) => {
    setShorts(shorts.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Add New Short */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><Video className="w-5 h-5 text-purple-500" /> Add New Brand Short</h2>
        <form onSubmit={handleAdd} className="flex gap-4">
          <input 
            type="text" 
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Paste YouTube Shorts URL or Video ID (e.g. ho0EhuO3RNs)"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/5"
          />
          <button type="submit" className="bg-[#111111] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-black transition-colors whitespace-nowrap flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add to Feed
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-3">The homepage will automatically sync to show up to 10 of these videos.</p>
      </div>

      {/* Active Shorts Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-800">Currently Live on Storefront</h2>
          <span className="text-sm font-medium text-gray-500">{shorts.length} Items</span>
        </div>
        
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {shorts.map((short) => (
            <div key={short.id} className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
              <div className="aspect-[9/16] w-full">
                <img 
                  src={`https://i.ytimg.com/vi/${short.youtubeId}/hqdefault.jpg`} 
                  alt="Thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/60 to-transparent flex justify-between items-start">
                <span className="text-[10px] text-white font-mono bg-black/50 px-2 py-1 rounded backdrop-blur-sm">{short.youtubeId}</span>
                <button 
                  onClick={() => handleDelete(short.id)}
                  className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3 text-xs text-gray-500 font-medium">Added: {short.addedAt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
