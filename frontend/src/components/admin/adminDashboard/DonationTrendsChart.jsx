/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {  BarChart3 } from 'lucide-react';

export function DonationTrendsChart({ period = 'week', range = '4' , data, loading, error }) {
  

  const formatChartData = () => {
    if (!data || !Array.isArray(data)) return [];

    return data.map(item => ({
      period: period === 'day'
        ? `${item._id.day}/${item._id.month}`
        : period === 'week'
          ? `Week ${item._id.week}`
          : `${item._id.month}/${item._id.year}`,
      donations: item.totalDonations,
      quantity: item.totalQuantity,
      servings: item.totalServings || 0
    }));
  };

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Donation Trends</h3>
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
        <h3 className="text-xl font-bold text-gray-900">Donation Trends</h3>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading donation trends...</p>
          </div>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formatChartData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="period"
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
              <Line
                type="monotone"
                dataKey="donations"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#059669' }}
                name="Total Donations"
              />
              <Line
                type="monotone"
                dataKey="quantity"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#2563eb' }}
                name="Total Quantity (kg)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
