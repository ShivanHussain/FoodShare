/* eslint-disable no-unused-vars */
import React from 'react';
import { Users, Navigation, MessageCircle, Shield } from 'lucide-react';
import NearbyNgoCardContent from '../../subComponents/NearbyNGO/NearbyNgoCardContent';

const PickupCard = ({ data, onGetDirections, onChatDonor, onVerifyOtp }) => {
  return (
    <div className="group w-full">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden hover:shadow-xl 
      sm:hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 border-2 
      border-transparent hover:border-green-200 w-full">
        
        {/* Card Header with gradient */}
        <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-3 sm:p-4 lg:p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 
          translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
          <div className="flex justify-between items-start relative z-10">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center 
                justify-center flex-shrink-0">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-lg sm:text-xl text-white drop-shadow-lg truncate">
                    {data.contactPerson}
                  </h3>
                  <p className="text-green-100 text-xs sm:text-sm font-medium truncate">
                    {data.foodType}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-green-50 to-blue-50">
          {/* Content Component */}
          <NearbyNgoCardContent data={data} />

          {/* Action Buttons  */}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Get Directions Button */}
            <button
              onClick={onGetDirections}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 
              hover:to-emerald-600 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl 
              font-medium transition-all duration-300 flex items-center justify-center space-x-2 
              shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transform hover:-translate-y-0.5 
              text-sm sm:text-base"
            >
              <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Get Directions</span>
              <span className="xs:hidden">Directions</span>
            </button>

            {/* Chat Button */}
            {/* <button
              onClick={onChatDonor}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 
              hover:to-cyan-600 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl 
              font-medium transition-all duration-300 flex items-center justify-center space-x-2 
              shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transform hover:-translate-y-0.5 
              text-sm sm:text-base"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Chat</span>
            </button> */}

            {/* Verify OTP Button */}
            <button
              onClick={onVerifyOtp}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 
              hover:to-pink-600 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl 
              font-medium transition-all duration-300 flex items-center justify-center space-x-2 
              shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transform hover:-translate-y-0.5 
              text-sm sm:text-base"
            >
              <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Verify OTP</span>
              <span className="xs:hidden">OTP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupCard;