import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function ProductsAdminPage() {
  const products = [
    { id: '1', name: '레티놀 바운스 세럼', price: 23400, stock: 154, status: 'Published' },
    { id: '2', name: 'EGF 글로우 젤리 세럼', price: 23400, stock: 89, status: 'Published' },
    { id: '3', name: '액티브 리커버리 크림', price: 23400, stock: 42, status: 'Published' },
    { id: '4', name: '퓨어 클렌징 오일', price: 26000, stock: 0, status: 'Out of Stock' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Products Inventory</h2>
          <p className="text-sm text-gray-500 mt-1">Manage storefront items (Mocked Database)</p>
        </div>
        <button className="bg-[#111111] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-black transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
              <th className="p-4 pl-6 w-16">ID</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 pl-6 text-gray-400 font-mono text-sm">#{item.id}</td>
                <td className="p-4 font-bold text-gray-900">{item.name}</td>
                <td className="p-4 text-gray-600">{item.price.toLocaleString()}원</td>
                <td className="p-4 text-gray-600">{item.stock} 개</td>
                <td className="p-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 pr-6 text-right space-x-3">
                  <button className="text-gray-400 hover:text-blue-600 transition-colors"><Edit2 className="w-4 h-4 inline" /></button>
                  <button className="text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4 inline" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
