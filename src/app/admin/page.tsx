export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
          <h3 className="text-neutral-400 text-sm font-medium">Total Products</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
          <h3 className="text-neutral-400 text-sm font-medium">Media Assets</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700/50">
          <h3 className="text-neutral-400 text-sm font-medium">Total Orders (Draft)</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
      </div>
      
      <div className="mt-8 bg-neutral-800/30 border border-neutral-700/50 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <p className="text-neutral-400 text-sm">No recent activity detected.</p>
      </div>
    </div>
  );
}
