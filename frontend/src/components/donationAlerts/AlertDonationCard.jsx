/* eslint-disable no-unused-vars */
import React from 'react';
import { Check, X, Package, Clock, Phone, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchNotifications, markNotificationRead } from '../../redux/slices/notificationSlice';
import { sendEmailOtp } from '../../redux/slices/pickupOtpSlice';
import { claimDonation } from '../../redux/slices/donationSlice';

function AlertDonationCard({ alerts, loading, setLoadingState }) {

    const dispatch = useDispatch();
    const handleAccept = async (donationId, notificationId) => {
        if (!donationId || !notificationId) {
            toast.error('Invalid donation or notification ID');
            return;
        }
        try {
            setLoadingState(true);

            const result = await dispatch(claimDonation({ id: donationId, statusValue: 'accepted' })).unwrap();
            await dispatch(markNotificationRead({ notificationId, statusValue: 'accepted' })).unwrap();
            await dispatch(sendEmailOtp({ donationId, notificationId })).unwrap();
            dispatch(fetchNotifications());

        } catch (error) {
            toast.error('Failed to accept donation', error.message || error.toString());
        } finally {
            setLoadingState(false);
        }
    };

    const handleReject = async (donationId, notificationId) => {
        if (!notificationId) {
            toast.error('Missing Notification ID');
            return;
        }
        try {
            setLoadingState(true);
            await dispatch(claimDonation({ id: donationId, statusValue: 'rejected' })).unwrap();
            await dispatch(markNotificationRead({ notificationId, statusValue: 'rejected' })).unwrap();
            dispatch(fetchNotifications());
        } catch (error) {
            toast.error('Failed to reject donation', 'error');
        } finally {
            setLoadingState(false);
        }
    };

    return (
        <div className="space-y-2">
            {alerts.map((alert) => (
                <div key={alert.id} 
                     className="bg-gradient-to-br from-white to-blue-50 rounded-xl sm:rounded-2xl 
                              p-3 sm:p-4 shadow-lg border border-blue-100 
                              hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                    
                    {/* Mobile Layout */}
                    <div className="block lg:hidden">
                        {/* Header Section */}
                        <div className="flex items-start gap-3 mb-1">
                            <div className="flex-shrink-0">
                                {alert.image?.url ? (
                                    <img
                                        src={alert.image.url}
                                        alt="donation"
                                        className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg shadow-md border-2 
                                        border-orange-200"
                                    />
                                ) : (
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-100 to-orange-200 
                                    rounded-lg flex items-center justify-center text-xl sm:text-2xl shadow-md">
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
                                    {alert.donor}
                                </h3>
                                <p className="text-sm sm:text-base text-blue-700 font-semibold">
                                    {alert.food}
                                </p>
                                <div className="flex items-center gap-2">
                                    <Package className="w-3 h-3 text-orange-600 flex-shrink-0" />
                                    <span className="text-xs sm:text-sm text-gray-700 truncate font-medium">
                                        {alert.quantity}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Info Grid - Mobile */}
                        <div className="space-y-1 mb-2 bg-blue-50 p-2 rounded-lg">
                            <div className="flex items-start gap-2">
                                <Clock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                                    {alert.timePosted}
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-700 line-clamp-2 font-medium">
                                    {alert.location}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                                    {alert.contact}
                                </span>
                            </div>
                        </div>

                        {/* Description - Mobile */}
                        {alert.description && alert.description !== "No description" && (
                            <div className="mb-2 p-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                                <p className="text-xs sm:text-sm text-gray-700">
                                    <span className="font-semibold text-green-700">Description: </span>
                                    {alert.description}
                                </p>
                            </div>
                        )}

                        {/* Action Buttons - Mobile */}
                        <div className="flex gap-2">
                            {alert.status === 'pending' ? (
                                <>
                                    <button
                                        onClick={() => handleAccept(alert.donationId, alert.id)}
                                        disabled={loading}
                                        className="flex-1 flex items-center justify-center gap-2 
                                                 bg-gradient-to-r from-green-400 to-emerald-500 text-white 
                                                 px-3 py-2 rounded-lg hover:from-green-500 hover:to-emerald-600 
                                                 transition-all duration-200 font-semibold disabled:opacity-50
                                                 text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-105"
                                    >
                                        <Check className="w-4 h-4" />
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(alert.donationId, alert.id)}
                                        disabled={loading}
                                        className="flex-1 flex items-center justify-center gap-2 
                                                 bg-gradient-to-r from-red-400 to-rose-500 text-white px-3 py-2 rounded-lg 
                                                 hover:from-red-500 hover:to-rose-600 transition-all duration-200 
                                                 font-semibold disabled:opacity-50 text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-105"
                                    >
                                        <X className="w-4 h-4" />
                                        Reject
                                    </button>
                                </>
                            ) : (
                                <div className={`text-center py-2 px-4 rounded-lg font-semibold w-full text-sm sm:text-base shadow-md
                                               ${alert.status === 'accepted'
                                    ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300'
                                    : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300'
                                    }`}>
                                    {alert.status === 'accepted' ? '✓ Accepted' : '✗ Rejected'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Desktop/Tablet Layout */}
                    <div className="hidden lg:flex gap-6">
                        {/* Left Section */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0">
                                        {alert.image?.url ? (
                                            <img
                                                src={alert.image.url}
                                                alt="donation"
                                                className="w-18 h-18 xl:w-20 xl:h-20 object-cover rounded-lg shadow-md border-2 border-orange-200"
                                            />
                                        ) : (
                                            <div className="w-18 h-18 xl:w-20 xl:h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg 
                                                          flex items-center justify-center text-2xl xl:text-3xl shadow-md">
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl xl:text-2xl font-bold text-gray-800">
                                            {alert.donor}
                                        </h3>
                                        <p className="text-base xl:text-lg text-blue-700 font-semibold">
                                            {alert.food}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Info Grid - Desktop */}
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mb-2 bg-blue-50 p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Package className="w-4 h-4 text-orange-600 flex-shrink-0" />
                                    <span className="text-sm text-gray-700 font-medium">{alert.quantity}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                    <span className="text-sm text-gray-700 font-medium">{alert.timePosted}</span>
                                </div>
                                <div className="flex items-start gap-2 xl:col-span-2">
                                    <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-700 font-medium">{alert.location}</span>
                                </div>
                            </div>

                            {/* Contact and Description - Desktop */}
                            <div className="text-sm text-gray-700 space-y-1">
                                <div className="flex items-center gap-2 bg-purple-50 p-2 rounded-lg">
                                    <Phone className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                    <span className="font-medium"><strong>Contact:</strong> {alert.contact}</span>
                                </div>
                                {alert.description && alert.description !== "No description" && (
                                    <div className="p-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                                        <p className="font-medium"><strong className="text-green-700">Description:</strong> {alert.description}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Section - Actions Desktop */}
                        <div className="flex flex-col justify-center gap-2 w-48 xl:w-56">
                            {alert.status === 'pending' ? (
                                <>
                                    <button
                                        onClick={() => handleAccept(alert.donationId, alert.id)}
                                        disabled={loading}
                                        className="flex items-center justify-center gap-2 
                                                 bg-gradient-to-r from-green-400 to-emerald-500 text-white 
                                                 px-4 py-2.5 xl:py-3 rounded-xl hover:from-green-500 hover:to-emerald-600 
                                                 transition-all duration-200 font-semibold disabled:opacity-50
                                                 shadow-md hover:shadow-lg transform hover:scale-105"
                                    >
                                        <Check className="w-4 h-4" />
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(alert.donationId, alert.id)}
                                        disabled={loading}
                                        className="flex items-center justify-center gap-2 
                                                 bg-gradient-to-r from-red-400 to-rose-500 text-white px-4 py-2.5 xl:py-3 rounded-xl 
                                                 hover:from-red-500 hover:to-rose-600 transition-all duration-200 
                                                 font-semibold disabled:opacity-50 shadow-md hover:shadow-lg transform hover:scale-105"
                                    >
                                        <X className="w-4 h-4" />
                                        Reject
                                    </button>
                                </>
                            ) : (
                                <div className={`text-center py-2.5 xl:py-3 px-4 rounded-xl font-semibold shadow-md
                                               ${alert.status === 'accepted'
                                    ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300'
                                    : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300'
                                    }`}>
                                    {alert.status === 'accepted' ? '✓ Accepted' : '✗ Rejected'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AlertDonationCard;