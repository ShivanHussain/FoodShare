// components/schedulePickups/SchedulePickupFilterBar.jsx
import React from 'react';
import { Search, Filter } from 'lucide-react';

function SchedulePickupFilterBar({ searchTerm, setSearchTerm, filter, setFilter }) {
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className="bg-gradient-to-r from-white to-blue-50/80 backdrop-blur-xl rounded-xl lg:rounded-2xl 
                  p-4 sm:p-5 lg:p-6 shadow-lg border border-blue-100/50">
      <div className="flex flex-col gap-4">
        
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search by donor name or food type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg lg:rounded-xl 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
                       text-sm sm:text-base placeholder:text-gray-400 bg-white/80"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:hidden">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg lg:rounded-xl text-xs sm:text-sm font-medium 
                         transition-all duration-200 shadow-sm hover:shadow-md active:scale-95
                         ${filter === option.value
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'bg-white/80 text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count - Mobile Only */}
        <div className="flex justify-between items-center text-xs text-gray-500 sm:hidden">
          <span>Filter: {filterOptions.find(opt => opt.value === filter)?.label}</span>
          {searchTerm && <span>Searching: "{searchTerm}"</span>}
        </div>
      </div>
    </div>
  );
}

export default SchedulePickupFilterBar;