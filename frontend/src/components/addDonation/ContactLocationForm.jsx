/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { MapPin, Phone, Mail, AlertCircle , User} from 'lucide-react';
import { checkLocationAvailability, getCurrentLocation } from '../../utils/locationService';

const ContactLocationForm = ({ formData, onInputChange }) => {

  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const locationStatus = checkLocationAvailability();
  const handleUseMyLocation = () => {
    const onSuccess = (address, coords) => {
      onInputChange('pickupAddress', address);
    };

    const onError = (error) => {
      setLocationError(error);
    };

    const onLoading = (loading) => {
      setFetchingLocation(loading);
    };

    getCurrentLocation(onSuccess, onError, onLoading);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
        Contact & Pickup Details
      </h2>

      {/* Contact Person & Phone  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
            Contact Person*
          </label>
          <input
            type="text"
            value={formData.contactPerson}
            onChange={(e) => onInputChange('contactPerson', e.target.value)}
            disabled
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 
            sm:focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-sm 
            sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
            Phone Number*
          </label>
          <input
            type="tel"
            value={formData.contactPhone}
            onChange={(e) => onInputChange('contactPhone', e.target.value)}
            disabled
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 
            sm:focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50 text-sm 
            sm:text-base"
            required
          />
        </div>
      </div>

      {/* Email & Alternate Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
            Email Address*
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 
            sm:focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
            Alternate Contact Number
          </label>
          <input
            type="tel"
            value={formData.alternateContactNumber}
            onChange={(e) => onInputChange('alternateContactNumber', e.target.value)}
            placeholder="Optional backup contact"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 sm:focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Pickup Address with Location Button */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
          Pickup Address*
        </label>
        <textarea
          value={formData.pickupAddress}
          onChange={(e) => onInputChange('pickupAddress', e.target.value)}
          placeholder="Full address with landmark for easy pickup"
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 sm:focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 h-20 sm:h-24 resize-none text-sm sm:text-base"
          required
        />

        {/* Location Button */}
        <div className="mt-3 space-y-2 mb-2">
          <button
            type="button"
            onClick={handleUseMyLocation}
            className={`flex items-center justify-center sm:justify-start gap-2 px-4 py-2 sm:py-2 rounded-full text-sm font-medium transition-all duration-300 w-full sm:w-auto ${
              fetchingLocation
                ? 'bg-blue-100 text-blue-600 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg'
            }`}
            disabled={fetchingLocation || !locationStatus.canUseLocation}
          >
            {fetchingLocation ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span className="hidden sm:inline">Getting Location...</span>
                <span className="sm:hidden">Getting...</span>
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">Use My Current Location</span>
                <span className="sm:hidden">Use Current Location</span>
              </>
            )}
          </button>

          {/* Error Message*/}
          {locationError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start">
                <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-red-700">{locationError}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactLocationForm;