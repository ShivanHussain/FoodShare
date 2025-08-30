import React from 'react';
import { Eye, Edit, Trash2, MapPin, Star, Shield, User, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserCard = ({ user, index, onView, onEdit, onDelete }) => {
  return (
    <div key={user.id || `user-card-${index}`} className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <img
            src={user?.avatar?.url || `/api/placeholder/40/40`}
            alt={user.name}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full mr-3 bg-gradient-to-r from-green-400 to-blue-400"
          />
          <div>
            <Link to={`/select-user/${user._id}`}>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base hover:text-blue-400">{user.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500 hover:text-blue-400">{user.email}</p>
            </Link>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${user.role === 'admin'
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
              }`}>
              {user.role === 'admin' ? (
                <>
                  <Shield className="w-3 h-3 inline mr-1" />
                  Admin
                </>
              ) : (
                <>
                  <User className="w-3 h-3 inline mr-1" />
                  Donor
                </>
              )}
            </span>
          </div>
        </div>

        <button className="p-1 text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          {user.address}
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="font-medium">{user.averageRating || 0}</span>
            <span className="text-gray-500 ml-1">({user.totalFeedbacks || 0})</span>
          </div>
          <span className="font-semibold text-gray-900">
            {user?.donationHistory?.length || 0} donations
          </span>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onView(user._id)}
          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(user)}
          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
          title="Edit Role"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(user._id)}
          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
          title="Delete User"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default UserCard;