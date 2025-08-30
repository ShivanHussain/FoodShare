import React from 'react';
import { Search, Filter, Menu } from 'lucide-react';

const SearchAndFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  filterRole, 
  setFilterRole, 
  showMobileFilters, 
  setShowMobileFilters 
}) => {
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowMobileFilters(!showMobileFilters)}
        className="sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search and Filters */}
      <div className={`flex flex-col gap-4 ${showMobileFilters ? 'block' : 'hidden sm:flex'} sm:flex-row`}>
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none 
            focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 sm:gap-4">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 
            focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
          >
            <option value="all">All Roles</option>
            <option value="donor">Donors</option>
            <option value="admin">Admins</option>
          </select>

          <button className="p-2 sm:p-3 border border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchAndFilters;