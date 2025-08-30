import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { RefreshCw } from 'lucide-react';

const FoodTypeChart = ({ foodTypeData, loading, error, onRetry }) => {
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
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
        Food Types Distribution
      </h3>

      {/* Chart Content */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} onRetry={onRetry} />
      ) : (
        <div className="flex flex-col lg:flex-row items-center">
          {/* Pie Chart */}
          <div className="w-full lg:flex-1">
            <ResponsiveContainer width="100%" height={200} className="sm:h-56 lg:h-64">
              <PieChart>
                <Pie
                  data={foodTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40} 
                  outerRadius={80} 
                  paddingAngle={5}
                  dataKey="value"
                  className="sm:inner-radius-50 sm:outer-radius-90 lg:inner-radius-60 lg:outer-radius-100"
                >
                  {foodTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    fontSize: '14px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="w-full lg:w-auto lg:ml-6 mt-4 lg:mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
              {foodTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center min-w-0 flex-1">
                    <div
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2 sm:mr-3 flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-700 font-medium text-xs sm:text-sm truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="ml-2 text-gray-600 text-xs sm:text-sm font-medium">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodTypeChart;