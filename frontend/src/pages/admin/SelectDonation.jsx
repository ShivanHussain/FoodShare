import React, { useEffect } from 'react';
import { Heart, Package } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonationById } from '../../redux/slices/adminSlice';
import DonationHeader from '../../components/admin/selectDonation/DonationHeader';
import DonorInfoCard from '../../components/admin/selectDonation/DonorInfoCard';
import ClaimedByCard from '../../components/admin/selectDonation/ClaimedByCard';
import ImpactSection from '../../components/admin/selectDonation/ImpactSection';
import Loader from '../../components/Loader';

// Import components


const DonationDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedDonation, loading, error } = useSelector((state) => state.admin);

    console.log("selectedDonation:", selectedDonation);

    useEffect(() => {
        if (id) {
            dispatch(fetchDonationById(id));
        }
    }, [dispatch, id]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Donation</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!selectedDonation) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                    <div className="text-gray-400 text-6xl mb-4">📦</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Donation Not Found</h2>
                    <p className="text-gray-600">The requested donation could not be found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
            {/* Header Section */}
            <DonationHeader donation={selectedDonation} />

            {/* Main Content */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Side - Donor Details */}
                        <DonorInfoCard donor={selectedDonation.donorId} />

                        {/* Right Side - Claimed Details */}
                        <ClaimedByCard
                            claimedBy={selectedDonation.claimedBy}
                            donation={selectedDonation}
                        />
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <ImpactSection claimedDetails={selectedDonation} />
        </div>
    );
};

export default DonationDetailsPage;