import React from 'react';
import { XCircle, User, Phone, Mail, MapPin, Calendar, Clock, Package, AlertCircle, CheckCircle, Truck } from 'lucide-react';

const DonationDetailsModal = ({ isOpen, onClose, donation, onStatusUpdate }) => {
    if (!isOpen || !donation) return null;

    const getStatusBadge = (status) => {
        const statusStyles = {
            available: 'bg-green-100 text-green-800',
            claimed: 'bg-blue-100 text-blue-800',
            'picked-up': 'bg-purple-100 text-purple-800',
            expired: 'bg-red-100 text-red-800',
            cancelled: 'bg-gray-100 text-gray-800'
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || statusStyles.cancelled}`}>
                {status?.charAt(0).toUpperCase() + status?.slice(1).replace('-', ' ')}
            </span>
        );
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 mt-16">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[74vh] overflow-y-auto">
                <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Donation Details</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <XCircle className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="p-4 sm:p-6">
                    {/* Header with image and basic info */}
                    <div className="flex flex-col sm:flex-row items-start mb-3">
                        {donation.images?.[0] && (
                            <img
                                src={donation.images[0].url}
                                alt={donation.foodType}
                                className="w-full sm:w-20 h-48 sm:h-20 rounded-xl object-cover mb-4 sm:mb-0 sm:mr-6"
                            />
                        )}
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0">{donation.foodType}</h3>
                                {getStatusBadge(donation.status)}
                            </div>
                            <p className="text-gray-600 mb-2">{donation.category}</p>
                            <p className="text-sm text-blue-600 font-medium">{donation.foodPreference}</p>
                            {donation.description && (
                                <p className="text-gray-700 mt-3">{donation.description}</p>
                            )}
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                            <div className="flex items-center mb-2">
                                <Package className="w-5 h-5 text-green-600 mr-2" />
                                <span className="text-sm text-gray-600">Quantity</span>
                            </div>
                            <p className="text-xl font-bold text-green-600">{donation.quantity} {donation.unit}</p>
                        </div>

                        {donation.servings && (
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                                <div className="flex items-center mb-2">
                                    <User className="w-5 h-5 text-blue-600 mr-2" />
                                    <span className="text-sm text-gray-600">Servings</span>
                                </div>
                                <p className="text-xl font-bold text-blue-600">{donation.servings} people</p>
                            </div>
                        )}

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                            <div className="flex items-center mb-2">
                                <AlertCircle className="w-5 h-5 text-purple-600 mr-2" />
                                <span className="text-sm text-gray-600">Condition</span>
                            </div>
                            <p className="text-xl font-bold text-purple-600">{donation.foodCondition || 'Good'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Contact Info */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 text-lg">Contact Information</h4>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <User className="w-5 h-5 text-gray-400 mr-3" />
                                    <div>
                                        <span className="text-sm text-gray-600">Contact Person:</span>
                                        <p className="font-medium text-gray-900">{donation.contactPerson}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                                    <div>
                                        <span className="text-sm text-gray-600">Phone:</span>
                                        <p className="font-medium text-gray-900">{donation.contactPhone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                                    <div>
                                        <span className="text-sm text-gray-600">Email:</span>
                                        <p className="font-medium text-gray-900">{donation.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                                    <div>
                                        <span className="text-sm text-gray-600">Pickup Address:</span>
                                        <p className="font-medium text-gray-900">{donation.pickupAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Status & Timeline */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 text-lg">Status & Timeline</h4>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                                    <div>
                                        <span className="text-sm text-gray-600">Created:</span>
                                        <p className="font-medium text-gray-900">{formatDate(donation.createdAt)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-5 h-5 text-gray-400 mr-3" />
                                    <div>
                                        <span className="text-sm text-gray-600">Expires:</span>
                                        <p className="font-medium text-gray-900">{formatDate(donation.expiryDate)}</p>
                                    </div>
                                </div>
                                {donation.claimedBy && (
                                    <div className="flex items-center">
                                        <CheckCircle className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <span className="text-sm text-gray-600">Claimed By:</span>
                                            <p className="font-medium text-gray-900">{donation.claimedBy.name || donation.claimedBy}</p>
                                        </div>
                                    </div>
                                )}
                                {donation.claimedAt && (
                                    <div className="flex items-center">
                                        <Truck className="w-5 h-5 text-gray-400 mr-3" />
                                        <div>
                                            <span className="text-sm text-gray-600">Claimed At:</span>
                                            <p className="font-medium text-gray-900">{formatDate(donation.claimedAt)}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Status Update Actions for Admin */}
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <h5 className="font-medium text-gray-900 mb-3">Update Status</h5>
                                <div className="flex flex-wrap gap-2">
                                    {['available', 'claimed', 'picked-up', 'expired', 'cancelled'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => onStatusUpdate(donation._id, status)}
                                            disabled={donation.status === status}
                                            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${donation.status === status
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Images */}
                    {donation.images && donation.images.length > 1 && (
                        <div className="mt-3">
                            <h4 className="font-semibold text-gray-900 text-lg mb-4">Additional Images</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {donation.images.slice(1).map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={`${donation.foodType} ${index + 2}`}
                                        className="w-full h-24 object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationDetailsModal;