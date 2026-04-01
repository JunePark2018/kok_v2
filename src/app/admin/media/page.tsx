import { UploadCloud, Image as ImageIcon } from 'lucide-react';

export default function MediaManager() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Media & Story Manager</h1>
        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-neutral-200 transition">
          <UploadCloud className="w-4 h-4" /> Upload Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Media Card */}
        <div className="bg-neutral-800/40 border border-neutral-700/50 rounded-xl overflow-hidden group">
          <div className="h-48 bg-neutral-900 flex items-center justify-center relative">
            <ImageIcon className="w-8 h-8 text-neutral-600" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition">Edit</button>
              <button className="bg-red-900/50 hover:bg-red-900 text-red-200 px-3 py-1.5 rounded-md text-xs font-medium border border-red-800 transition">Delete</button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-sm truncate">Placeholder Story Segment 1</h3>
            <p className="text-xs text-neutral-500 mt-1">Image • Uploaded Today</p>
          </div>
        </div>
        
        {/* Add New Area */}
        <div className="border-2 border-dashed border-neutral-800 hover:border-neutral-600 bg-neutral-800/20 hover:bg-neutral-800/40 transition rounded-xl flex flex-col items-center justify-center h-[264px] cursor-pointer text-neutral-500 hover:text-neutral-300">
           <UploadCloud className="w-8 h-8 mb-2" />
           <span className="text-sm font-medium">Click to upload new media</span>
           <span className="text-xs mt-1">Supports Images & Videos</span>
        </div>
      </div>
    </div>
  );
}
