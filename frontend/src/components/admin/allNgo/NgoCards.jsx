/* eslint-disable no-unused-vars */
import React from 'react';
import { Eye, Edit, Trash2, MapPin, Star, Truck } from 'lucide-react';

const NGOCards = ({ ngo, onView, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start flex-1 min-w-0">
                        <img
                            src={ngo?.avatar?.url || ''}
                            alt={ngo.name}
                            className="w-12 h-12 rounded-full mr-3 bg-gradient-to-r from-green-400 to-blue-400 object-cover flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-900 truncate">{ngo.name}</h3>
                            <p className="text-sm text-gray-500 truncate">{ngo.email}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex items-start text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="break-words">{ngo.address || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <Truck className="w-4 h-4 mr-1 text-gray-400" />
                            <span>{ngo.totalPickups || 0} pickups</span>
                        </div>
                        <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-400" />
                            <span>{ngo.averageRating || 'N/A'}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onView(ngo)}
                        className="flex-1 bg-blue-500 text-white py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
                    >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                    </button>
                    {/* <button
                        onClick={() => onEdit(ngo)}
                        className="flex-1 bg-green-500 text-white py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
                    >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                    </button> */}
                    <button
                        onClick={() => onDelete(ngo)}
                        className="bg-red-500 text-white py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center justify-center"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NGOCards;