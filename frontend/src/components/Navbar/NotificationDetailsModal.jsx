import { X, Utensils, Package, Clock, MapPin, Eye, User, Mail, Phone, CheckCircle, XCircle } from 'lucide-react';

const NotificationDetailsModal = ({ isOpen,onClose,notification,onAccept,onReject,userRole}) => {
  if (!isOpen || !notification) return null;

  const handleAcceptClick = () => {
    if (onAccept && notification.donation?._id && notification._id) {
      onAccept(notification.donation._id, notification._id);
    }
  };

  const handleRejectClick = () => {
    if (onReject && notification.donation?._id && notification._id) {
      onReject(notification.donation._id, notification._id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-xl mx-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        style={{ 
          maxWidth: 'min(90vw, 28rem)',
          margin: '0 auto'
        }}
      >
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-bold">Donation Details</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-1 ml-2"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {notification.donation ? (
            <>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Utensils className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800">Food Type</h3>
                    <p className="text-gray-600">{notification.donation.foodType}</p>
                  </div>
                </div>

                {notification.donation.category && (
                  <div className="flex items-start space-x-3">
                    <Package className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-800">Category</h3>
                      <p className="text-gray-600">{notification.donation.category}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <Package className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800">Quantity</h3>
                    <p className="text-gray-600">{notification.donation.quantity}</p>
                  </div>
                </div>

                {notification.donation.expiresAt && (
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-800">Expiry Time</h3>
                      <p className="text-gray-600">
                        {new Date(notification.donation.expiresAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800">Pickup Location</h3>
                    <p className="text-gray-600 break-words">{notification.donation.pickupAddress}</p>
                  </div>
                </div>

                {notification.donation.description && (
                  <div className="flex items-start space-x-3">
                    <Eye className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-800">Description</h3>
                      <p className="text-gray-600 break-words">{notification.donation.description}</p>
                    </div>
                  </div>
                )}
              </div>

              {notification.donation.donor && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Donor Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-600 break-words">{notification.donation.donor.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-600 break-all">{notification.donation.donor.email}</span>
                    </div>
                    {notification.donation.donor.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-600">{notification.donation.donor.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action buttons for NGO users */}
              {userRole === 'ngo' && notification.status === 'pending' && (
                <div className="border-t pt-4">
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={handleAcceptClick}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 sm:py-2 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={handleRejectClick}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 sm:py-2 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Status display for non-pending notifications */}
              {notification.status !== 'pending' && (
                <div className="border-t pt-4">
                  <div className={`px-3 py-2 rounded-lg text-center font-medium ${
                    notification.status === 'accepted' 
                      ? 'bg-green-100 text-green-800' 
                      : notification.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    Status: {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No donation details available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailsModal;