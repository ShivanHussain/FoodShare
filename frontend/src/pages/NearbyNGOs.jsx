/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Users, MessageCircle, Navigation, X, Send, ChevronLeft, Filter, Search, Shield, Package } from 'lucide-react';
import { fetchClaimedDonations } from '../redux/slices/donationSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { verifyDonationOtp } from '../redux/slices/pickupOtpSlice';
import Header from '../components/NearbyNgo/Header';
import PickupCard from '../components/NearbyNgo/pickupCard';
import OtpModal from '../components/NearbyNgo/OtpModel';
import ChatComponent from '../components/NearbyNgo/ChatComponents';
import MapComponent from '../components/NearbyNgo/MapCard';

const NGOPickupDashboard = () => {
  const [showMap, setShowMap] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [map, setMap] = useState(null);
  
  const dispatch = useDispatch();
  const { claimedDonations, loading } = useSelector((state) => state.donation);

  useEffect(() => {
    dispatch(fetchClaimedDonations());
  }, [dispatch,showOtpModal]);

  const handleGetDirections = ({ data }) => {
    setSelectedPickup(data);
    setShowMap(true);
  };

  const handleChatDonor = ({ data }) => {
    setSelectedPickup(data);
    setShowChat(true);
  };

  const handleVerifyOtp = ({ data }) => {
    setSelectedPickup(data);
    setShowOtpModal(true);
    setOtpValues(['', '', '', '', '', '']);
    setOtpError('');
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpSubmit = () => {
    const enteredOtp = otpValues.join('');
    if (enteredOtp.length !== 6) {
      setOtpError('Please enter all 6 digits');
      return;
    }

    dispatch(verifyDonationOtp({
      otp: enteredOtp,
      donationId: selectedPickup._id,
      ngoId: selectedPickup.claimedBy._id,
      userId: selectedPickup.donorId
    }));

    setShowOtpModal(false);
    setSelectedPickup(null);
  };

  if (showMap && selectedPickup) {
    return <MapComponent selectedPickup={selectedPickup} onBack={() => { setShowMap(false); setMap(null); }} />;
  }

  if (showChat && selectedPickup) {
    return <ChatComponent selectedPickup={selectedPickup} onBack={() => setShowChat(false)} />;
  }

  if(loading){
    return <><Loader/></>;
  }

  return (
    <>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Component */}
            <Header totalPickups={claimedDonations.length} />

            {/* Conditional Content */}
            {claimedDonations.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="bg-white rounded-full p-6 mb-6 shadow-lg">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No Pickups Available
                </h3>
                <p className="text-gray-600 text-lg mb-2 max-w-md">
                  You haven't claimed any donations for pickup yet.
                </p>
                <p className="text-gray-500 text-sm max-w-md">
                  Browse available donations and claim them to start making a difference in your community.
                </p>
              </div>
            ) : (
              /* Pickup Cards Grid */
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {claimedDonations.map((data) => (
                  <PickupCard
                    key={data._id}
                    data={data}
                    onGetDirections={() => handleGetDirections({ data })}
                    onChatDonor={() => handleChatDonor({ data })}
                    onVerifyOtp={() => handleVerifyOtp({ data })}
                  />
                ))}
              </div>
            )}
          </div>

          {/* OTP Modal */}
          {showOtpModal && selectedPickup && (
            <OtpModal
              selectedPickup={selectedPickup}
              otpValues={otpValues}
              otpError={otpError}
              onOtpChange={handleOtpChange}
              onOtpKeyDown={handleOtpKeyDown}
              onOtpSubmit={handleOtpSubmit}
              onClose={() => setShowOtpModal(false)}
            />
          )}
        </div>
    </>
  );
};

export default NGOPickupDashboard;