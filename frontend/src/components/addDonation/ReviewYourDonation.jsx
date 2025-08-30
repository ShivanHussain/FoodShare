import React from 'react';
import { AlertCircle, Phone, Mail,  User } from 'lucide-react';

function ReviewYourDonation({ formData }) {
    return (
        <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                Review Your Donation
            </h2>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-4 
            sm:space-y-6">

                {/* Food Information Section */}
                <div className="bg-white/70 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                        Food Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        <div className="space-y-1">
                            <h4 className="font-semibold text-gray-700 text-sm flex items-center">
                                Food Item:
                            </h4>
                            <p className="text-gray-900 text-sm sm:text-base">{formData.foodType || 'Not specified'}</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-semibold text-gray-700 text-sm">Category:</h4>
                            <p className="text-gray-900 text-sm sm:text-base">{formData.category || 'Not specified'}</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-semibold text-gray-700 text-sm">Food Type:</h4>
                            <div className="flex items-center">
                                {formData.foodPreference === 'Veg' ? (
                                    <>
                                        <span className="text-gray-900 font-medium text-sm sm:text-base">Vegetarian</span>
                                    </>
                                ) : formData.foodPreference === 'Non-Veg' ? (
                                    <>

                                        <span className="text-gray-900 font-medium text-sm sm:text-base">Non-Vegetarian</span>
                                    </>
                                ) : (
                                    <span className="text-gray-500 text-sm sm:text-base">Not specified</span>
                                )}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-semibold text-gray-700 text-sm">Food Condition:</h4>
                            <div className="flex items-center">
                                <span className="text-gray-900 font-medium text-sm sm:text-base">
                                    {formData.foodCondition || 'Not specified'}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-semibold text-gray-700 text-sm">Quantity:</h4>
                            <p className="text-gray-900 text-sm sm:text-base">
                                {formData.quantity || 'Not specified'} {formData.unit}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-semibold text-gray-700 text-sm flex items-center">

                                Servings:
                            </h4>
                            <p className="text-gray-900 text-sm sm:text-base">{formData.servings || 'Not specified'}</p>
                        </div>
                    </div>
                </div>

                {/* Timing Information Section */}
                <div className="bg-white/70 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                        Timing Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-1">
                            <h4 className="font-semibold text-gray-700 text-sm flex items-center">
                                Expiry Date & Time:
                            </h4>
                            <p className="text-gray-900 text-sm sm:text-base">
                                {formData.expiryDate && formData.expiryTime
                                    ? `${formData.expiryDate} at ${formData.expiryTime}`
                                    : 'Not specified'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Information Section */}
                <div className="bg-white/70 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                        Contact Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div className="space-y-1">
                            <h4 className="font-semibold text-gray-700 text-sm flex items-center">
                                <User className="w-3 h-3 mr-1" />
                                Contact Person:
                            </h4>
                            <p className="text-gray-900 text-sm sm:text-base">{formData.contactPerson || 'Not provided'}</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-semibold text-gray-700 text-sm flex items-center">
                                <Phone className="w-3 h-3 mr-1" />
                                Phone:
                            </h4>
                            <p className="text-gray-900 text-sm sm:text-base">{formData.contactPhone || 'Not provided'}</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-semibold text-gray-700 text-sm flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                Email:
                            </h4>
                            <p className="text-gray-900 text-sm sm:text-base break-all">{formData.email || 'Not provided'}</p>
                        </div>
                        {formData.alternateContactNumber ? (
                            <div className="space-y-1">
                                <h4 className="font-semibold text-gray-700 text-sm flex items-center">
                                    <Phone className="w-3 h-3 mr-1" />
                                    Alternate Contact:
                                </h4>
                                <p className="text-gray-900 text-sm sm:text-base">{formData.alternateContactNumber}</p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <h4 className="font-semibold text-gray-700 text-sm flex items-center">
                                    <Phone className="w-3 h-3 mr-1" />
                                    Alternate Contact:
                                </h4>
                                <p className="text-gray-900 text-sm sm:text-base">Not provided</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Address Section */}
                {formData.pickupAddress && (
                    <div className="bg-white/70 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-3">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex 
                        items-center">
                            Pickup Address
                        </h3>
                        <p className="text-gray-900 text-sm sm:text-base leading-relaxed">{formData.pickupAddress}</p>
                    </div>
                )}

                {/* Description Section */}
                {formData.description && (
                    <div className="bg-white/70 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-3">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                            Description
                        </h3>
                        <p className="text-gray-900 text-sm sm:text-base leading-relaxed">{formData.description}</p>
                    </div>
                )}

                {/* Images Section */}
                {formData.images.length > 0 && (
                    <div className="bg-white/70 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-3">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                            Food Images
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3">
                            {formData.images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Food ${index + 1}`}
                                        className="w-full aspect-square object-cover rounded-lg border-2 border-gray-200 
                                        hover:border-blue-300 transition-all duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-all 
                                    duration-300"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Important Notice */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-3 sm:p-4">
                    <div className="flex items-start">
                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div className="flex-1">
                            <h4 className="font-semibold text-yellow-800 text-sm sm:text-base">Before you submit:</h4>
                            <div className="mt-2 space-y-1">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs sm:text-sm text-yellow-700">
                                    <div>• Ensure food is safe and hygienic</div>
                                    <div>• Keep phone accessible for pickup</div>
                                    <div>• Check expiry date and time</div>
                                    <div>• Verify food condition is accurate</div>
                                </div>
                                <div className="pt-2 border-t border-yellow-200 text-sm font-medium text-yellow-800">
                                    Nearby NGOs will be notified immediately after submission!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewYourDonation;