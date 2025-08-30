/* eslint-disable no-unused-vars */
import React from 'react';
import { Users, Activity, User, Shield } from 'lucide-react';

const UserStatsCards = ({ stats }) => {
  const cardData = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      bgGradient: 'from-green-500 to-emerald-500',
      textColor: 'text-green-100',
      iconColor: 'text-green-200'
    },
    {
      title: 'Verified Users',
      value: stats.verifiedUsers,
      icon: Activity,
      bgGradient: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-100',
      iconColor: 'text-blue-200'
    },
    {
      title: 'Donors',
      value: stats.donors,
      icon: User,
      bgGradient: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-100',
      iconColor: 'text-purple-200'
    },
    {
      title: 'Admins',
      value: stats.admins,
      icon: Shield,
      bgGradient: 'from-orange-500 to-red-500',
      textColor: 'text-orange-100',
      iconColor: 'text-orange-200'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
      {cardData.map(({ title, value, icon: Icon, bgGradient, textColor, iconColor }) => (
        <div 
          key={title} 
          className={`bg-gradient-to-r ${bgGradient} text-white p-3 sm:p-4 rounded-lg sm:rounded-xl`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`${textColor} text-xs sm:text-sm`}>{title}</p>
              <p className="text-xl sm:text-2xl font-bold">{value}</p>
            </div>
            <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${iconColor}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStatsCards;