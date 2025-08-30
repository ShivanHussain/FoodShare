// StatCard.js - Statistics Card Component
import React from 'react';
import { TrendingUp, TrendingDown, Package, Heart, Users, Leaf } from 'lucide-react';

function StatCard({ title, value, change, choice, color, suffix = '', isLoading = false }) {
    const getIcon = () => {
        switch (choice) {
            case 1:
                return <Package className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />;
            case 2:
                return <Heart className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />;
            case 3:
                return <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />;
            case 4:
                return <Leaf className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />;
            default:
                return <Package className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />;
        }
    }

    return (
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-xl transition-all 
        duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                    <p className="text-gray-600 text-xs sm:text-sm font-medium truncate pr-2">
                        {title}
                    </p>
                    
                    {isLoading ? (
                        <div className="animate-pulse mt-2">
                            <div className="h-6 sm:h-7 lg:h-8 bg-gray-200 rounded w-16 sm:w-20 mb-2"></div>
                            <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16"></div>
                        </div>
                    ) : (
                        <>
                            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
                                {value.toLocaleString()}{suffix}
                            </p>
                            
                            <div className="flex items-center mt-1 sm:mt-2">
                                {change >= 0 ? (
                                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1 flex-shrink-0" />
                                ) : (
                                    <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-1 flex-shrink-0" />
                                )}
                                <span className={`text-xs sm:text-sm font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {Math.abs(change)}%
                                </span>
                                <span className="text-gray-500 text-xs sm:text-sm ml-1 truncate">
                                    vs last period
                                </span>
                            </div>
                        </>
                    )}
                </div>
                
                {/* Icon Container */}
                <div className={`p-2 sm:p-3 lg:p-4 rounded-full ${color} ${isLoading ? 'animate-pulse' : ''} 
                flex-shrink-0 ml-2 sm:ml-3`}>
                    {getIcon()}
                </div>
            </div>
        </div>
    );
}

export default StatCard;
