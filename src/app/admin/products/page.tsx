import { PlusCircle, Search, UploadCloud } from 'lucide-react';

export default function ProductsManager() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Products Manager</h1>
        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-neutral-200 transition">
          <PlusCircle className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-neutral-800/40 border border-neutral-700/50 rounded-xl p-6">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-neutral-500 transition focus:ring-1 focus:ring-neutral-500 text-white"
            />
          </div>
        </div>

        {/* Table placeholder */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-700 text-sm text-neutral-400">
                <th className="py-3 font-medium">Product Name</th>
                <th className="py-3 font-medium">Price</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium">Naver Store Link</th>
                <th className="py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-neutral-800/50 hover:bg-neutral-800/20 transition">
                <td className="py-4">No products found.</td>
                <td className="py-4">-</td>
                <td className="py-4">-</td>
                <td className="py-4">-</td>
                <td className="py-4 text-right">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Form Modal Section (Visible for Demonstration) */}
      <div className="mt-8 bg-neutral-800/40 border border-neutral-700/50 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">Create New Product (Demo UI)</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Name</label>
            <input type="text" className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-neutral-500 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Price</label>
            <input type="number" className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-neutral-500 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Description</label>
            <textarea className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-neutral-500 text-white h-24"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Naver Smart Store URL</label>
            <input type="url" className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-neutral-500 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Image Upload (Supabase Storage Prep)</label>
            <div className="border-2 border-dashed border-neutral-700 hover:border-neutral-500 transition rounded-lg p-8 flex flex-col items-center justify-center text-sm text-neutral-400 cursor-pointer text-center bg-neutral-900">
              <UploadCloud className="w-6 h-6 mb-2" />
              <span>Drag and drop an image, or click to browse</span>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button type="button" className="bg-white text-black px-6 py-2 rounded-lg font-medium text-sm hover:bg-neutral-200 transition">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
