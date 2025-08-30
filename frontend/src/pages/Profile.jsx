import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { Heart, Award } from 'lucide-react'
import { getRecentThreeDonations, getRecentThreeDonationsNgo, updateUserProfile, updateUserPassword } from '../redux/slices/userSlice';
import { EditModal } from '../components/profile/ProfileEditModel';
import { AchievementsSection } from '../components/profile/AchievementsSectionProfile';
import { QuickActions } from '../components/profile/QuickActionsProfile';
import { SettingsModal } from '../components/profile/UpdatePasswordProfile';
import { getCurrentUser } from '../redux/slices/authSlice';
import ProfileHeader from '../components/profile/ProfileHeader';
import RecentActivity from '../components/profile/RecentActivity';
import StatsGrid from '../components/profile/GridStatsprofile';
import ContactInfo from '../components/profile/ContactInfoProfile';
import { fetchFeedbacksReceived } from '../redux/slices/feedbackSlice';
import ShowFeedbackAndHeader from '../components/profile/ShowFeedbackAndHeader';

export default function ModernProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [selectedImageFile, setSelectedImageFile] = useState(null); 
    const dispatch = useDispatch();

    //Get data from both auth and user slices
    const { userInfo  } = useSelector((state) => state.auth);
    const { userInfo: updatedUserInfo, recentDonations, recentNgoDonations } = useSelector((state) => state.user);
    const { feedbacksReceived } = useSelector((state) => state.feedback);

    // User data state
    const [user, setUserInfo] = useState(null);

    useEffect(() => {
        const currentUserInfo = updatedUserInfo || userInfo;

        if (currentUserInfo && currentUserInfo._id) {
            const userData = {
                id: currentUserInfo._id,
                name: currentUserInfo.name || 'Unknown User',
                email: currentUserInfo.email || 'email@example.com',
                phone: currentUserInfo.phone || '',
                address: currentUserInfo.address || '',
                role: currentUserInfo.role || 'user',
                averageRating: currentUserInfo.averageRating || '1',
                totalFeedbacks: currentUserInfo.totalFeedbacks || '0',
                registrationNumber: currentUserInfo.registrationNumber || '',
                organizationName: currentUserInfo.organizationName || '',
                createdAt: currentUserInfo.createdAt || new Date().toISOString(),
                verified: currentUserInfo.verified ?? false,
                avatar: currentUserInfo.avatar ?? null
            };
            setUserInfo(userData);
            setIsLoading(false);
        } else if (userInfo === null && updatedUserInfo === null) {
            setIsLoading(false);
        }
    }, [userInfo, updatedUserInfo]);

    // Fetch user data on component mount if not available
    useEffect(() => {
        if (!userInfo && !updatedUserInfo) {
            dispatch(getCurrentUser());
        }
    }, [dispatch, userInfo, updatedUserInfo]);

    // Handle loading timeout
    useEffect(() => {
        let timeoutId;

        if (!userInfo && !updatedUserInfo && isLoading) {
            timeoutId = setTimeout(() => {
                console.warn("User data not loaded within timeout");
                setIsLoading(false);
            }, 3000);
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [userInfo, updatedUserInfo, isLoading]);

    // Fetch donations and feedbacks
    useEffect(() => {
        const currentUserInfo = updatedUserInfo || userInfo;

        if (currentUserInfo?.role === 'donor') {
            dispatch(getRecentThreeDonations());
        }

        if (currentUserInfo?.role === 'ngo') {
            dispatch(getRecentThreeDonationsNgo());
        }
    }, [dispatch, userInfo?.role, updatedUserInfo?.role, updatedUserInfo, userInfo]);

    useEffect(() => {
        const currentUserInfo = updatedUserInfo || userInfo;
        if (currentUserInfo?._id) {
            dispatch(fetchFeedbacksReceived());
        }
    }, [dispatch, userInfo?._id, updatedUserInfo?._id, updatedUserInfo, userInfo]);

    const achievements = [
        { icon: Award, name: 'Top Contributor', description: 'Donated 20+ times', earned: true, color: 'from-yellow-400 to-orange-500' },
        { icon: Heart, name: 'Community Hero', description: 'Helped 100+ people', earned: true, color: 'from-pink-400 to-red-500' },
    ];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: '',
        profileImage: null // Add profileImage field
    });

    // Update form data when editing starts
    useEffect(() => {
        const currentUserInfo = updatedUserInfo || userInfo;

        if (currentUserInfo && isEditing) {
            setFormData({
                name: currentUserInfo.name || '',
                email: currentUserInfo.email || '',
                phone: currentUserInfo.phone || '',
                address: currentUserInfo.address || '',
                role: currentUserInfo.role || '',
                profileImage: null // Reset image selection when modal opens
            });
            setSelectedImageFile(null); // Reset selected file
        }
    }, [userInfo, updatedUserInfo, isEditing]);
    
    const handleInputChange = useCallback((e) => {
        const { name, value, files } = e.target;
        
        if (name === 'profileImage') {
            if (files && files[0]) {
                // New image file selected
                setSelectedImageFile(files[0]);
                setFormData((prev) => ({
                    ...prev,
                    [name]: files[0]
                }));
            } else if (value === 'RESET_TO_ORIGINAL') {
                // Reset to original image
                setSelectedImageFile(null);
                setFormData((prev) => ({
                    ...prev,
                    [name]: null
                }));
            } else if (value === null) {
                // Remove image
                setSelectedImageFile(null);
                setFormData((prev) => ({
                    ...prev,
                    [name]: null
                }));
            }
        } else {
            // Regular input fields
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    }, []);

    const handleSave = useCallback(async () => {
        try {
            const currentUserInfo = updatedUserInfo || userInfo;
            
            // Create FormData for multipart/form-data
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('address', formData.address);
            formDataToSend.append('role', currentUserInfo.role);

            // Add profile image if a new one was selected
            if (selectedImageFile) {
                formDataToSend.append('profileImage', selectedImageFile);
            }
            // Update profile 
            await dispatch(updateUserProfile(formDataToSend)).unwrap();

            dispatch(getCurrentUser());

            // Close modal after successful update
            setIsEditing(false);
            
            // Reset selected image file
            setSelectedImageFile(null);

        } catch (error) {
            console.error("Profile update failed:", error);
            throw error;
        }
    }, [formData, selectedImageFile, dispatch, userInfo, updatedUserInfo]);

    // Password update handler
    const handlePasswordUpdate = useCallback(async (passwordData) => {
        try {
            await dispatch(updateUserPassword(passwordData)).unwrap();
            setIsSettingsOpen(false);
        } catch (error) {
            console.error("Password update failed:", error);
            throw error;
        }
    }, [dispatch]);

    // Handler functions for ProfileHeader
    const handleEditClick = useCallback(() => {
        setIsEditing(true);
    }, []);

    const handleSettingsClick = useCallback(() => {
        setIsSettingsOpen(true);
    }, []);

    // Show loading while waiting for user data
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <Loader />
            </div>
        );
    }

    // Show error state if user is logged out or data failed to load
    if ((!userInfo && !updatedUserInfo) || !user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md mx-auto">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 mb-2">
                        {(!userInfo && !updatedUserInfo) ? 'Please login to view profile' : 'Unable to load profile'}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 mb-4">
                        {(!userInfo && !updatedUserInfo) ? 'You need to be logged in to access this page' : 'Please try refreshing the page'}
                    </p>
                    <button
                        onClick={() => (!userInfo && !updatedUserInfo) ? window.location.href = '/login' : window.location.reload()}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
                    >
                        {(!userInfo && !updatedUserInfo) ? 'Go to Login' : 'Refresh Page'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8 lg:py-10 xl:px-10 xl:py-12">
                {/* Container */}
                <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-7 lg:space-y-8 xl:space-y-10">

                    {/* Profile Header */}
                    <div className="w-full">
                        <ProfileHeader
                            user={user}
                            onEditClick={handleEditClick}
                            onSettingsClick={handleSettingsClick}
                        />
                    </div>

                    {/* Stats Grid */}
                    <div className="w-full">
                        <StatsGrid />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-10">

                        <div className="xl:col-span-2 space-y-4 sm:space-y-6 md:space-y-7 lg:space-y-8">

                            {/* Recent Activity Card */}
                            <div className="w-full">
                                <RecentActivity
                                    user={user}
                                    recentDonations={recentDonations}
                                    recentClaims={recentNgoDonations}
                                />
                            </div>

                            {/* Achievements Section */}
                            <div className="w-full">
                                <AchievementsSection achievements={achievements} />
                            </div>
                        </div>

                        <div className="xl:col-span-1 space-y-4 sm:space-y-6 md:space-y-7 lg:space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-6">

                                {/* Contact Information */}
                                <div className="w-full">
                                    <ContactInfo user={user} />
                                </div>

                                {/* Quick Actions */}
                                <div className="w-full">
                                    <QuickActions user={user} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feedback Section  */}
                    <div className="w-full">
                        <ShowFeedbackAndHeader feedbacksReceived={feedbacksReceived} />
                    </div>
                </div>
            </div>

            {/* Update Profile Modal  */}
            <EditModal
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                user={user}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSave={handleSave}
            />

            {/* Update Password Modal  */}
            <SettingsModal
                isOpen={isSettingsOpen}
                setIsOpen={setIsSettingsOpen}
                onPasswordUpdate={handlePasswordUpdate}
            />
        </div>
    );
}