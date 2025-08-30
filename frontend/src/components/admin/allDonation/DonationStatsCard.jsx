import React from 'react';
import { AlertCircle, CheckCircle, Truck, Clock, Ban } from 'lucide-react';

const DonationStatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mb-4 sm:mb-6">
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 sm:p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-xs sm:text-sm">Available</p>
            <p className="text-lg sm:text-2xl font-bold">{stats.available}</p>
          </div>
          <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-200" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 sm:p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-xs sm:text-sm">Claimed</p>
            <p className="text-lg sm:text-2xl font-bold">{stats.claimed}</p>
          </div>
          <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-200" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 sm:p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-xs sm:text-sm">Picked Up</p>
            <p className="text-lg sm:text-2xl font-bold">{stats.pickedUp}</p>
          </div>
          <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-purple-200" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 sm:p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-xs sm:text-sm">Expired</p>
            <p className="text-lg sm:text-2xl font-bold">{stats.expired}</p>
          </div>
          <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-red-200" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-500 to-slate-500 text-white p-3 sm:p-4 rounded-xl col-span-2 sm:col-span-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-100 text-xs sm:text-sm">Cancelled</p>
            <p className="text-lg sm:text-2xl font-bold">{stats.cancelled}</p>
          </div>
          <Ban className="w-6 h-6 sm:w-8 sm:h-8 text-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default DonationStatsCards;