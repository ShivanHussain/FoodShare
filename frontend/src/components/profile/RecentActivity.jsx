
import React, { useEffect } from 'react';
import {
    Heart,
    Package,
    Users,
    Clock,
    MapPin,
    CheckCircle,
    TrendingUp,
    Gift,
    Calendar,
    User,
    Building,
    Star,
    ArrowRight,
    Activity
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoneyValueSaved, fetchTotalMeals, fetchWasteReduced } from '../../redux/slices/ngoAnalyticsSlice';

const RecentActivity = ({ user, recentDonations = [], recentClaims = [] }) => {

    const dispatch = useDispatch();

    useEffect(() => {

        if (user?.role === 'ngo') {
            dispatch(fetchTotalMeals());
            dispatch(fetchWasteReduced());
            dispatch(fetchMoneyValueSaved());
        }


    }, [dispatch, user.role])

    const { totalMeals, moneySaved, wasteReduced } = useSelector((state) => state.ngoImpact);

    const DonorActivity = () => (
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-emerald-600" />
                    Recent Donations
                </h3>
            </div>

            {recentDonations.length === 0 ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Gift className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">No recent donations yet</p>
                    <p className="text-gray-400 text-xs mt-1">Start donating to see your activity here</p>
                </div>
            ) : (
                <div className="space-y-3 sm:space-y-4">
                    {recentDonations.map((donation) => (
                        <div key={donation._id} className="group relative overflow-hidden">
                            <div className="flex items-start gap-3 sm:gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl hover:from-emerald-50
                             hover:to-green-50 transition-all duration-300 cursor-pointer">
                                {/* Status Icon */}
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transition-transform group-hover:scale-110 ${donation.status === 'claimed' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                                    donation.status === 'picked-up' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                                        donation.status === 'delivered' ? 'bg-gradient-to-r from-purple-500 to-pink-600' :
                                            'bg-gradient-to-r from-orange-500 to-red-600'
                                    }`}>
                                    {donation.status === 'claimed' && <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                                    {donation.status === 'picked-up' && <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                                    {donation.status === 'delivered' && <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                                    {donation.status === 'available' && <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                                </div>

                                <div className="flex-1 min-w-0">
                                    {/* Food Type & Quantity */}
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                            {donation.foodType}
                                        </h4>
                                        <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm flex-shrink-0">
                                            {donation.quantity}
                                        </span>
                                    </div>

                                    {/* NGO Info */}
                                    {donation.claimedBy && (
                                        <div className="flex items-center gap-2 mb-2">
                                            <Building className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                            <span className="text-sm text-gray-600 truncate">
                                                {donation.claimedBy.organizationName}
                                            </span>
                                        </div>
                                    )}

                                    {/* Location & Time */}
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            <span className="truncate">{donation.pickupAddress}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <span>{new Date(donation.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${donation.status === 'claimed' ? 'bg-green-100 text-green-700' :
                                    donation.status === 'picked-up' ? 'bg-blue-100 text-blue-700' :
                                        donation.status === 'delivered' ? 'bg-purple-100 text-purple-700' :
                                            'bg-orange-100 text-orange-700'
                                    }`}>
                                    {donation.status === 'claimed' ? 'Claimed' :
                                        donation.status === 'picked-up' ? 'Picked Up' :
                                            donation.status === 'delivered' ? 'Delivered' :
                                                'Available'}
                                </div>
                            </div>

                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
    const NGOActivity = () => (
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Recent Collections
                </h3>
            </div>

            {recentClaims.length === 0 ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">No recent collections yet</p>
                    <p className="text-gray-400 text-xs mt-1">Start claiming donations to see your activity here</p>
                </div>
            ) : (
                <div className="space-y-3 sm:space-y-4">
                    {recentClaims.map((claim, index) => (
                        <div key={claim._id || index} className="group relative overflow-hidden">
                            <div className="flex items-start gap-3 sm:gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 cursor-pointer">
                                {/* Status Icon */}
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transition-transform group-hover:scale-110 ${claim.status === 'claimed' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                                    claim.status === 'pick-up' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                                        'bg-gradient-to-r from-orange-500 to-yellow-600'
                                    }`}>
                                    {claim.status === 'claimed' && <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                                    {claim.status === 'pick-up' && <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                                </div>

                                <div className="flex-1 min-w-0">
                                    {/* Food Type & Quantity */}
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                            {claim.foodType || 'Mixed Food Items'}
                                        </h4>
                                        <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm flex-shrink-0">
                                            {claim.quantity || '10kg'}
                                        </span>
                                    </div>

                                    {/* Donor Info */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                        <span className="text-sm text-gray-600 truncate">
                                            From: {claim.donorId.name || 'Anonymous Donor'}
                                        </span>
                                    </div>

                                    {/* Location & Time */}
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            <span className="truncate">{claim.pickupAddress || 'Local Community'}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <span>{new Date(claim.claimedAt || Date.now()).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${claim.status === 'distributed' ? 'bg-green-100 text-green-700' :
                                    claim.status === 'collected' ? 'bg-blue-100 text-blue-700' :
                                        'bg-orange-100 text-orange-700'
                                    }`}>
                                    {claim.status === 'claimed' ? 'Pending' :
                                        claim.status === 'pick-up' ? 'Collected' :
                                            'Pending'}
                                </div>
                            </div>

                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            )}

            {/* Quick Stats for NGO */}
            <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-lg sm:text-xl font-bold text-blue-600">{totalMeals || 0}</div>
                        <div className="text-xs text-gray-500">Total Meals</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg sm:text-xl font-bold text-green-600">{moneySaved || 0}</div>
                        <div className="text-xs text-gray-500">Money Saved</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg sm:text-xl font-bold text-purple-600">{wasteReduced || 0}</div>
                        <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                            Waste Reduced
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



    return (
        <>
            {user?.role === 'donor' ? (
                <DonorActivity />
            ) : (
                <NGOActivity />
            )}
        </>
    );
};

export default RecentActivity;