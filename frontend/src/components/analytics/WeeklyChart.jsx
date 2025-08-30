// WeeklyChart.js - Weekly Donations Bar Chart
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCw } from 'lucide-react';

const WeeklyChart = ({ weeklyData, loading, error, onRetry }) => {
  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-48 sm:h-64 lg:h-72">
      <RefreshCw className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-blue-500" />
    </div>
  );

  // Error component
  const ErrorMessage = ({ message, onRetry }) => (
    <div className="flex flex-col items-center justify-center h-48 sm:h-64 lg:h-72 text-center px-4">
      <p className="text-red-500 mb-4 text-sm sm:text-base">{message}</p>
      <button
        onClick={onRetry}
        className="px-3 py-2 sm:px-4 text-sm sm:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
          Weekly Donations
        </h3>
        
        {/* Legend */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xs sm:text-sm text-gray-600">Donated</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-xs sm:text-sm text-gray-600">Wasted</span>
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
          <ResponsiveContainer width="100%" height={200} className="sm:h-64 lg:h-72">
            <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280" 
                fontSize={12}
                className="sm:text-sm"
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
              <Bar 
                dataKey="donated" 
                fill="#10B981" 
                radius={[2, 2, 0, 0]}
                className="sm:radius-[4px]"
              />
              <Bar 
                dataKey="wasted" 
                fill="#EF4444" 
                radius={[2, 2, 0, 0]}
                className="sm:radius-[4px]"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default WeeklyChart;