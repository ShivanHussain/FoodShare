import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { RefreshCw, BarChart3 } from 'lucide-react';

export function CategoryDistributionChart({ data, loading, error }) {

    const COLORS = [
        '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6',
        '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6b7280'
    ];

    const formatChartData = () => {
        if (!data?.categoryDistribution) return [];

        return data.categoryDistribution.slice(0, 8).map(item => ({
            name: item._id.length > 20 ? `${item._id.substring(0, 18)}...` : item._id,
            value: item.count,
            quantity: item.totalQuantity,
            fullName: item._id
        }));
    };

    if (error) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Category Distribution</h3>
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
                <h3 className="text-xl font-bold text-gray-900">Category Distribution</h3>
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                        <BarChart3 className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
                        <p className="text-gray-600">Loading category data...</p>
                    </div>
                </div>
            ) : (
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={formatChartData()}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {formatChartData().map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name, props) => [
                                    `${value} donations`,
                                    props.payload.fullName
                                ]}
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Legend
                                wrapperStyle={{ fontSize: '12px' }}
                                iconType="circle"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
