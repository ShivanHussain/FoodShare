import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const PickupInfo = ({ selectedPickup }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Contact Information*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Donor Info */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border-l-4 border-blue-500">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2 flex-shrink-0" />
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Pickup Location</h3>
            </div>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <p className="font-medium text-gray-900 text-sm sm:text-base">{selectedPickup.contactPerson}</p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{selectedPickup.pickupAddress}</p>
            
            {selectedPickup.contactPhone && (
              <div className="flex items-center">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mr-1 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-blue-600">{selectedPickup.contactPhone}</p>
              </div>
            )}
            
            {selectedPickup.foodItems && (
              <div className="mt-3 p-2 sm:p-3 bg-blue-50 rounded border-l-2 border-blue-200">
                <p className="text-xs font-medium text-blue-700 mb-1">Food Items:</p>
                <p className="text-xs sm:text-sm text-blue-800">{selectedPickup.foodItems}</p>
              </div>
            )}
          </div>
        </div>

        {/* NGO Info */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border-l-4 border-green-500">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 flex-shrink-0" />
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Destination</h3>
            </div>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <p className="font-medium text-gray-900 text-sm sm:text-base">{selectedPickup.claimedBy.organizationName}</p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{selectedPickup.claimedBy.address}</p>
            
            {selectedPickup.claimedBy.phone && (
              <div className="flex items-center">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mr-1 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-green-600">{selectedPickup.claimedBy.phone}</p>
              </div>
            )}
            
            {selectedPickup.claimedBy.contactPerson && (
              <div className="mt-3 p-2 sm:p-3 bg-green-50 rounded border-l-2 border-green-200">
                <p className="text-xs font-medium text-green-700 mb-1">Contact Person:</p>
                <p className="text-xs sm:text-sm text-green-800">{selectedPickup.claimedBy.contactPerson}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupInfo;