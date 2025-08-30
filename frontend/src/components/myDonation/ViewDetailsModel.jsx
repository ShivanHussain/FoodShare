import React from 'react';
import { Calendar, MapPin, Users, Star, TimerOff, X } from 'lucide-react';

const ViewDetailsModel = ({ selectedDonation, setSelectedDonation, getStatusConfig }) => {
    if (!selectedDonation) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="p-4 sm:p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4 sm:mb-6 sticky top-0 bg-white pb-2 z-10">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 pr-4">Donation Details</h3>
                        <button
                            onClick={() => setSelectedDonation(null)}
                            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-6 h-6 sm:w-8 sm:h-8" />
                        </button>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        {/* Food Info */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <img
                                src={selectedDonation.images?.[0]?.url || selectedDonation.images?.[1]?.url || 
                                    selectedDonation.foodImage || '/api/placeholder/300/200'}
                                alt={selectedDonation.foodType || selectedDonation.foodName || 'Food item'}
                                className="w-full sm:w-20 md:w-24 h-20 md:h-24 object-cover rounded-xl sm:rounded-2xl"
                            />
                            <div className="flex-1">
                                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                                    {selectedDonation.foodType || selectedDonation.foodName}
                                </h4>
                                <p className="text-sm sm:text-base text-gray-600 mb-2">
                                    {selectedDonation.category || selectedDonation.foodCategory}
                                </p>
                                <div className="flex items-center">
                                    {React.createElement(getStatusConfig(selectedDonation.status).icon, {
                                        className: "w-4 h-4 mr-1 sm:mr-2"
                                    })}
                                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium 
                                        ${getStatusConfig(selectedDonation.status).color}`}>
                                        {getStatusConfig(selectedDonation.status).label}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quantity and Servings */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">Quantity</p>
                                <p className="text-base sm:text-lg font-bold text-gray-900">
                                    {selectedDonation.quantity || selectedDonation.foodQuantity || 'N/A'}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1">Servings</p>
                                <p className="text-base sm:text-lg font-bold text-gray-900">
                                    {selectedDonation.servings || selectedDonation.estimatedServings || 'N/A'}
                                </p>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-start space-x-3">
                                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-700 text-sm sm:text-base">Donation Date</p>
                                    <p className="text-gray-600 text-sm sm:text-base break-words">
                                        {selectedDonation.donationDate ||
                                            (selectedDonation.createdAt ? new Date(selectedDonation.createdAt).toLocaleDateString() : 'N/A')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <TimerOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-700 text-sm sm:text-base">Expires At</p>
                                    <p className="text-gray-600 text-sm sm:text-base break-words">
                                        {selectedDonation.expiryDate ? new Date(selectedDonation.expiryDate).toLocaleDateString() :
                                            (selectedDonation.expiresAt || 'N/A')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-700 text-sm sm:text-base">Pickup Address</p>
                                    <p className="text-gray-600 text-sm sm:text-base break-words">
                                        {selectedDonation.address || selectedDonation.pickupAddress || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* Additional Details */}
                            {selectedDonation.description && (
                                <div className="bg-blue-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                    <p className="font-semibold text-gray-700 text-sm sm:text-base mb-2">Description</p>
                                    <p className="text-gray-600 text-sm sm:text-base break-words">
                                        {selectedDonation.description}
                                    </p>
                                </div>
                            )}

                            {/* NGO Information */}
                            {selectedDonation?.claimedBy?.organizationName && (
                                <div className="flex items-start space-x-3">
                                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-700 text-sm sm:text-base">Handled by NGO</p>
                                        <div className="space-y-1">
                                            <p className="text-gray-600 text-sm sm:text-base font-medium break-words">
                                                {selectedDonation.claimedBy.organizationName}
                                            </p>
                                            {selectedDonation.claimedBy.email && (
                                                <p className="text-gray-500 text-xs sm:text-sm break-words">
                                                    Email: {selectedDonation.claimedBy.email}
                                                </p>
                                            )}
                                            {selectedDonation.claimedBy.phone && (
                                                <p className="text-gray-500 text-xs sm:text-sm break-words">
                                                    Phone: {selectedDonation.claimedBy.phone}
                                                </p>
                                            )}
                                            {selectedDonation.claimedBy.address && (
                                                <p className="text-gray-500 text-xs sm:text-sm break-words">
                                                    Address: {selectedDonation.claimedBy.address}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Alternative NGO display if different structure */}
                            {selectedDonation.ngoName && !selectedDonation?.claimedBy?.organizationName && (
                                <div className="bg-green-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                    <p className="font-semibold text-gray-700 text-sm sm:text-base mb-1">Handled by NGO</p>
                                    <p className="text-gray-600 text-sm sm:text-base font-medium">
                                        {selectedDonation.ngoName}
                                    </p>
                                    {selectedDonation.ngoContact && (
                                        <p className="text-gray-500 text-xs sm:text-sm mt-1">
                                            Contact: {selectedDonation.ngoContact}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Pickup Information */}
                            {selectedDonation.pickupTime && (
                                <div className="flex items-start space-x-3">
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-700 text-sm sm:text-base">Pickup Time</p>
                                        <p className="text-gray-600 text-sm sm:text-base break-words">
                                            {selectedDonation.pickupTime}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Status Timeline */}
                            {selectedDonation.statusHistory && selectedDonation.statusHistory.length > 0 && (
                                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                    <p className="font-semibold text-gray-700 text-sm sm:text-base mb-3">Status Timeline</p>
                                    <div className="space-y-2">
                                        {selectedDonation.statusHistory.map((status, index) => (
                                            <div key={index} className="flex justify-between items-center text-xs sm:text-sm">
                                                <span className="text-gray-600 capitalize">{status.status.replace('-', ' ')}</span>
                                                <span className="text-gray-500">
                                                    {new Date(status.timestamp).toLocaleDateString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Rating and Feedback */}
                            {selectedDonation.rating && (
                                <div className="bg-green-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                    <div className="flex items-center mb-2">
                                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-1 sm:mr-2" />
                                        <span className="font-semibold text-gray-700 text-sm sm:text-base">
                                            Rating: {selectedDonation.rating}/5
                                        </span>
                                    </div>
                                    {selectedDonation.feedback && (
                                        <p className="text-gray-600 italic text-sm sm:text-base break-words">
                                            "{selectedDonation.feedback}"
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Impact Information */}
                            {selectedDonation.impact && (
                                <div className="bg-purple-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                    <p className="font-semibold text-gray-700 text-sm sm:text-base mb-2">Impact</p>
                                    <p className="text-gray-600 text-sm sm:text-base break-words">
                                        {selectedDonation.impact}
                                    </p>
                                </div>
                            )}

                            {/* Special Instructions */}
                            {selectedDonation.specialInstructions && (
                                <div className="bg-yellow-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                                    <p className="font-semibold text-gray-700 text-sm sm:text-base mb-2">Special Instructions</p>
                                    <p className="text-gray-600 text-sm sm:text-base break-words">
                                        {selectedDonation.specialInstructions}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-gray-200">
                            <button
                                onClick={() => setSelectedDonation(null)}
                                className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm sm:text-base font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetailsModel;