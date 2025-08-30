import React, { useState, useEffect } from 'react';
import { XCircle, Save, AlertCircle } from 'lucide-react';

const DonationStatusModal = ({ isOpen, onClose, donation, onUpdate }) => {
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (donation) {
            setStatus(donation.status || 'available');
        }
    }, [donation]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Only send the status update
        onUpdate({ status });
    };

    const getStatusBadge = (statusValue) => {
        const statusStyles = {
            available: 'bg-green-100 text-green-800',
            claimed: 'bg-blue-100 text-blue-800',
            'picked-up': 'bg-purple-100 text-purple-800',
            expired: 'bg-red-100 text-red-800',
            cancelled: 'bg-gray-100 text-gray-800'
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[statusValue] || statusStyles.cancelled}`}>
                {statusValue?.charAt(0).toUpperCase() + statusValue?.slice(1).replace('-', ' ')}
            </span>
        );
    };

    if (!isOpen || !donation) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full">
                <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center">
                            <AlertCircle className="w-6 h-6 text-blue-600 mr-2" />
                            Update Status
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <XCircle className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="p-4 sm:p-6">
                    {/* Donation Info */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex items-start space-x-3">
                            {donation.images?.[0] && (
                                <img
                                    src={donation.images[0].url}
                                    alt={donation.foodType}
                                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                />
                            )}
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    {donation.foodType}
                                </h3>
                                <p className="text-xs text-gray-500">{donation.category}</p>
                                <p className="text-xs text-blue-600">{donation.foodPreference}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {donation.quantity} {donation.unit}
                                    {donation.servings && ` • ${donation.servings} servings`}
                                </p>
                                <div className="mt-2">
                                    <span className="text-xs text-gray-500">Current Status: </span>
                                    {getStatusBadge(donation.status)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Select New Status
                            </label>
                            <div className="space-y-2">
                                {[
                                    { value: 'available', label: 'Available', color: 'green' },
                                    { value: 'claimed', label: 'Claimed', color: 'blue' },
                                    { value: 'picked-up', label: 'Picked Up', color: 'purple' },
                                    { value: 'expired', label: 'Expired', color: 'red' },
                                    { value: 'cancelled', label: 'Cancelled', color: 'gray' }
                                ].map(({ value, label, color }) => (
                                    <label
                                        key={value}
                                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                                            status === value
                                                ? `border-${color}-500 bg-${color}-50`
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            value={value}
                                            checked={status === value}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-sm font-medium text-gray-900">
                                                {label}
                                            </span>
                                            {getStatusBadge(value)}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={status === donation.status}
                                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                                    status === donation.status
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                                }`}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Update Status
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DonationStatusModal;