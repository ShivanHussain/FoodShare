import React from 'react';
import { Package, CheckCircle, Clock, XCircle } from 'lucide-react';

const StatsCards = ({ stats }) => {
  const cardData = [
    {
      title: 'Total Donations',
      value: stats.total,
      icon: Package,
      gradient: 'from-blue-500 to-cyan-500',
      textColor: 'text-gray-900'
    },
    {
      title: 'Successfully Delivered',
      value: stats.delivered,
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Pending Pickup',
      value: stats.pending,
      icon: Clock,
      gradient: 'from-yellow-500 to-orange-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Cancelled',
      value: stats.cancelled,
      icon: XCircle,
      gradient: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
      {cardData.map((card, index) => (
        <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 
        shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 mb-2 sm:mb-0">
              <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2 leading-tight">
                {card.title}
              </p>
              <p className={`text-xl sm:text-2xl lg:text-3xl font-bold ${card.textColor}`}>
                {card.value}
              </p>
            </div>
            <div className={`bg-gradient-to-r ${card.gradient} p-2 sm:p-3 rounded-full self-end sm:self-center`}>
              <card.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;