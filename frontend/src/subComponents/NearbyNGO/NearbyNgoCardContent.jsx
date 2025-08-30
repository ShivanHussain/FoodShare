import React from 'react';
import { MapPin, Clock, Phone, Users, Navigation, CheckCircle } from 'lucide-react';

function NearbyNgoCardContent({ data }) {
    return (
        <div className="space-y-3 sm:space-y-4">
            {/* Servings and Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-sm border border-green-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base block truncate">
                            {data.servings} meals
                        </span>
                        <p className="text-xs text-gray-500">Serves People</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-sm border border-green-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base block truncate">
                            {data.category}
                        </span>
                        <p className="text-xs text-gray-500">Category</p>
                    </div>
                </div>
            </div>

            {/* Description and Address */}
            <div className="grid grid-cols-1 gap-2 sm:gap-4">
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-sm border border-green-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Navigation className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base block truncate">
                            {data.description}
                        </span>
                        <p className="text-xs text-gray-500">Description</p>
                    </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-sm border border-green-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2">
                            {data.claimedBy.address}
                        </span>
                        <p className="text-xs text-gray-500">Pickup Address</p>
                    </div>
                </div>
            </div>

            {/*  Contact and Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-sm border border-green-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base block truncate">
                            {data.claimedBy.phone}
                        </span>
                        <p className="text-xs text-gray-500">Contact</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-sm border border-green-100">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base block truncate">
                            {data.status || 'Available'}
                        </span>
                        <p className="text-xs text-gray-500">Status</p>
                    </div>
                </div>
            </div>

            {/* Additional Information on Larger Screens */}
            <div className="hidden lg:block">
                <div className="grid grid-cols-1 gap-2">
                    {data.foodItems && (
                        <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-100">
                            <p className="text-xs font-medium text-blue-700 mb-1">Food Items:</p>
                            <p className="text-sm text-blue-800 line-clamp-2">{data.foodItems}</p>
                        </div>
                    )}
                    {data.notes && (
                        <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                            <p className="text-xs font-medium text-purple-700 mb-1">Notes:</p>
                            <p className="text-sm text-purple-800 line-clamp-2">{data.notes}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>  
    );
}

export default NearbyNgoCardContent;
