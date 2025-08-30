import React, { useState, useEffect } from 'react';
import { Heart, Building, AlertCircle } from 'lucide-react';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearAdminState, fetchAllDonations, deleteDonationById, updateDonationStatus } from '../../redux/slices/adminSlice';
import DonationStatsCards from '../../components/admin/allDonation/DonationStatsCard';
import DonationSearchAndFilters from '../../components/admin/allDonation/DonationSearchAndFilter';
import DonationTableRow from '../../components/admin/allDonation/DonationTableRow';
import DonationCards from '../../components/admin/allDonation/DonationCards';
import DonationDetailsModal from '../../components/admin/allDonation/DonationDetailsModel';
import DonationStatusModal from '../../components/admin/allDonation/DonationEditModel';
import DonationDeleteConfirmationModal from '../../components/admin/allDonation/DonationDeleteConfirmationModel';

const AllDonations = () => {
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [preferenceFilter, setPreferenceFilter] = useState('all');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const dispatch = useDispatch();
  const { donations, loading, error } = useSelector((state) => state.admin);

  // Fetch donations on component mount
  useEffect(() => {
    dispatch(fetchAllDonations());
    return () => {
      dispatch(clearAdminState());
    };
  }, [dispatch]);

  // Filter and search logic
  useEffect(() => {
    let filtered = donations || [];

    if (searchTerm) {
      filtered = filtered.filter(donation =>
        donation.foodType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.pickupAddress?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(donation => donation.status === statusFilter);
    }

    if (preferenceFilter !== 'all') {
      filtered = filtered.filter(donation => donation.foodPreference === preferenceFilter);
    }

    setFilteredDonations(filtered);
  }, [donations, searchTerm, statusFilter, preferenceFilter]);

  // Calculate stats with safe fallbacks
  const statsData = React.useMemo(() => {
    const donationsArray = donations || [];
    return {
      available: donationsArray.filter(d => d.status === 'available').length,
      claimed: donationsArray.filter(d => d.status === 'claimed').length,
      pickedUp: donationsArray.filter(d => d.status === 'picked-up').length,
      expired: donationsArray.filter(d => d.status === 'expired').length,
      cancelled: donationsArray.filter(d => d.status === 'cancelled').length,
      total: donationsArray.length
    };
  }, [donations]);

  // Handle view donation
  const handleViewDonation = (donation) => {
    setSelectedDonation(donation);
    setShowModal(true);
  };

  // Handle edit donation
  const handleEditDonation = (donation) => {
    setSelectedDonation(donation);
    setShowEditModal(true);
  };

  // Handle delete donation
  const handleDeleteDonation = (donation) => {
    setDonationToDelete(donation);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (donationToDelete) {
      try {
        await dispatch(deleteDonationById(donationToDelete._id)).unwrap();
        dispatch(fetchAllDonations());
        setShowDeleteModal(false);
        setDonationToDelete(null);
      } catch (error) {
        console.error('Failed to delete donation:', error);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDonationToDelete(null);
  };

  // Handle status update
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await dispatch(updateDonationStatus({ id, status: newStatus })).unwrap();
      dispatch(fetchAllDonations());
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // Handle donation update from status modal
  const handleUpdateDonation = async (updatedData) => {
    try {
      // Only update the status
      await dispatch(updateDonationStatus({ 
        id: selectedDonation._id, 
        status: updatedData.status 
      })).unwrap();
      dispatch(fetchAllDonations());
      setShowEditModal(false);
      setSelectedDonation(null);
    } catch (error) {
      console.error('Failed to update donation status:', error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="text-center p-4 sm:p-8 max-w-md w-full">
          <AlertCircle className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-red-400 mb-4" />
          <h2 className="text-lg sm:text-2xl font-bold text-red-600 mb-2">Error Loading Donations</h2>
          <p className="text-sm sm:text-base text-red-500 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchAllDonations())}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Main Container - Responsive padding and spacing */}
      <div className="px-2 py-2 sm:px-4 sm:py-4 md:px-6 md:py-6 lg:px-1 lg:py-4 max-w-7xl mx-auto">

        {/* Header Section - Responsive background and padding */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl mb-3 sm:mb-4 md:mb-6">
          <div className="px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">

            {/* Stats Cards - Will be responsive in the component */}
            <DonationStatsCards stats={statsData} />

            {/* Search and Filters - Will be responsive in the component */}
            <DonationSearchAndFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              preferenceFilter={preferenceFilter}
              setPreferenceFilter={setPreferenceFilter}
              showMobileFilters={showMobileFilters}
              setShowMobileFilters={setShowMobileFilters}
            />
          </div>
        </div>

        {/* Error Message - Responsive margins and padding */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl mb-3 sm:mb-4 mx-2 sm:mx-0 text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Donations Table - Hidden on mobile and tablet, visible on desktop */}
        <div className="hidden xl:block bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                <tr>
                  <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Food Item</th>
                  <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Quantity</th>
                  <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Status</th>
                  <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Created</th>
                  <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Expires</th>
                  <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donation, index) => (
                  <DonationTableRow
                    key={donation._id}
                    donation={donation}
                    index={index}
                    onView={handleViewDonation}
                    onEdit={handleEditDonation}
                    onDelete={handleDeleteDonation}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile and Tablet Cards View */}
        <div className="xl:hidden">
          {/* Grid layout for tablets, single column for mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0">
            {filteredDonations.map((donation) => (
              <DonationCards
                key={donation._id}
                donation={donation}
                onView={handleViewDonation}
                onEdit={handleEditDonation}
                onDelete={handleDeleteDonation}
              />
            ))}
          </div>
        </div>

        {/* No Results - Responsive padding and sizing */}
        {filteredDonations.length === 0 && !loading && (
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 text-center mx-2 sm:mx-0">
            <Building className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No Donations Found</h3>
            <p className="text-sm sm:text-base text-gray-500">
              Try adjusting your search criteria or check back later.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setPreferenceFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Results Count - Mobile friendly */}
        {filteredDonations.length > 0 && (
          <div className="mt-4 px-2 sm:px-0">
            <div className="bg-gray-100 rounded-lg px-3 py-2 text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Showing <span className="font-semibold text-blue-600">{filteredDonations.length}</span> of{' '}
                <span className="font-semibold text-green-600">{donations?.length || 0}</span> donations
              </p>
            </div>
          </div>
        )}

        {/* Donation Details Modal */}
        <DonationDetailsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          donation={selectedDonation}
          onStatusUpdate={handleStatusUpdate}
        />

        {/* Donation Status Update Modal */}
        <DonationStatusModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          donation={selectedDonation}
          onUpdate={handleUpdateDonation}
        />

        {/* Custom Delete Confirmation Modal */}
        <DonationDeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          donation={donationToDelete}
        />

        {/* Loading State for Actions */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 sm:p-6 mx-4 max-w-sm w-full">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-sm sm:text-base text-gray-700">Processing...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile - Quick Add */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AllDonations;