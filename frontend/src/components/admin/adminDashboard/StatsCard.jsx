/* eslint-disable no-unused-vars */
import React from 'react';
import { TrendingUp } from 'lucide-react';

function StatsCard({ title, value, icon: Icon, color }) {
    return (
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform 
        hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                    <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">{title}</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{value}</p>
                </div>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center 
                    ${color} flex-shrink-0 ml-2 sm:ml-4`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
            </div>
        </div>
    );
}

export default StatsCard;