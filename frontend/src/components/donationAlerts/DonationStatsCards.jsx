import React from 'react';
import { Bell, Check, AlertCircle, Package, TrendingUp } from 'lucide-react';

function DonationStatsCards({ stats }) {
    const statsData = [
        {
            label: 'New Alerts',
            value: stats.newAlerts,
            icon: Bell,
            color: 'text-blue-600 bg-blue-100',
            gradient: 'from-blue-500 to-blue-600',
            description: 'Pending donations'
        },
        {
            label: 'Total',
            value: stats.total,
            icon: Package,
            color: 'text-purple-600 bg-purple-100',
            gradient: 'from-purple-500 to-purple-600',
            description: 'All donations'
        },
        {
            label: 'Accepted',
            value: stats.accepted,
            icon: Check,
            color: 'text-green-600 bg-green-100',
            gradient: 'from-green-500 to-green-600',
            description: 'Successfully claimed'
        },
        {
            label: 'Rejected',
            value: stats.rejected,
            icon: AlertCircle,
            color: 'text-red-600 bg-red-100',
            gradient: 'from-red-500 to-red-600',
            description: 'Declined donations'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {statsData.map((stat, index) => (
                <div key={index} 
                     className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl 
                              p-4 sm:p-5 lg:p-6 shadow-lg border border-white/20 
                              hover:shadow-xl hover:scale-105 transition-all duration-300 
                              group cursor-pointer">
                    
                    {/* Mobile/Small Screen Layout */}
                    <div className="block lg:hidden">
                        <div className="flex items-center justify-between mb-2">
                            <div className={`p-2.5 sm:p-3 rounded-lg ${stat.color} 
                                          group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className="text-right">
                                <p className="text-2xl sm:text-3xl font-bold text-gray-800 
                                           group-hover:text-gray-900 transition-colors">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm sm:text-base font-semibold text-gray-700 mb-1">
                                {stat.label}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                                {stat.description}
                            </p>
                        </div>
                    </div>

                    {/* Desktop/Large Screen Layout */}
                    <div className="hidden lg:block">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.color} 
                                          group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    {stat.label}
                                </p>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="space-y-2">
                            <div className="flex items-end justify-between">
                                <p className="text-3xl xl:text-4xl font-bold text-gray-800 
                                           group-hover:text-gray-900 transition-colors">
                                    {stat.value}
                                </p>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="hidden xl:inline">+12%</span>
                                </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {stat.description}
                            </p>
                            
                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                                <div 
                                    className={`bg-gradient-to-r ${stat.gradient} h-1.5 rounded-full 
                                              transition-all duration-1000 group-hover:animate-pulse`}
                                    style={{ 
                                        width: stats.total > 0 
                                            ? `${Math.min((stat.value / stats.total) * 100, 100)}%` 
                                            : '0%' 
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tablet Layout */}
                    <div className="hidden sm:block lg:hidden">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="text-lg font-semibold text-gray-700 mb-1">
                                    {stat.label}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {stat.description}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className={`p-3 rounded-xl ${stat.color} mb-2 
                                              group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <p className="text-2xl font-bold text-gray-800 
                                           group-hover:text-gray-900 transition-colors">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                        
                        {/* Mini Progress Bar for Tablet */}
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                                className={`bg-gradient-to-r ${stat.gradient} h-1.5 rounded-full 
                                          transition-all duration-1000 group-hover:animate-pulse`}
                                style={{ 
                                    width: stats.total > 0 
                                        ? `${Math.min((stat.value / stats.total) * 100, 100)}%` 
                                        : '0%' 
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DonationStatsCards;