import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCw, BarChart3 } from 'lucide-react';


export function MonthlyComparisonChart({ data, loading, error }) {

  const formatChartData = () => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.map(item => ({
      month: item.month,
      totalDonations: item.totalDonations,
      claimedDonations: item.claimedDonations,
      expiredDonations: item.expiredDonations,
      successRate: parseFloat(item.successRate)
    }));
  };

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Monthly Comparison</h3>
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
        <h3 className="text-xl font-bold text-gray-900">Monthly Comparison</h3>
      </div>
      
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading monthly data...</p>
          </div>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formatChartData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#666"
                fontSize={12}
              />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="totalDonations" 
                stackId="1"
                stroke="#10b981" 
                fill="#10b981"
                fillOpacity={0.6}
                name="Total Donations"
              />
              <Area 
                type="monotone" 
                dataKey="claimedDonations" 
                stackId="2"
                stroke="#3b82f6" 
                fill="#3b82f6"
                fillOpacity={0.6}
                name="Claimed Donations"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

