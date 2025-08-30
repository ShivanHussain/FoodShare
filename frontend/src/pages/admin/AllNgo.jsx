import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Building } from 'lucide-react';
import {
  fetchAllNgos,
  fetchUserById,
  deleteUserById,
  clearAdminState,
  updateVerifiedStatus
} from '../../redux/slices/adminSlice';
import NGOSearchAndFilters from '../../components/admin/allNgo/NgoSearchAndFilter';
import NGOStatsCards from '../../components/admin/allNgo/NgoStatsCard';
import NGOTableRow from '../../components/admin/allNgo/NgoTableRow';
import NGOCards from '../../components/admin/allNgo/NgoCards';
import NGODetailsModal from '../../components/admin/allNgo/NgoDetailsModel';
import NGODeleteConfirmationModal from '../../components/admin/allNgo/NgoDeleteAndConfirmationModel';
import Loader from '../../components/Loader'

const AdminNGOPage = () => {
  const dispatch = useDispatch();

  const { ngos, loading, error } = useSelector((state) => state.admin);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Delete confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ngoToDelete, setNgoToDelete] = useState(null);

  console.log('NGOs:', ngos);

  useEffect(() => {
    dispatch(fetchAllNgos());

    return () => {
      dispatch(clearAdminState());
    };
  }, [dispatch]);

  const filteredNGOs = ngos.filter(ngo => {
    const matchesSearch = ngo.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.address?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleViewNGO = async (ngo) => {
    setSelectedNGO(ngo);
    setShowModal(true);
    if (ngo._id) {
      dispatch(fetchUserById(ngo._id));
    }
  };

  const handleEditNGO = (ngo) => {
    // TODO: Implement edit functionality
    console.log('Edit NGO:', ngo);
  };

  const handleDeleteNGO = (ngo) => {
    setNgoToDelete(ngo);
    setShowDeleteModal(true);
  };

  // New function to handle NGO verification toggle
  const handleNgoVerifyToggle = (ngoId, newVerificationStatus) => {
    console.log("Toggling NGO verification for:", ngoId, "to:", newVerificationStatus);
    dispatch(updateVerifiedStatus({ id: ngoId, isVerified: newVerificationStatus }))
      .then(() => {
        // Refresh the NGOs list
        dispatch(fetchAllNgos());
      })
      .catch((error) => {
        console.error("Failed to update NGO verification status:", error);
      });
  };

  const confirmDelete = async () => {
    if (ngoToDelete) {
      try {
        await dispatch(deleteUserById(ngoToDelete._id || ngoToDelete.id));
        setShowDeleteModal(false);
        setNgoToDelete(null);
      } catch (error) {
        console.error('Error deleting NGO:', error);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setNgoToDelete(null);
  };

  const statsData = {
    total: ngos.length,
    verified: ngos.filter(ngo => 
      ngo.verified === true || 
      ngo.verified === 'true' || 
      ngo.status === 'verified'
    ).length,
    pending: ngos.filter(ngo => 
      ngo.verified === false || 
      ngo.verified === 'false' || 
      ngo.status === 'pending' ||
      !ngo.verified
    ).length,
    totalPickups: ngos.reduce((sum, ngo) => sum + (ngo.totalPickups || 0), 0)
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="py-2  sm:py-3  lg:py-4">

        {/* Header Section - Reduced shadow and margin */}
        <div className="bg-white rounded-lg shadow-sm mb-2 sm:mb-3">
          <div className="px-2 py-2 sm:px-3 sm:py-3 lg:px-4 lg:py-4">

            {/* Stats Cards */}
            <NGOStatsCards stats={statsData} />

            <NGOSearchAndFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              showMobileFilters={showMobileFilters}
              setShowMobileFilters={setShowMobileFilters}
            />
          </div>
        </div>

        {/* Error Message - Minimal horizontal padding */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-2 py-2 rounded-lg mb-2 mx-1 sm:mx-0">
            {error}
          </div>
        )}

        {/* NGOs Table - Desktop View - Reduced shadow and width constraints */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden max-w-full">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                <tr>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">NGO</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Verified</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Address</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Pickups</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Rating</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNGOs.map((ngo, index) => (
                  <NGOTableRow
                    key={ngo._id}
                    ngo={ngo}
                    index={index}
                    onView={handleViewNGO}
                    onEdit={handleEditNGO}
                    onDelete={handleDeleteNGO}
                    onVerifyToggle={handleNgoVerifyToggle}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards View - Minimal horizontal spacing */}
        <div className="lg:hidden space-y-2 px-1 sm:px-0">
          {filteredNGOs.map((ngo) => (
            <NGOCards
              key={ngo._id}
              ngo={ngo}
              onView={handleViewNGO}
              onEdit={handleEditNGO}
              onDelete={handleDeleteNGO}
              onVerifyToggle={handleNgoVerifyToggle}
            />
          ))}
        </div>

        {/* No Results - Minimal horizontal padding */}
        {filteredNGOs.length === 0 && !loading && (
          <div className="bg-white rounded-lg shadow-sm p-4 text-center mx-1 sm:mx-0">
            <Building className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No NGOs Found</h3>
            <p className="text-gray-500">Try adjusting your search criteria.</p>
          </div>
        )}

        {/* NGO Details Modal */}
        <NGODetailsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          ngo={selectedNGO}
        />

        {/* Custom Delete Confirmation Modal */}
        <NGODeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          ngo={ngoToDelete}
        />
      </div>
    </div>
  );
};

export default AdminNGOPage;