import React from 'react';
import {
  XCircle,
  Calendar,
  Star,
  Phone,
  MapPin
} from 'lucide-react';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">User Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center mb-6">
            <img
              src={user.avatar?.url || `/api/placeholder/64/64`}
              alt={user.name}
              className="w-16 h-16 rounded-full mb-4 sm:mb-0 sm:mr-4 bg-gradient-to-r from-green-400 to-blue-400 mx-auto sm:mx-0"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">{user.name}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{user.email}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start space-x-2 mt-2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  user.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.status || 'active'}
                </span>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  user.role === 'admin'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-3 flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-base">{user.phone}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-3 flex-shrink-0 mt-1" />
                <span className="text-gray-700 text-sm sm:text-base">{user.address}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-3 flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-base">
                  Joined: {new Date(user.joinDate || user.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-base">
                  Rating: {user.averageRating || 0}/5 ({user.totalFeedbacks || 0} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Donations</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{user?.donationHistory?.length || 0}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">User ID</p>
                <p className="text-base sm:text-md font-semibold text-blue-600">
                  {user._id || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;