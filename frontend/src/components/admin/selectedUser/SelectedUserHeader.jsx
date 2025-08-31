import React from 'react';
import { User, Star } from 'lucide-react';

function SelectedUserHeader({ userInfo }) {
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };
    return (
        <>
            <section className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
                <div className="relative max-w-7xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                            {/* Profile Avatar */}
                            <div className="flex-shrink-0 flex items-center justify-center lg:h-full lg:min-h-[160px]">
                                <img src={userInfo?.avatar?.url || `/api/placeholder/100/100`} alt={userInfo?.name || "User Avatar"}
                                    className="w-12 h-12 lg:w-32 lg:h-32 rounded-full bg-gradient-to-r from-green-400 to-blue-400 p-1" />

                            </div>

                            {/* User Info */}
                            <div className="flex-1 text-center lg:text-left">
                                {/* First Row - User ID, Name, Email */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                    <div className="bg-white/50 rounded-2xl p-3">
                                        <p className="text-sm text-gray-600">User ID</p>
                                        <p className="text-lg font-semibold text-gray-900">{userInfo?._id?.slice(-12) || "xxxxxxxxxx"}</p>
                                    </div>
                                    <div className="bg-white/50 rounded-2xl p-3">
                                        <p className="text-sm text-gray-600">Name</p>
                                        <p className="text-md font-semibold text-gray-900">{userInfo?.name || 'John Doe'}</p>
                                    </div>
                                    <div className="bg-white/50 rounded-2xl p-3">
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="text-md font-semibold text-gray-900">{userInfo?.email || 'example@gmail.com'}</p>
                                    </div>
                                </div>

                                {/* Second Row - Total Donations, Feedback, Rating */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {(userInfo?.role === 'donor' || userInfo?.role === 'admin') ? (
                                        <div className="bg-white/50 rounded-2xl p-3">
                                            <p className="text-sm text-gray-600">Total Donations</p>
                                            <p className="text-2xl font-bold text-green-600">
                                                {userInfo?.donationHistory?.length || 0}
                                            </p>
                                        </div>
                                    ) : userInfo?.role === 'ngo' && (
                                        <div className="bg-white/50 rounded-2xl p-3">
                                            <p className="text-sm text-gray-600">Claimed Donations</p>
                                            <p className="text-2xl font-bold text-green-600">
                                                {userInfo?.claimedDonations?.length || 0}
                                            </p>
                                        </div>
                                    )}

                                    <div className="bg-white/50 rounded-2xl p-3">
                                        <p className="text-sm text-gray-600">Feedback Received</p>
                                        <p className="text-2xl font-bold text-blue-600">{userInfo?.feedbackReceived?.length || 0}</p>
                                    </div>

                                    <div className="bg-white/50 rounded-2xl p-3">
                                        <p className="text-sm text-gray-600">Overall Rating</p>
                                        <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                                            <span className="text-2xl font-bold text-yellow-600">{userInfo?.averageRating || 0}</span>
                                            <div className="flex">
                                                {renderStars(Math.floor(userInfo?.averageRating) || 0)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SelectedUserHeader;
