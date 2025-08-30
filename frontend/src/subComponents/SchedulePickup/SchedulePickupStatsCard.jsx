
import React from 'react';

function SchedulePickupStatsCard({ stat }) {
  const IconComponent = stat.icon;
  
  return (
    <div className="bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-xl rounded-lg lg:rounded-2xl 
                  p-3 sm:p-4 lg:p-6 shadow-lg border border-gray-100/50 
                  hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        {/* Icon */}
        <div className={`p-2 sm:p-2.5 lg:p-3 rounded-lg lg:rounded-xl ${stat.color} flex-shrink-0`}>
          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
            {stat.value}
          </p>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium truncate">
            {stat.label}
          </p>
        </div>
      </div>
    </div>
  );
}


export default SchedulePickupStatsCard;