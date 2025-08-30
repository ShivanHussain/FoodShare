import React from 'react';
import { Search, Filter } from 'lucide-react';

const DonationSearchAndFilters = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    preferenceFilter,
    setPreferenceFilter,
    showMobileFilters,
    setShowMobileFilters
}) => {
    return (
        <>
            {/* Search and Filters */}
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                        type="text"
                        placeholder="Search donations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Mobile Filter Toggle */}
                <div className="block sm:hidden">
                    <button
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </button>
                </div>

                {/* Desktop Filters */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:flex gap-2 sm:gap-4">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Status</option>
                        <option value="available">Available</option>
                        <option value="claimed">Claimed</option>
                        <option value="picked-up">Picked Up</option>
                        <option value="expired">Expired</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <select
                        value={preferenceFilter}
                        onChange={(e) => setPreferenceFilter(e.target.value)}
                        className="px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Types</option>
                        <option value="Veg">Vegetarian</option>
                        <option value="Non-Veg">Non-Vegetarian</option>
                    </select>
                </div>
            </div>

            {/* Mobile Filters Dropdown */}
            {showMobileFilters && (
                <div className="block sm:hidden mt-4 p-4 bg-gray-50 rounded-xl space-y-3">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Status</option>
                        <option value="available">Available</option>
                        <option value="claimed">Claimed</option>
                        <option value="picked-up">Picked Up</option>
                        <option value="expired">Expired</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <select
                        value={preferenceFilter}
                        onChange={(e) => setPreferenceFilter(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Types</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                    </select>
                </div>
            )}
        </>
    );
};

export default DonationSearchAndFilters;