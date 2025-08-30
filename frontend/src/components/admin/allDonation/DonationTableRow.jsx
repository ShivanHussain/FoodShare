import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonationTableRow = ({ donation, index, onView, onEdit, onDelete }) => {
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
        <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
            <td className="py-4 px-6">
                <div className="flex items-center">
                    {donation.images?.[0] && (
                        <img
                            src={donation.images[0].url}
                            alt={donation.foodType}
                            className="h-12 w-12 rounded-lg object-cover mr-4"
                        />
                    )}
                    <Link to={`/select-donation/${donation._id}`}>
                        <div className="text-sm font-semibold text-gray-900 hover:text-blue-500" >
                            {donation.foodType}
                        </div>
                        <div className="text-xs text-gray-500 hover:text-blue-500">
                            {donation.category}
                        </div>
                        <div className="text-xs text-blue-600 font-medium  hover:text-blue-500">
                            {donation.foodPreference}
                        </div>
                    </Link>
                </div>
            </td>

            <td className="py-4 px-6">
                <div className="text-sm font-semibold text-gray-900">
                    {donation.quantity} {donation.unit}
                </div>
                {donation.servings && (
                    <div className="text-xs text-gray-500">
                        {donation.servings} servings
                    </div>
                )}
            </td>

            <td className="py-4 px-6">
                {getStatusBadge(donation.status)}
            </td>

            <td className="py-4 px-6 text-sm text-gray-500">
                {formatDate(donation.createdAt)}
            </td>

            <td className="py-4 px-6 text-sm text-gray-500">
                {formatDate(donation.expiryDate)}
            </td>

            <td className="py-4 px-6">
                <div className="flex items-center space-x-2">
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
            </td>
        </tr>
    );
};

export default DonationTableRow;