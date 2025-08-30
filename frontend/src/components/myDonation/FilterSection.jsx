import React from 'react';
import { Search } from 'lucide-react';

const FilterSection = ({ filterStatus, setFilterStatus, searchTerm, setSearchTerm, loading }) => {
  const filterButtons = [
    { key: 'all', label: 'All' },
    { key: 'available', label: 'Available' },
    { key: 'claimed', label: 'Claimed' },
    { key: 'picked-up', label: 'Picked Up' },
    { key: 'expired', label: 'Expired' },
    { key: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl">
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
          {filterButtons.map(button => (
            <button
              key={button.key}
              onClick={() => setFilterStatus(button.key)}
              disabled={loading}
              className={`px-3 py-2 sm:px-4 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm ${
                filterStatus === button.key
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-auto lg:min-w-[280px]">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-4 
            focus:ring-green-500/20 
            focus:border-green-500 transition-all duration-300 text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;