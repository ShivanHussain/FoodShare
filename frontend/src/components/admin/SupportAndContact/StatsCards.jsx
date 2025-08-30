/* eslint-disable no-unused-vars */
import React from 'react';
import { AlertCircle, Clock, CheckCircle, Mail } from 'lucide-react';

const StatsCards = ({ contacts, newsletters }) => {
  const cardData = [
    {
      title: 'Total Messages',
      value: contacts ? contacts.length : '0',
      icon: AlertCircle,
      bgGradient: 'from-red-500 to-pink-500',
      iconBg: 'bg-white/20'
    },
    {
      title: 'Pending Replies',
      value: '1', 
      icon: Clock,
      bgGradient: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-white/20'
    },
    {
      title: 'Resolved Today',
      value: '1',
      icon: CheckCircle,
      bgGradient: 'from-green-500 to-emerald-500',
      iconBg: 'bg-white/20'
    },
    {
      title: 'Newsletter Subscribers',
      value: newsletters ? newsletters.length : '0',
      icon: Mail,
      bgGradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-white/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {cardData.map(({ title, value, icon: Icon, bgGradient, iconBg }) => (
        <div 
          key={title}
          className={`bg-gradient-to-r ${bgGradient} text-white rounded-xl p-6 shadow-lg relative overflow-hidden`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-black/5"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <p className="text-white/80 text-sm font-medium mb-2">{title}</p>
              <p className="text-3xl font-bold text-white">{value}</p>
            </div>
            <div className={`${iconBg} p-3 rounded-lg ml-4`}>
              <Icon className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;