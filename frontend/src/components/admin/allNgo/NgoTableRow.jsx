/* eslint-disable no-unused-vars */
import React from 'react';
import { Eye, Edit, Trash2, MapPin, Star, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const NGOTableRow = ({ ngo, index, onView, onEdit, onDelete, onVerifyToggle }) => {
    
    const handleVerifyToggle = () => {
        if (onVerifyToggle) {
            onVerifyToggle(ngo._id, !ngo.verified);
        }
    };

    return (
        <tr
            key={ngo._id}
            className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
        >
            {/* NGO Info */}
            <td className="py-2 px-6">
                <div className="flex items-center">
                    <img
                        src={ngo?.avatar?.url || ''}
                        alt={ngo.name}
                        className="w-10 h-10 rounded-full mr-2 bg-gradient-to-r from-green-400 to-blue-400 object-cover"
                    />
                    <Link to={`/select-user/${ngo._id}`} className="min-w-0">
                        <p className="text-sm text-gray-900 truncate hover:text-blue-400">{ngo.name}</p>
                        <p className="text-sm text-gray-500 truncate hover:text-blue-400">{ngo.email}</p>
                        <p className="text-xs text-gray-400 truncate hover:text-blue-400">{ngo.registrationNumber}</p>
                    </Link>
                </div>
            </td>

            {/* Verified Status */}
            <td className="py-2 px-6">
                <div className="flex items-center">
                    <button
                        onClick={handleVerifyToggle}
                        className={`flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                            ngo.verified === true || ngo.verified === 'true' || ngo.status === 'verified'
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                        title="Click to toggle verification status"
                    >
                        {ngo.verified === true || ngo.verified === 'true' || ngo.status === 'verified' ? (
                            <>
                               
                                <span>Verified</span>
                            </>
                        ) : (
                            <>                             
                                <span>Unverified</span>
                            </>
                        )}
                    </button>
                </div>
            </td>

            {/* Address */}
            <td className="py-2 px-6">
                <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="font-medium truncate">{ngo.address || 'N/A'}</p>
                    </div>
                </div>
            </td>

            {/* Pickups */}
            <td className="py-2 px-6">
                <span className="font-semibold text-gray-900">{ngo.totalPickups || 0}</span>
            </td>

            {/* Rating */}
            <td className="py-2 px-6">
                <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{ngo.averageRating || 0}</span>
                    <span className="text-xs text-gray-500 ml-1">({ngo.totalFeedbacks || 0})</span>
                </div>
            </td>

            {/* Actions */}
            <td className="py-2 px-6">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onView(ngo)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View Details"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    {/* <button
                        onClick={() => onEdit(ngo)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        title="Edit NGO"
                    >
                        <Edit className="w-4 h-4" />
                    </button> */}
                    <button
                        onClick={() => onDelete(ngo)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete NGO"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default NGOTableRow;