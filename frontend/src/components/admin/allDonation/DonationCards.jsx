import React from 'react';
import { Eye, Edit, Trash2, User, Package, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonationCards = ({ donation, onView, onEdit, onDelete }) => {
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
        <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-4">
            <div className="flex items-start space-x-3 mb-3">
                {donation.images?.[0] && (
                    <img
                        src={donation.images[0].url}
                        alt={donation.foodType}
                        className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                    />
                )}
                <Link to={`/select-donation/${donation._id}`} className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate pr-2">
                            {donation.foodType}
                        </h3>
                        {getStatusBadge(donation.status)}
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{donation.category}</p>
                    <p className="text-xs text-blue-600 font-medium">{donation.foodPreference}</p>
                </Link>
            </div>

            <div className="space-y-2 text-xs">
                <div className="flex items-center text-gray-600">
                    <User className="w-3 h-3 mr-2" />
                    <span className="truncate">{donation.contactPerson}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Package className="w-3 h-3 mr-2" />
                    <span>{donation.quantity} {donation.unit}</span>
                    {donation.servings && <span className="ml-2">({donation.servings} servings)</span>}
                </div>
                <div className="flex items-center text-gray-600">
                    <MapPin className="w-3 h-3 mr-2" />
                    <span className="truncate">{donation.pickupAddress}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Clock className="w-3 h-3 mr-2" />
                    <span>Expires: {formatDate(donation.expiryDate)}</span>
                </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                    Created: {formatDate(donation.createdAt)}
                </div>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => onView(donation)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View Details"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onEdit(donation)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        title="Edit Donation"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(donation)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Donation"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DonationCards;