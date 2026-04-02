import { Search } from 'lucide-react';

export default function UsersAdminPage() {
  const users = [
    { id: '1', email: 'hyunsik@neofact.com', role: 'admin', created: '2026-03-01', status: 'Active' },
    { id: '2', email: 'customer1@gmail.com', role: 'user', created: '2026-03-15', status: 'Active' },
    { id: '3', email: 'testbuyer@naver.com', role: 'user', created: '2026-03-20', status: 'Inactive' },
    { id: '4', email: 'marketing_team@neo.com', role: 'user', created: '2026-03-22', status: 'Active' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 className="text-lg font-bold text-gray-800">User Accounts</h2>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/5"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
              <th className="p-4 pl-6">ID / Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created At</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 pl-6">
                  <div className="font-medium text-gray-900">{user.email}</div>
                  <div className="text-xs text-gray-400 mt-0.5">UUID: {user.id}-xxxx-xxxx</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-bold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 text-sm ${user.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">{user.created}</td>
                <td className="p-4 pr-6 text-right">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
