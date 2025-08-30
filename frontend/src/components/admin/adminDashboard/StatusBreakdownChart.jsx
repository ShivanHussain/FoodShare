import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCw, BarChart3 } from 'lucide-react';

export function StatusBreakdownChart({ data, loading, error }) {
  const formatChartData = () => {
    if (!data || !Array.isArray(data)) return [];
    
    const statusColors = {
      'available': '#10b981',
      'claimed': '#3b82f6',
      'picked-up': '#8b5cf6',
      'expired': '#ef4444',
      'cancelled': '#6b7280'
    };

    return data.map(item => ({
      status: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      count: item.count,
      percentage: parseFloat(item.percentage),
      quantity: item.totalQuantity,
      fill: statusColors[item._id] || '#6b7280'
    }));
  };

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Status Breakdown</h3>
        </div>
        <div className="h-64 flex items-center justify-center text-red-500">
          <p>Error loading data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Status Breakdown</h3>
      </div>
      
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading status data...</p>
          </div>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formatChartData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="status" 
                stroke="#666"
                fontSize={12}
              />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'count' ? `${value} donations` : `${value}%`,
                  name === 'count' ? 'Count' : 'Percentage'
                ]}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="count" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
