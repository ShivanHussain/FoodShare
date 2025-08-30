import React from 'react';
import { Heart, Mail, Phone, MapPin, Star, Calendar, Award, Users, User, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

const ClaimedByCard = ({ claimedBy, donation }) => {
    // Status-based rendering logic
    const getStatusDisplay = () => {
        const status = donation?.status?.toLowerCase();
        
        switch (status) {
            case 'available':
                return {
                    icon: <Heart className="w-12 h-12 mx-auto mb-4 text-green-500" />,
                    text: "This donation is available for claiming",
                    bgColor: "bg-green-50",
                    textColor: "text-green-700"
                };
            case 'picked-up':
            case 'picked up':
                return {
                    icon: <CheckCircle className="w-12 h-12 mx-auto mb-4 text-blue-500" />,
                    text: "This donation has been picked up successfully",
                    bgColor: "bg-blue-50",
                    textColor: "text-blue-700"
                };
            case 'expired':
                return {
                    icon: <Clock className="w-12 h-12 mx-auto mb-4 text-red-500" />,
                    text: "This donation has expired and is no longer available",
                    bgColor: "bg-red-50",
                    textColor: "text-red-700"
                };
            case 'cancelled':
                return {
                    icon: <XCircle className="w-12 h-12 mx-auto mb-4 text-gray-500" />,
                    text: "This donation has been cancelled by the donor",
                    bgColor: "bg-gray-50",
                    textColor: "text-gray-700"
                };
            case 'claimed':
                return {
                    icon: <AlertCircle className="w-12 h-12 mx-auto mb-4 text-orange-500" />,
                    text: "This donation has been claimed and is pending pickup",
                    bgColor: "bg-orange-50",
                    textColor: "text-orange-700"
                };
            default:
                return {
                    icon: <Heart className="w-12 h-12 mx-auto mb-4 opacity-50 text-gray-400" />,
                    text: "This donation is still available for claiming",
                    bgColor: "bg-gray-50",
                    textColor: "text-gray-500"
                };
        }
    };

    // If no claimedBy data, show status-based message
    if (!claimedBy) {
        const statusDisplay = getStatusDisplay();
        
        return (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className={`text-center ${statusDisplay.bgColor} rounded-xl p-6`}>
                    {statusDisplay.icon}
                    <p className={`${statusDisplay.textColor} font-medium`}>
                        {statusDisplay.text}
                    </p>
                    <div className="mt-3 text-sm text-gray-500">
                        Status: <span className="font-semibold capitalize">{donation?.status || 'Unknown'}</span>
                    </div>
                </div>
            </div>
        );
    }

    const renderStars = (rating) => {
        const numRating = Number(rating) || 0;
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < numRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };

    const getInitials = (name) => {
        if (!name) return 'NGO';
        return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
    };

    const estimateBeneficiaries = (quantity, servings) => {
        const amount = quantity || servings || 0;
        if (amount <= 10) return `${amount * 1}-${amount * 2}`;
        if (amount <= 30) return `${amount * 1}-${amount * 3}`;
        return `${amount}+`;
    };

    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                    <Heart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Claimed By</h2>
            </div>

            {/* NGO Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 mb-6">
                <div className="flex items-start gap-4 mb-2">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                        {claimedBy.avatar?.url ? (
                            <img
                                src={claimedBy.avatar.url}
                                alt={claimedBy.name || claimedBy.organizationName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}
                        <div className={`w-full h-full flex items-center justify-center ${claimedBy.avatar?.url ? 'hidden' : ''}`}>
                            {getInitials(claimedBy.organizationName || claimedBy.name)}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {claimedBy.organizationName || claimedBy.name || 'NGO'}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                            {renderStars(claimedBy.averageRating)}
                            <span className="text-sm text-gray-600 ml-1">
                                ({claimedBy.averageRating || 0})
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                            Collecting and distributing food to fight hunger.
                        </p>

                    </div>
                </div>

                <div className="space-y-3 mb-4">

                    {claimedBy.name && claimedBy.organizationName && (
                        <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
                            <User className="w-4 h-4" />
                        <span className="">Contact Person: {claimedBy.name}</span>
                        </div>
                    )}
                    {claimedBy.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span className="break-all">{claimedBy.email}</span>
                        </div>
                    )}
                    {claimedBy.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{claimedBy.phone}</span>
                        </div>
                    )}
                    {claimedBy.address && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{claimedBy.address}</span>
                        </div>
                    )}
                    {claimedBy.registrationNumber && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Award className="w-4 h-4" />
                            <span>Registration: {claimedBy.registrationNumber}</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                            {estimateBeneficiaries(donation.quantity, donation.servings)}
                        </div>
                        <div className="text-sm text-gray-600">Est. Beneficiaries</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">
                            {donation?.createdAt
                                ? new Date(donation.createdAt).toLocaleDateString("en-GB")
                                : donation?.date || 'Date not available'
                            }
                        </div>
                        <div className="text-sm text-gray-600">Claimed At</div>
                    </div>
                </div>

                {/* Achievements Section */}
                <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Recognition
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {claimedBy.registrationNumber && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                                Verified NGO
                            </span>
                        )}
                        {claimedBy.averageRating >= 4 && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                                Trusted Partner
                            </span>
                        )}
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                            Active NGO
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                            Community Impact
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClaimedByCard;