// ImpactChart.js Environmental Impact Area Chart
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCw } from 'lucide-react';

const ImpactChart = ({ impactData, loading, error, onRetry }) => {
  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-64 sm:h-72 lg:h-80">
      <RefreshCw className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-blue-500" />
    </div>
  );

  // Error component
  const ErrorMessage = ({ message, onRetry }) => (
    <div className="flex flex-col items-center justify-center h-64 sm:h-72 lg:h-80 text-center px-4">
      <p className="text-red-500 mb-4 text-sm sm:text-base">{message}</p>
      <button
        onClick={onRetry}
        className="px-3 py-2 sm:px-4 text-sm sm:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 
        transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-0">
          Environmental Impact Over Time
        </h3>
        
        {/* Legend */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-xs sm:text-sm text-gray-600">Meals</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xs sm:text-sm text-gray-600">CO₂ Saved</span>
          </div>
        </div>
      </div>

      {/* Chart Content */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={onRetry} />
      ) : (
        <div className="w-full">
          <ResponsiveContainer width="100%" height={250} className="sm:h-80 lg:h-96">
            <AreaChart 
              data={impactData}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="mealsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280" 
                fontSize={12}
                className="sm:text-sm"
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={12}
                className="sm:text-sm"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  fontSize: '14px'
                }}
              />
              
              <Area
                type="monotone"
                dataKey="meals"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#mealsGradient)"
                strokeWidth={2}
                className="sm:stroke-width-3"
              />
              <Area
                type="monotone"
                dataKey="co2"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#co2Gradient)"
                strokeWidth={2}
                className="sm:stroke-width-3"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ImpactChart;