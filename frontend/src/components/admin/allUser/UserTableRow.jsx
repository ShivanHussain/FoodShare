import React from 'react';
import { Eye, Edit, Trash2, MapPin, Star, Shield, User, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserTableRow = ({ user, index, onView, onEdit, onDelete, onVerifyToggle }) => {

  const handleVerifyToggle = () => {
    if (onVerifyToggle) {
      onVerifyToggle(user._id, !user.verified);
    }
  };

  return (
    <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
      }`}>
      {/* User Info */}
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
            <img
              src={user?.avatar?.url || `/api/placeholder/40/40`}
              alt={user.name}
              className="w-8 h-8 rounded-full mr-2 bg-gradient-to-r from-green-400 to-blue-400"
            />
          <Link to={`/select-user/${user._id}`}>
            <div className="font-medium text-gray-900 hover:text-blue-400">{user.name}</div>
            <div className="text-sm text-gray-500 hover:text-blue-400">{user.email}</div>
          </Link>
        </div>
      </td>

      {/* Role */}
      <td className="py-4 px-6">
        <div className="flex items-center space-x-2">
          {user.role === 'admin' ? (
            <>
              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                Admin
              </span>
            </>
          ) : (
            <>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Donor
              </span>
            </>
          )}
        </div>
      </td>

      {/* Verified Status */}
      <td className="py-4 px-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleVerifyToggle}
            className={`flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer ${user.verified === true || user.verified === 'true'
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            title="Click to toggle verification status"
          >
            {user.verified === true || user.verified === 'true' ? (
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
      <td className="py-4 px-6">
        <div className="flex items-center space-x-1 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{user.address}</span>
        </div>
      </td>

      {/* Donations */}
      <td className="py-4 px-6">
        <div className="flex items-center space-x-1">
          <span className="font-medium text-gray-900">
            {user?.donationHistory?.length || 0}
          </span>
        </div>
      </td>

      {/* Rating */}
      <td className="py-4 px-6">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="font-medium text-gray-900">{user.averageRating || 0}</span>
          <span className="text-sm text-gray-500">({user.totalFeedbacks || 0})</span>
        </div>
      </td>

      {/* Actions */}
      <td className="py-4 px-6">
        <div className="flex items-center space-x-2">
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
      </td>
    </tr>
  );
};

export default UserTableRow;