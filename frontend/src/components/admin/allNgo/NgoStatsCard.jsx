import React from 'react';
import { Building, CheckCircle, Clock, Truck } from 'lucide-react';

const NGOStatsCards = ({ stats }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 sm:p-4 lg:p-6 rounded-lg lg:rounded-xl">
                <div className="flex items-center justify-between">
                    <div className="min-w-0">
                        <p className="text-blue-100 text-xs sm:text-sm font-medium mb-1">Total NGOs</p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold truncate">{stats.total}</p>
                    </div>
                    <Building className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-200 flex-shrink-0 ml-2" />
                </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 sm:p-4 lg:p-6 rounded-lg lg:rounded-xl">
                <div className="flex items-center justify-between">
                    <div className="min-w-0">
                        <p className="text-green-100 text-xs sm:text-sm font-medium mb-1">Verified NGOs</p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold truncate">{stats.verified}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-200 flex-shrink-0 ml-2" />
                </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 sm:p-4 lg:p-6 rounded-lg lg:rounded-xl col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between">
                    <div className="min-w-0">
                        <p className="text-yellow-100 text-xs sm:text-sm font-medium mb-1">Pending</p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold truncate">{stats.pending}</p>
                    </div>
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-yellow-200 flex-shrink-0 ml-2" />
                </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 sm:p-4 lg:p-6 rounded-lg lg:rounded-xl col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between">
                    <div className="min-w-0">
                        <p className="text-purple-100 text-xs sm:text-sm font-medium mb-1">Total Pickups</p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold truncate">{stats.totalPickups}</p>
                    </div>
                    <Truck className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-200 flex-shrink-0 ml-2" />
                </div>
            </div>
        </div>
    );
};

export default NGOStatsCards;