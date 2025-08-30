import React from 'react'
import { X, AlertTriangle, Shield, User } from 'lucide-react';

function DeleteConfimationModal({ isOpen, onClose, onConfirm, user }) {
    // Delete Confirmation Modal Component
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full transform transition-all border border-gray-200">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="bg-red-100 p-3 rounded-full">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Delete User</h3>
                                <p className="text-sm text-gray-500">This action cannot be undone</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <div className="flex items-start space-x-3">
                                <img
                                    src={user?.avatar?.url || `/api/placeholder/40/40`}
                                    alt={user?.name}
                                    className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex-shrink-0"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{user?.name}</p>
                                    <p className="text-sm text-gray-600">{user?.email}</p>
                                    <div className="flex items-center mt-1">
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${user?.role === 'admin'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-green-100 text-green-800'
                                            }`}>
                                            {user?.role === 'admin' ? (
                                                <><Shield className="w-3 h-3 inline mr-1" />Admin</>
                                            ) : (
                                                <><User className="w-3 h-3 inline mr-1" />Donor</>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                            <p>• User profile and personal information will be permanently deleted</p>
                            <p>• All donation history ({user?.donationHistory?.length || 0} donations) will be removed</p>
                            <p>• User ratings and reviews will be lost</p>
                            <p>• This action cannot be reversed</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                            <AlertTriangle className="w-4 h-4" />
                            <span>Delete User</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfimationModal;
