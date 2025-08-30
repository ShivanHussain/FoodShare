import React from 'react';
import { Calendar, MapPin, Users, Package, Eye, Star, ChefHat } from 'lucide-react';

const DonationsList = ({ filteredDonations, setSelectedDonation, getStatusConfig }) => {
    if (filteredDonations.length === 0) {
        return (
            <div className="text-center py-8 sm:py-12">
                <ChefHat className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No donations found</h3>
                <p className="text-sm sm:text-base text-gray-500 px-4">Try adjusting your filters or search terms</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {filteredDonations.map(donation => {
                const statusConfig = getStatusConfig(donation.status);
                return (
                    <div
                        key={donation._id || donation.id}
                        className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                        <div className="p-4 sm:p-6">
                            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                                {/* Image */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={donation.images[0].url || donation.foodImage || '/api/placeholder/300/200'}
                                        alt={donation.foodType || donation.foodName}
                                        className="w-full sm:w-24 lg:w-32 h-32 sm:h-24 lg:h-32 object-cover rounded-xl 
                                        sm:rounded-2xl"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-3 sm:space-y-4">
                                    <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                                                    {donation.foodType || donation.foodName}
                                                </h3>
                                                <span className="text-xs sm:text-sm text-gray-500 self-start sm:self-center">
                                                    #{donation._id?.slice(-6) || donation.id}
                                                </span>
                                            </div>
                                            <p className="text-sm sm:text-base text-gray-600 mb-2">
                                                {donation.category || donation.foodCategory}
                                            </p>
                                            <div className="flex items-center">
                                                {React.createElement(statusConfig.icon, { className: "w-4 h-4 mr-2" })}
                                                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm 
                                                    font-medium ${statusConfig.color}`}>
                                                    {statusConfig.label}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col lg:items-end gap-2">
                                            <button
                                                onClick={() => setSelectedDonation(donation)}
                                                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 
                                                sm:px-4 py-2 rounded-full font-medium hover:from-green-600 hover:to-blue-600 
                                                transition-all duration-300 flex items-center justify-center gap-2 text-sm 
                                                sm:text-base w-full sm:w-auto"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>View Details</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                        <div className="flex items-center text-gray-600">
                                            <Package className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm truncate">
                                                {donation.quantity || donation.foodQuantity}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm truncate">
                                                {donation.servings || donation.estimatedServings || 'N/A'} servings
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600 col-span-2 lg:col-span-1">
                                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm truncate">
                                                {donation.donationDate || new Date(donation.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600 col-span-2 lg:col-span-1">
                                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm truncate">
                                                {(donation.address || donation.pickupAddress)|| 'N/A'}
                                            </span>
                                        </div>
                                    </div>

                                    {donation.ngoName && (
                                        <div className="bg-green-50 p-3 rounded-xl">
                                            <p className="text-xs sm:text-sm text-green-800">
                                                <strong>Handled by:</strong> {donation.ngoName}
                                            </p>
                                            <p className="text-xs sm:text-sm text-green-600 mt-1">
                                                {donation.impact || 'Being processed by NGO'}
                                            </p>
                                        </div>
                                    )}

                                    {donation.status === 'delivered' && donation.rating && (
                                        <div className="flex items-center gap-2">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-3 h-3 sm:w-4 sm:h-4 ${i < donation.rating ? 
                                                            'text-yellow-500 fill-current' : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs sm:text-sm text-gray-600">NGO Rating</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DonationsList;