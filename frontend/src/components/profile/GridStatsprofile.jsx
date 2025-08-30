import React, { useEffect, useMemo } from 'react';
import { Package, TrendingUp, Users, Star, DiamondPercent } from 'lucide-react';
import { getDonationHistory } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClaimedDonations } from '../../redux/slices/ngoSlice';

const StatsGrid = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { donationHistory } = useSelector((state) => state.user);
    const { claimedDonations } = useSelector((state) => state.ngo);

    useEffect(() => {
        if (userInfo?.role === 'donor') {
            dispatch(getDonationHistory({ role: userInfo?.role }));
        }
    }, [dispatch, userInfo?.role]);

    useEffect(() => {
        if (userInfo?.role === 'ngo') {
            dispatch(fetchClaimedDonations());
        }
    }, [dispatch, userInfo?.role])

    const stats = useMemo(() => {
        if (!userInfo) return {};

        const role = userInfo.role;
        const rating = userInfo.averageRating || 0;

        let totalDonations = 0;
        let totalKg = 0;

        if (role === 'donor') {
            // Add null/undefined checks and ensure arrays exist
            totalDonations = Array.isArray(donationHistory) ? donationHistory.length : 0;
            totalKg = Array.isArray(donationHistory)
                ? donationHistory.reduce((sum, d) => sum + (d?.quantity || 0), 0)
                : 0;

            return {
                donations: {
                    label: 'Total Donations',
                    value: totalDonations,
                    change: '+12%',
                    color: 'blue',
                    icon: Package
                },
                foodSaved: {
                    label: 'Food Saved',
                    value: `${totalKg} kg`,
                    change: '+8%',
                    color: 'green',
                    icon: TrendingUp
                },
                impact: {
                    label: 'People Helped',
                    value: totalDonations * 3,
                    change: '+15%',
                    color: 'purple',
                    icon: Users
                },
                rating: {
                    label: 'Rating',
                    value: rating,
                    change: '+0.2',
                    color: 'yellow',
                    icon: Star
                },
            };
        }

        if (role === 'ngo') {
            // Use userInfo.claimedDonations as fallback if claimedDonations from state is empty
            const ngoClaimedDonations = Array.isArray(claimedDonations) && claimedDonations.length > 0
                ? claimedDonations
                : (Array.isArray(userInfo.claimedDonations) ? userInfo.claimedDonations : []);

            totalDonations = ngoClaimedDonations.length;
            totalKg = ngoClaimedDonations.reduce((sum, d) => sum + (d?.quantity || 0), 0);

            return {
                collections: {
                    label: 'Collections',
                    value: totalDonations,
                    change: '+18%',
                    color: 'blue',
                    icon: Package
                },
                distributed: {
                    label: 'Distributed',
                    value: `${totalKg} kg`,
                    change: '+22%',
                    color: 'green',
                    icon: TrendingUp
                },
                partners: {
                    label: 'Partners',
                    value: userInfo.partnersCount || 12,
                    change: '+3',
                    color: 'purple',
                    icon: Users
                },
                rating: {
                    label: 'Rating',
                    value: rating,
                    change: '+0.1',
                    color: 'yellow',
                    icon: Star
                },
            };
        }

        return {};
    }, [userInfo, donationHistory, claimedDonations]); 

    const getColorClasses = (color) => {
        const colorMap = {
            blue: {
                bg: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600',
                shadow: 'shadow-blue-500/25'
            },
            green: {
                bg: 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600',
                shadow: 'shadow-green-500/25'
            },
            purple: {
                bg: 'bg-gradient-to-br from-purple-500 via-violet-600 to-pink-600',
                shadow: 'shadow-purple-500/25'
            },
            yellow: {
                bg: 'bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500',
                shadow: 'shadow-yellow-500/25'
            }
        };
        return colorMap[color];
    };

    return (
        <div className="w-full">
            {/* Stats Grid  */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
                {Object.entries(stats).map(([key, stat]) => {
                    const IconComponent = stat.icon;
                    const colorClasses = getColorClasses(stat.color);

                    return (
                        <div
                            key={key}
                            className="group relative bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
                        >
                            {/* Header Section  */}
                            <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
                                {/* Icon Container  */}
                                <div className={`
                                    w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14
                                    rounded-md sm:rounded-lg md:rounded-xl 
                                    flex items-center justify-center 
                                    ${colorClasses.bg} ${colorClasses.shadow}
                                    group-hover:scale-110 
                                    transition-all duration-300
                                    shadow-lg group-hover:shadow-xl
                                    flex-shrink-0
                                `}>
                                    <IconComponent className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-white drop-shadow-sm" />
                                </div>

                                {/* Change Indicator */}
                                <div className={`
                                    px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-2.5 md:py-1 
                                    rounded-full 
                                    text-xs sm:text-xs md:text-sm 
                                    font-medium 
                                    flex-shrink-0
                                    ${stat.change.startsWith('+')
                                        ? 'bg-green-50 text-green-600 ring-1 ring-green-200'
                                        : 'bg-red-50 text-red-600 ring-1 ring-red-200'
                                    }
                                    transition-all duration-200
                                    group-hover:scale-105
                                `}>
                                    {stat.change}
                                </div>
                            </div>

                            {/* Stats Content */}
                            <div className="space-y-0.5 sm:space-y-1 md:space-y-1.5">
                                {/* Value */}
                                <h3 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-tight truncate">
                                    {stat.value}
                                </h3>

                                {/* Label */}
                                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-tight group-hover:text-gray-700 transition-colors">
                                    {stat.label}
                                </p>
                            </div>

                            {/* Gradient Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/30 rounded-lg sm:rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>

                            {/* Subtle Border Glow on Hover */}
                            <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ring-1 ring-gray-200/50"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StatsGrid;