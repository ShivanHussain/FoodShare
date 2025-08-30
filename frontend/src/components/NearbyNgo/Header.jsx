import React from 'react';

const Header = ({ totalPickups }) => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-3 sm:p-4 
    lg:p-6 mb-6 sm:mb-8 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
        {/* Title Section */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
            Food Rescue Hub
          </h1>
          <p className="text-green-100 text-sm sm:text-lg lg:text-xl">
            Making a difference, one meal at a time
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex items-center space-x-4 sm:space-x-6 w-full sm:w-auto">
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 flex-1 sm:flex-none 
          sm:min-w-[100px] lg:min-w-[120px]">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {totalPickups}
            </div>
            <div className="text-md sm:text-sm text-green-100">
              Total
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;