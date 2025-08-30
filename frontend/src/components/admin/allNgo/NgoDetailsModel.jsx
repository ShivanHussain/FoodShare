import React from 'react';
import { X, Users, Truck, Star, Phone, Mail, MapPin, Calendar } from 'lucide-react';

const NGODetailsModal = ({ isOpen, onClose, ngo }) => {
    if (!isOpen || !ngo) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-2 sm:p-4 mt-16">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[70vh] sm:max-h-[90vh] overflow-hidden flex flex-col">

                {/* Modal Header */}
                <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">NGO Details</h2>
                        <button
                            onClick={onClose}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 sm:p-6 ">

                        {/* NGO Header */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
                            <img
                                src={ngo?.avatar?.url || ''}
                                alt={ngo.name}
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-green-400 to-blue-400 object-cover flex-shrink-0"
                            />
                            <div className="flex-1 text-center sm:text-left min-w-0">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 break-words">{ngo.name}</h3>
                                <p className="text-gray-600 mb-1 text-sm sm:text-base break-words">{ngo.email}</p>
                                <p className="text-gray-500 text-xs sm:text-sm">Registration: {ngo.registrationNumber}</p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl text-center sm:text-left">
                                <div className="flex items-center justify-center sm:justify-start mb-2">
                                    <Users className="w-4 h-4 lg:w-5 lg:h-5 text-green-600 mr-2" />
                                    <span className="text-sm text-gray-600 font-medium">NGO ID</span>
                                </div>
                                <p className="text-sm font-bold text-green-600 truncate">{ngo._id || 'N/A'}</p>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl text-center sm:text-left">
                                <div className="flex items-center justify-center sm:justify-start mb-2">
                                    <Truck className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 mr-2" />
                                    <span className="text-sm text-gray-600 font-medium">Total Pickups</span>
                                </div>
                                <p className="text-lg sm:text-xl font-bold text-blue-600">{ngo.totalPickups || 0}</p>
                            </div>

                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl text-center sm:text-left sm:col-span-2 lg:col-span-1">
                                <div className="flex items-center justify-center sm:justify-start mb-2">
                                    <Star className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-600 mr-2" />
                                    <span className="text-sm text-gray-600 font-medium">Rating</span>
                                </div>
                                <p className="text-lg sm:text-xl font-bold text-yellow-600">{ngo.averageRating || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Contact Information */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-900 text-base lg:text-lg border-b border-gray-200 pb-2">Contact Information</h4>
                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm lg:text-base break-words">{ngo.phone || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <Mail className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm lg:text-base break-words">{ngo.email}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm lg:text-base break-words">{ngo.address || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Operational Details */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-gray-900 text-base lg:text-lg border-b border-gray-200 pb-2">Operational Details</h4>
                                <div className="space-y-3">
                                    {ngo.createdAt && (
                                        <div className="flex items-start">
                                            <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <span className="text-sm text-gray-600">Joined: </span>
                                                <span className="text-gray-700 text-sm lg:text-base">{new Date(ngo.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NGODetailsModal;