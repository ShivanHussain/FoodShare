import React from 'react';
import { Package, Calendar, MapPin, Loader2 } from 'lucide-react';

function SelectedUserLeftSection({ userInfo, claimedDonations, donationHistory }) {

    const getStatusColor = (status) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'claimed':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'picked-up':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'expired':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'cancelled':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };


    // Loading component
    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400 mb-4" />
            <p className="text-gray-500">Loading donations...</p>
        </div>
    );

    // Empty state component
    const EmptyState = ({ title, message }) => (
        <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500">{message}</p>
        </div>
    );

    // Donation card component
    const DonationCard = ({ donation }) => (
        <div key={donation._id || donation.id} className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start gap-2">
                <img
                    src={donation?.images?.[0]?.url || `/api/placeholder/40/40`}
                    alt={donation?.category || 'Donation'}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-400 p-1"
                />
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {donation?.category || donation?.foodType || 'Unknown Item'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(donation?.status || 'Pending')}`}>
                            {donation?.status || 'Pending'}
                        </span>
                    </div>
                    <p className="text-gray-600 mb-2">
                        Quantity: {donation?.quantity || '0'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {donation?.createdAt
                                ? new Date(donation.createdAt).toLocaleDateString("en-GB")
                                : donation?.date || 'Date not available'
                            }
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {donation?.pickupAddress
                                ? `${donation.pickupAddress.slice(0, 20)}${donation.pickupAddress.length > 20 ? '...' : ''}`
                                : 'Address not available'
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {userInfo?.role === 'ngo' ? (
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Claimed Donations</h2>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {claimedDonations?.length || 0} Total
                        </span>
                    </div>

                    <div className="space-y-4">
                        {/* Loading state */}
                        {claimedDonations === undefined && <LoadingSpinner />}

                        {/* Empty state */}
                        {claimedDonations && claimedDonations.length === 0 && (
                            <EmptyState
                                title="No Claimed Donations"
                                message="This NGO hasn't claimed any donations yet."
                            />
                        )}

                        {/* Donations list */}
                        {claimedDonations && claimedDonations.length > 0 &&
                            claimedDonations.map((donation) => (
                                <DonationCard key={donation._id || donation.id} donation={donation} />
                            ))
                        }
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">My Donations</h2>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {donationHistory?.length || 0} Total
                        </span>
                    </div>

                    <div className="space-y-4">
                        {/* Loading state */}
                        {donationHistory === undefined && <LoadingSpinner />}

                        {/* Empty state */}
                        {donationHistory && donationHistory.length === 0 && (
                            <EmptyState
                                title="No Donations Yet"
                                message="This user hasn't made any donations yet."
                            />
                        )}

                        {/* Donations list */}
                        {donationHistory && donationHistory.length > 0 &&
                            donationHistory.map((donation) => (
                                <DonationCard key={donation._id || donation.id} donation={donation} />
                            ))
                        }
                    </div>
                </div>
            )}
        </>
    );
}

export default SelectedUserLeftSection;