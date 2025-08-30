import React from 'react';
import { Package, Calendar, CheckCircle, MapPin, Clock, Utensils } from 'lucide-react';

const DonationHeader = ({ donation }) => {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'claimed': return 'bg-green-100 text-green-800';
            case 'available': return 'bg-blue-100 text-blue-800';
            case 'expired': return 'bg-red-100 text-red-800';
            case 'completed': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        return timeString;
    };

    return (
        <section className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-2">
                        <div className="bg-white/20 p-2 rounded-full">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <h1 className="text-xl md:text-3xl font-bold ">Donation Details</h1>
                    <p className="text-lg text-green-100">ID: {donation._id?.slice(-12) || 'N/A'}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                            <Utensils className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                            <h3 className="text-lg font-bold">{donation.foodType || 'Food Item'}</h3>
                            <p className="text-sm text-green-100">{donation.category || 'Category'}</p>
                        </div>
                        <div className="text-center">
                            <Package className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                            <h3 className="text-lg font-bold">
                                {donation.quantity || donation.servings || 0} {donation.unit || 'units'}
                            </h3>
                            <p className="text-sm text-green-100">Quantity</p>
                        </div>
                        <div className="text-center">
                            <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-200" />
                            <h3 className="text-lg font-bold">
                                {formatDate(donation.createdAt)}
                            </h3>
                            <p className="text-sm text-green-100">Donated On</p>
                        </div>
                        <div className="text-center">
                            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-200" />
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(donation.status)}`}>
                                {donation.status?.charAt(0).toUpperCase() + donation.status?.slice(1) || 'N/A'}
                            </span>
                            <p className="text-sm text-green-100 mt-1">Status</p>
                        </div>
                    </div>

                    <div className="bg-white/20 rounded-2xl p-4">
                        <h4 className="text-base font-semibold mb-3 flex items-center gap-2">
                            Donation Description
                        </h4>
                        <p className="text-sm text-green-100 mb-3">
                            {donation.description || 'No description provided'}
                        </p>

                        {donation.foodPreference && (
                            <div className="mb-3">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${donation.foodPreference === 'Veg' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                                    }`}>
                                    {donation.foodPreference}
                                </span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3" />
                                <span>Pickup: {donation.pickupAddress || 'Address not provided'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                <span>
                                    Expires: {formatDate(donation.expiryDate)}
                                    {donation.expiryTime && ` at ${formatTime(donation.expiryTime)}`}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3" />
                                <span>Condition: {donation.foodCondition || 'Good'}</span>
                            </div>
                        </div>

                        {donation.contactPerson && (
                            <div className="mt-3 pt-3 border-t border-white/20">
                                <p className="text-xs text-green-100">
                                    Contact Person: <span className="font-semibold">{donation.contactPerson}</span>
                                    {donation.contactPhone && (
                                        <span className="ml-2">📞 {donation.contactPhone}</span>
                                    )}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DonationHeader;