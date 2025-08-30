import React from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

const DonationDeleteConfirmationModal = ({ isOpen, onClose, onConfirm, donation }) => {
    if (!isOpen || !donation) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
                            <h2 className="text-xl font-bold text-gray-900">Confirm Deletion</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete this donation? This action cannot be undone.
                        </p>

                        {/* Donation Info */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                {donation.images?.[0] && (
                                    <img
                                        src={donation.images[0].url}
                                        alt={donation.foodType}
                                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                    />
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                                        {donation.foodType}
                                    </h3>
                                    <p className="text-xs text-gray-500">{donation.category}</p>
                                    <p className="text-xs text-blue-600">{donation.foodPreference}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {donation.quantity} {donation.unit}
                                        {donation.servings && ` • ${donation.servings} servings`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-colors font-medium flex items-center justify-center"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Donation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationDeleteConfirmationModal;