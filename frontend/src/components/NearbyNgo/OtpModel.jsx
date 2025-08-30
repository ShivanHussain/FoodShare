import React from 'react';
import { X } from 'lucide-react';

const OtpModal = ({ selectedPickup, otpValues, otpError, onOtpChange, onOtpKeyDown, onOtpSubmit, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
            Verify OTP
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Information */}
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-gray-600 mb-2 text-sm sm:text-base">
            Enter the OTP provided by{' '}
            <strong className="text-gray-800">
              {selectedPickup.restaurant || selectedPickup.contactPerson}
            </strong>
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            This confirms successful pickup of the food donation
          </p>
        </div>

        {/* OTP Input Fields */}
        <div className="flex justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
          {otpValues.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              value={value}
              onChange={(e) => onOtpChange(index, e.target.value)}
              onKeyDown={(e) => onOtpKeyDown(index, e)}
              className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-bold 
              border-2 border-gray-300 rounded-lg sm:rounded-xl focus:outline-none 
              focus:ring-2 focus:ring-green-500 focus:border-transparent 
              transition-all duration-200"
              autoComplete="off"
            />
          ))}
        </div>

        {/* Error Message */}
        {otpError && (
          <div className="text-red-500 text-sm text-center mb-4">
            {otpError}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 
            px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium 
            transition-colors text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={onOtpSubmit}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 
            hover:from-green-600 hover:to-emerald-600 text-white px-4 sm:px-6 
            py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all 
            duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Verify & Complete
          </button>
        </div>

        {/* Additional Information */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600 mb-2">
              <strong>Pickup Details:</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              <div>
                <span className="font-medium text-gray-700">NGO:</span>
                <p className="text-gray-600 truncate">
                  {selectedPickup.claimedBy?.organizationName || 'N/A'}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Food Type:</span>
                <p className="text-gray-600 truncate">
                  {selectedPickup.foodType || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;