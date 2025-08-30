import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, Clock, MapPin, Users, Package, Truck, CheckCircle, AlertCircle, Eye, Search, Heart, Star, ChefHat, XCircle, Hourglass, AlarmClockOff, CalendarX, TimerOff } from 'lucide-react';
import { getDonationHistory, getDonationHistoryByStatus } from '../redux/slices/userSlice';
import Loader from '../components/Loader';
import ViewDetailsModel from '../components/myDonation/ViewDetailsModel';
import DonationsList from '../components/myDonation/DonationsList';
import StatsCards from '../components/myDonation/StatsCards';
import FilterSection from '../components/myDonation/FilterSection';
import ImpactSummary from '../components/myDonation/ImpactSummary';

const MyDonationsPage = () => {
  const dispatch = useDispatch();
  const { donationHistory = [], filteredDonationHistory = [], loading, error } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.auth);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const role = userInfo.role;

  // Load donation history on component mount
  useEffect(() => {
    dispatch(getDonationHistory(role));
  }, [dispatch, role]);

  // Handle filter change
  useEffect(() => {
    if (filterStatus === 'all') {
      dispatch(getDonationHistory(role));
    } else {
      dispatch(getDonationHistoryByStatus(filterStatus));
    }
  }, [filterStatus, dispatch, role]);

  // Get donations data based on filter
  const donations = filterStatus === 'all' ? donationHistory : filteredDonationHistory;

  const getStatusConfig = (status) => {
    const configs = {
      available: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Waiting for NGO' },
      claimed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, label: 'Claimed by NGO' },
      'picked-up': { color: 'bg-purple-100 text-purple-800', icon: Truck, label: 'Pickup Confirmed' },
      cancelled: { color: 'bg-green-100 text-green-800', icon: Heart, label: 'Cancelled' },
      expired: { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Expired' }
    };
    return configs[status] || configs.pending;
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.foodType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.foodName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const stats = {
    total: donationHistory.length,
    delivered: donationHistory.filter(d => d.status === 'picked-up').length,
    pending: donationHistory.filter(d => d.status === 'claimed').length,
    cancelled: donationHistory.filter(d => d.status === 'cancelled').length,
    totalPeopleFed: donationHistory.reduce((acc, d) => acc + (d.servings || 0), 0)
  };

  // Loading state
  if (loading && donations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Loader />
        </div>
      </div>
    );
  }

  // Error state
  if (error && donations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4 text-sm sm:text-base">Failed to load donations</p>
          <button
            onClick={() => dispatch(getDonationHistory())}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 sm:px-6 rounded-full hover:from-green-600 
            hover:to-blue-600 transition-all duration-300 text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 xl:px-8">
      {/* Detail Modal */}
      <ViewDetailsModel 
        selectedDonation={selectedDonation} 
        setSelectedDonation={setSelectedDonation} 
        getStatusConfig={getStatusConfig}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 shadow-lg">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 px-4">My Donations</h1>
          <p className="text-base sm:text-lg text-gray-600 px-4">Track your food donation history and impact</p>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Filters and Search */}
        <FilterSection 
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          loading={loading}
        />

        {/* Loading indicator for filter changes */}
        {loading && (
          <div className="text-center py-4">
            <div className="inline-flex items-center">
              <Loader />
            </div>
          </div>
        )}

        {/* Donations List */}
        <DonationsList 
          filteredDonations={filteredDonations} 
          setSelectedDonation={setSelectedDonation} 
          getStatusConfig={getStatusConfig}
        />

        {/* Impact Summary */}
        <ImpactSummary stats={stats} />
      </div>
    </div>
  );
};

export default MyDonationsPage;