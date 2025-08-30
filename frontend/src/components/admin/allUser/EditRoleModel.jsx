import React, { useState } from 'react';
import { X, User, Shield, AlertCircle } from 'lucide-react';

const EditRoleModal = ({ isOpen, onClose, onConfirm, user, loading }) => {
  const [selectedRole, setSelectedRole] = useState(user?.role || 'donor');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole !== user?.role) {
      onConfirm(user._id, selectedRole);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full transform transition-all border border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Edit User Role</h3>
                  <p className="text-sm text-gray-500">Change user permissions</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Info */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar?.url || `/api/placeholder/40/40`}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                  <div className="flex items-center mt-1">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      user?.role === 'admin'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      Current: {user?.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select New Role
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="donor"
                    checked={selectedRole === 'donor'}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mr-3 text-green-600"
                  />
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-green-600 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">Donor</p>
                      <p className="text-xs text-gray-500">Can create and manage donations</p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={selectedRole === 'admin'}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mr-3 text-red-600"
                  />
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-red-600 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">Admin</p>
                      <p className="text-xs text-gray-500">Full access to admin panel</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Warning */}
            {selectedRole === 'admin' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-yellow-800 font-medium">Admin Access Warning</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Admin users will have full access to manage all users, donations, and system settings.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || selectedRole === user?.role}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>Update Role</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoleModal;