import React from 'react';
import { User, Mail, Phone, MapPin, Star, Calendar } from 'lucide-react';

const DonorInfoCard = ({ donor }) => {
    if (!donor) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-center text-gray-500">
                    <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Donor information not available</p>
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
        if (!name) return 'U';
        return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full">
                    <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Donor Information</h2>
            </div>

            {/* Donor Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 mb-6">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl bg-gradient-to-r from-green-500 to-blue-500 overflow-hidden">
                        {donor.avatar?.url ? (
                            <img
                                src={donor.avatar.url}
                                alt={donor.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}
                        <div className={`w-full h-full flex items-center justify-center ${donor.avatar?.url ? 'hidden' : ''}`}>
                            {getInitials(donor.name)}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {donor.name || 'Anonymous Donor'}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                            {renderStars(donor.averageRating)}
                            <span className="text-sm text-gray-600 ml-1">
                                ({donor.averageRating || 0})
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                            Committed to reducing food waste by sharing surplus food with those in need.
                        </p>
                    </div>
                </div>

                <div className="space-y-3 mb-4">
                    {donor.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span className="break-all">{donor.email}</span>
                        </div>
                    )}
                    {donor.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{donor.phone}</span>
                        </div>
                    )}
                    {donor.address && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{donor.address}</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                            {donor?.donationHistory?.length || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600">Total Donations</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                            {donor?.createdAt
                                ? new Date(donor.createdAt).toLocaleDateString("en-GB")
                                : donor?.date || 'Date not available'
                            }
                        </div>
                        <div className="text-sm text-gray-600">Member Since</div>
                    </div>
                </div>

                {/* Achievements Section */}
                <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Recognition</h4>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                            Active Contributor
                        </span>
                        {donor.averageRating >= 4 && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                                Trusted Donor
                            </span>
                        )}
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                            Community Member
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorInfoCard;