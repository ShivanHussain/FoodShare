import React from 'react';
import { Search, Menu, X } from 'lucide-react';

const NGOSearchAndFilters = ({
    searchTerm,
    setSearchTerm,
    showMobileFilters,
    setShowMobileFilters
}) => {
    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="sm:hidden self-end p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
                {showMobileFilters ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Search and Filters */}
            <div className={`transition-all duration-300 ${showMobileFilters ? 'block' : 'hidden'} sm:block`}>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                        <input
                            type="text"
                            placeholder="Search NGOs by name, email, or area..."
                            className="w-full pl-9 sm:pl-10 lg:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NGOSearchAndFilters;