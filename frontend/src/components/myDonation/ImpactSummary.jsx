import React from 'react';
import { Heart } from 'lucide-react';

const ImpactSummary = ({ stats }) => {
  if (stats.delivered === 0) return null;

  return (
    <div className="mt-8 sm:mt-12 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl sm:rounded-3xl p-6 
    sm:p-8 text-center shadow-2xl">
      <Heart className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-3 sm:mb-4" />
      
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 px-2">
        Your Impact So Far
      </h2>
      
      <p className="text-sm sm:text-base lg:text-lg text-green-100 mb-3 sm:mb-4 px-2">
        You've successfully donated food that fed{' '}
        <strong className="text-white">
          {stats.totalPeopleFed || stats.delivered * 5} people
        </strong>!
      </p>
      
      <p className="text-xs sm:text-sm lg:text-base text-green-100 px-2">
        Thank you for making a difference in your community. Every donation counts!
      </p>
      
      {/* Additional stats for larger screens */}
      <div className="hidden sm:grid sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-green-400/30">
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{stats.delivered}</p>
          <p className="text-green-100 text-sm">Successful Donations</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{stats.totalPeopleFed || stats.delivered * 5}</p>
          <p className="text-green-100 text-sm">People Fed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">{Math.round((stats.delivered / stats.total) * 100)}%</p>
          <p className="text-green-100 text-sm">Success Rate</p>
        </div>
      </div>
    </div>
  );
};

export default ImpactSummary;