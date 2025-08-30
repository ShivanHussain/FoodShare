import {
  X,
  Utensils,
  Package,
  Clock,
  MapPin,
  Eye,
  User,
  Mail,
  Phone,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function NotificationDetailsModal({
  selectedNotification,
  isNotificationDetailsOpen,
  setIsNotificationDetailsOpen,
  handleAccept,
  handleReject
}) {
  if (!selectedNotification || !isNotificationDetailsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-xl">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Donation Details</h2>
            <button
              onClick={() => setIsNotificationDetailsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          {selectedNotification.donation ? (
            <>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Utensils className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Food Type</h3>
                    <p className="text-gray-600">{selectedNotification.donation.foodType}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Package className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Quantity</h3>
                    <p className="text-gray-600">{selectedNotification.donation.quantity}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Expiry Time</h3>
                    <p className="text-gray-600">
                      {new Date(selectedNotification.donation.expiresAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Pickup Location</h3>
                    <p className="text-gray-600">{selectedNotification.donation.pickupAddress}</p>
                  </div>
                </div>

                {selectedNotification.donation.description && (
                  <div className="flex items-start space-x-3">
                    <Eye className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Description</h3>
                      <p className="text-gray-600">{selectedNotification?.donation?.description}</p>
                    </div>
                  </div>
                )}
              </div>

              {selectedNotification.donation.donor && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Donor Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{selectedNotification.donation.donor.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{selectedNotification.donation.donor.email}</span>
                    </div>
                    {selectedNotification.donation.donor.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{selectedNotification.donation.donor.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => handleAccept(selectedNotification.donation._id, selectedNotification._id)}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Accept Donation</span>
                </button>
                <button
                  onClick={() => handleReject(selectedNotification.donation._id, selectedNotification._id)}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Reject</span>
                </button>
              </div>
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
}