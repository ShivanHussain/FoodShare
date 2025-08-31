import React, { useEffect } from 'react';
import { Heart, Users, MapPin, Star, Calendar, Package, MessageCircle, Award, User, Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByIdWithDetails } from '../../redux/slices/adminSlice';
import SelectedUserLeftSection from '../../components/admin/selectedUser/SelectedUserLeftSection';
import Loader from '../../components/Loader';
import SelectedUserRightSection from '../../components/admin/selectedUser/SelectedUserRightSection';
import SelectedUserheader from '../../components/admin/SelectedUser/SelectedUserheader.jsx';

const UserProfilePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedUser, loading, error } = useSelector((state) => state.admin);

    console.log("Selected User ID from URL:", id);
    console.log("All Users from Redux:", selectedUser);

    useEffect(() => {
        if (id) {
            dispatch(fetchUserByIdWithDetails(id));
        }
    }, [id, dispatch]);

    // Default user info - will be overridden by selectedUser data when available
    const defaultUserInfo = {
        userId: "USR001",
        name: "Loading...",
        email: "loading@example.com",
        totalGiveDonation: 0,
        totalReceiveFeedback: 0,
        rating: 0,
        role: 'user'
    };

    // Merge selectedUser with defaultUserInfo
    const userInfo = selectedUser ? { ...defaultUserInfo, ...selectedUser } : defaultUserInfo;

    // Loading state
    if (loading) {
        return <Loader />;
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
                    <div className="text-red-500 mb-4">
                        <User className="w-16 h-16 mx-auto" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h2>
                    <p className="text-gray-600 mb-4">
                        {error || "The user you're looking for doesn't exist or there was an error loading their profile."}
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
            {/* Header Section */}
            <SelectedUserheader userInfo={selectedUser || userInfo} />

            {/* Main Content */}
            <section className="py-12 px-2 sm:px-2 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Left Side - Donations */}
                        <SelectedUserLeftSection
                            donations={[]}
                            userInfo={userInfo}
                            claimedDonations={selectedUser?.claimedDonations}
                            donationHistory={selectedUser?.donationHistory}
                        />

                        {/* Right Side - Feedback */}
                        <SelectedUserRightSection feedbacks={selectedUser?.feedbackReceived} />
                    </div>
                </div>
            </section>

            {/* Achievement Section */}
            <section className="py-8 bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/20 p-4 rounded-full">
                            <Award className="w-12 h-12 text-yellow-300" />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Thank You for Making a Difference!
                    </h2>
                </div>
            </section>
        </div>
    );
};

export default UserProfilePage;
