import React from 'react';
import { Bell, Search, Menu, User, Star, MapPin } from 'lucide-react';

function Header({ userInfo, setIsMobileMenuOpen }) {
    
    // Format the creation date
    const formatJoinDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
        });
    };

    return (
        <div className="bg-white shadow-sm border-b border-gray-200 p-4 lg:p-6 sticky top-0 z-30">
            <div className="flex justify-between items-center">
                {/* Left side */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    
                    {/* Welcome message - hidden on mobile */}
                    <div className="hidden md:block">
                        <h1 className="text-lg font-semibold text-gray-900">
                            Welcome back, {userInfo?.name|| 'Admin'}!
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Member since {formatJoinDate(userInfo?.createdAt)}
                        </p>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                    {/* User info */}
                    <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 rounded-lg p-2 sm:p-3 cursor-pointer hover:bg-gray-100 transition-colors">
                        {/* User Avatar - Always visible */}
                        {userInfo?.avatar?.url ? (
                            <img 
                                src={userInfo?.avatar?.url} 
                                alt={userInfo?.name || 'User'} 
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm object-cover flex-shrink-0" 
                            />
                        ) : (
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                        )}
                        
                        {/* User Details - Now visible on mobile too */}
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                                <span className="text-gray-700 font-medium text-sm sm:text-base truncate">
                                    {userInfo?.name || 'Admin User'}
                                </span>
                                {userInfo?.role === 'admin' && (
                                    <span className="bg-purple-100 text-purple-700 text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-medium flex-shrink-0">
                                        Admin
                                    </span>
                                )}
                            </div>
                            
                            {/* Email and Rating Row */}
                            <div className="flex items-center justify-between space-x-2 mt-0.5 sm:mt-1">
                                <p className="text-xs text-gray-500 truncate">
                                    {userInfo?.email?.split('@')[0] || 'user@email.com'}
                                </p>
                                
                                {/* Rating */}
                                {userInfo?.averageRating && (
                                    <div className="flex items-center space-x-1 flex-shrink-0">
                                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                        <span className="text-xs text-yellow-700">
                                            {userInfo.averageRating}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;