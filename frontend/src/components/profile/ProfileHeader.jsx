import React from 'react';
import {
    MapPin,
    Calendar,
    Shield,
    Star,
    Camera,
    Settings,
    Edit3
} from 'lucide-react';
import Rating from './Rating';

const ProfileHeader = ({ user, onEditClick, onSettingsClick }) => {

    return (
        <div className="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 
        lg:p-8 text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl transform 
                translate-x-16 sm:translate-x-32 -translate-y-16 sm:-translate-y-32"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-white/10 rounded-full blur-2xl transform 
                -translate-x-12 sm:-translate-x-24 translate-y-12 sm:translate-y-24"></div>
                <div className="absolute top-1/2 left-1/2 w-16 h-16 sm:w-32 sm:h-32 bg-white/5 rounded-full blur-xl transform 
                -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="relative z-10">
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="relative group">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-xl font-bold 
                                backdrop-blur-sm border border-white/20 shadow-xl">
                                    {user?.avatar ? (
                                        <img src={user.avatar.url} alt="Profile" className="w-full h-full rounded-xl object-cover" />
                                    ) : (
                                        <span className="text-white">{user?.name?.charAt(0) || 'U'}</span>
                                    )}
                                </div>
                                {user?.verified && (
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 
                                    rounded-full flex items-center justify-center shadow-lg">
                                        <Shield className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">{user?.name || 'Loading...'}</h1>
                                <div className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm border 
                                border-white/20 inline-block">
                                    {user?.role === 'donor' ? 'Donor' : user?.role === 'ngo' ? 'NGO' : 'Admin'}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onSettingsClick}
                                className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all backdrop-blur-sm border border-white/20"
                            >
                                <Settings className="w-4 h-4 text-white" />
                            </button>
                            <button
                                onClick={onEditClick}
                                className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all backdrop-blur-sm border border-white/20"
                            >
                                <Edit3 className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm text-white/80">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{user?.address || 'Location not specified'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear()}</span>
                            </div>

                           <Rating rating={user.averageRating}/>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center gap-4 md:gap-6">
                    <div className="relative group">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold backdrop-blur-sm border border-white/20 shadow-xl">
                            {user?.avatar ? (
                                <img src={user.avatar.url} alt="Profile" className="w-full h-full rounded-2xl object-cover" />
                            ) : (
                                <span className="text-white">{user?.name?.charAt(0) || 'U'}</span>
                            )}
                        </div>

                        {user?.verified && (
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                <Shield className="w-4 h-4 text-white" />
                            </div>
                        )}

                        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100">
                            <Camera className="w-4 h-4 text-white" />
                        </button>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-white truncate">{user?.name || 'Loading...'}</h1>
                            <div className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20 flex-shrink-0">
                                {user?.role === 'donor' ? 'Donor' : user?.role === 'ngo' ? 'NGO' : 'Admin'}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-white/80 mb-4">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span className="text-sm truncate">{user?.address || 'Location not specified'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 flex-shrink-0" />
                                <span className="text-sm">Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear()}</span>
                            </div>
                        </div>
                        {/* Raing component */}
                        <Rating rating={user.averageRating}/>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        <button
                            onClick={onSettingsClick}
                            className="p-2 sm:p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all backdrop-blur-sm border border-white/20"
                        >
                            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </button>
                        <button
                            onClick={onEditClick}
                            className="flex items-center gap-2 px-3 py-2 sm:px-6 sm:py-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all backdrop-blur-sm border border-white/20"
                        >
                            <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            <span className="text-white font-medium text-sm sm:text-base hidden sm:inline">Edit Profile</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;