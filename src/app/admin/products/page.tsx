'use client';

import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Product, supabase, MOCK_PRODUCTS } from '@/lib/api/products';

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    summary: '',
    ingredient: '',
    price: '',
    originalPrice: '',
    imageUrl: '',
    description: ''
  });

  useEffect(() => {
    async function fetchAll() {
      try {
        if (!supabase) throw new Error("No client");
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setProducts(data.map(d => ({
          id: d.id,
          name: d.name,
          summary: d.summary || '',
          ingredient: d.ingredient || '',
          description: d.description || '',
          price: Number(d.price),
          originalPrice: Number(d.original_price || d.price),
          imageUrl: (d.images && d.images.length > 0) ? d.images[0] : '',
          is_active: d.is_active
        })));
      } catch (err) {
        console.warn("DB pull failed. Mock active.");
        setProducts(MOCK_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAll();
  }, []);

  const handleToggle = async (id: string, currentStatus: boolean) => {
    // Optimistic UI update
    setProducts(products.map(p => p.id === id ? { ...p, is_active: !currentStatus } : p));
    
    try {
      if (!supabase) throw new Error("No client");
      await supabase.from('products').update({ is_active: !currentStatus }).eq('id', id);
    } catch {
       console.warn("DB sync failed for toggle");
    }
  };

  const handleDelete = async (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    try {
      if (!supabase) throw new Error("No client");
      await supabase.from('products').delete().eq('id', id);
    } catch {
       console.warn("DB sync failed for delete");
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      summary: formData.summary,
      ingredient: formData.ingredient,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice || formData.price),
      imageUrl: formData.imageUrl,
      description: formData.description,
      is_active: true
    };

    // Optimistic UI Insert
    setProducts([newProduct, ...products]);
    setIsModalOpen(false);
    
    // DB Insert
    try {
      if (!supabase) throw new Error("No client");
      await supabase.from('products').insert([{
        name: formData.name,
        summary: formData.summary,
        ingredient: formData.ingredient,
        price: Number(formData.price),
        original_price: Number(formData.originalPrice),
        description: formData.description,
        images: [formData.imageUrl],
        is_active: true
      }]);
    } catch {
       console.warn("DB insert failed. Kept in mock state for frontend session.");
    }
    
    setFormData({ name: '', summary: '', ingredient: '', price: '', originalPrice: '', imageUrl: '', description: '' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Products Inventory</h2>
          <p className="text-sm text-gray-500 mt-1">Manage storefront items and catalog</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#111111] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="overflow-x-auto min-h-[400px]">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-gray-400 font-bold tracking-widest">LOADING...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="p-4 pl-6 w-16">ID</th>
                <th className="p-4">Product Overview</th>
                <th className="p-4">Price</th>
                <th className="p-4">Marketing / Ingredient</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((item) => (
                <tr key={item.id} className={`hover:bg-gray-50/50 transition-colors ${!item.is_active ? 'opacity-50' : ''}`}>
                  <td className="p-4 pl-6 text-gray-400 text-xs truncate max-w-[80px]" title={item.id}>...{item.id.slice(-6)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 border border-gray-200">
                         {item.imageUrl && <img src={item.imageUrl} className="w-full h-full object-cover mix-blend-multiply" alt=""/>}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.summary}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 text-sm font-bold">{item.price.toLocaleString()}원</td>
                  <td className="p-4 text-gray-600 font-mono text-[11px]">{item.ingredient}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleToggle(item.id, item.is_active)}
                      className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors ${
                        item.is_active ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                      }`}
                    >
                      {item.is_active ? 'LIVE' : 'HIDDEN'}
                    </button>
                  </td>
                  <td className="p-4 pr-6 text-right space-x-3">
                    <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-600 transition-colors bg-white p-1.5 rounded-md shadow-sm border border-gray-100">
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Product Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-lg">Add New Product</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black font-bold text-sm">CLOSE</button>
              </div>
              <form onSubmit={handleAddSubmit} className="p-6 overflow-y-auto space-y-4">
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                     <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Product Name</label>
                     <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-200 p-2 text-sm rounded bg-gray-50 focus:bg-white focus:border-black transition outline-none" />
                   </div>
                   <div className="space-y-1">
                     <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Ingredient Tag (e.g. CICA)</label>
                     <input type="text" value={formData.ingredient} onChange={e => setFormData({...formData, ingredient: e.target.value})} className="w-full border border-gray-200 p-2 text-sm rounded bg-gray-50 focus:bg-white focus:border-black transition outline-none" />
                   </div>
                 </div>

                 <div className="space-y-1">
                   <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">One-line Summary</label>
                   <input required type="text" value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full border border-gray-200 p-2 text-sm rounded bg-gray-50 focus:bg-white focus:border-black transition outline-none" placeholder="끈적임없이 촉촉한 기능성 세럼" />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                     <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Current Sale Price</label>
                     <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border border-gray-200 p-2 text-sm rounded bg-gray-50 focus:bg-white focus:border-black transition outline-none" />
                   </div>
                   <div className="space-y-1">
                     <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Original Strike-through Price</label>
                     <input type="number" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})} className="w-full border border-gray-200 p-2 text-sm rounded bg-gray-50 focus:bg-white focus:border-black transition outline-none" />
                   </div>
                 </div>

                 <div className="space-y-1">
                   <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">1:1 Square Image URL</label>
                   <input required type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full border border-gray-200 p-2 text-sm rounded bg-gray-50 focus:bg-white focus:border-black transition outline-none" />
                 </div>

                 <div className="space-y-1">
                   <label className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Long Description</label>
                   <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-200 p-2 text-sm rounded bg-gray-50 focus:bg-white focus:border-black transition outline-none" />
                 </div>
                 
                 <div className="pt-4 border-t border-gray-100 flex justify-end">
                   <button type="submit" className="bg-[#111111] text-white px-8 py-3 rounded text-sm font-bold tracking-widest hover:bg-black w-full sm:w-auto">SAVE PRODUCT</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
