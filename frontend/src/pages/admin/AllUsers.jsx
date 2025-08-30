import React, { useEffect, useState } from 'react';
import {
  Users,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  clearAdminState, 
  deleteUserById, 
  fetchAllUsers, 
  fetchUserById,
  updateUserRole,
  updateVerifiedStatus,
} from '../../redux/slices/adminSlice';
import Loader from '../../components/Loader';
import SearchAndFilters from '../../components/admin/allUser/SearchAndFilters';
import UserStatsCards from '../../components/admin/allUser/UserStatsCards';
import UserTableRow from '../../components/admin/allUser/UserTableRow';
import UserCard from '../../components/admin/allUser/UserCards';
import EditRoleModal from '../../components/admin/allUser/EditRoleModel';
import DeleteConfimationModal from '../../components/admin/allUser/DeleteConfimationModal';
import UserDetailsModal from '../../components/admin/allUser/UserDetailsModel';

const AdminUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [filterRole, setFilterRole] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const dispatch = useDispatch();
  const { users, loading, selectedUser } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
    return () => {
      dispatch(clearAdminState());
    };
  }, [dispatch]);

  // Filter users based on search term and role
  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  }) || [];

  const handleViewUser = (userId) => {
    console.log("Fetching details for user ID:", userId);
    dispatch(fetchUserById(userId)).then(() => setShowModal(true));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setShowEditRoleModal(true);
  };

  const handleDeleteUser = (userId) => {
    const user = users.find(u => u._id === userId);
    console.log("Attempting to delete user ID:", userId);
    
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // New function to handle verification toggle
  const handleVerifyToggle = (userId, newVerificationStatus) => {
    console.log("Toggling verification for user:", userId, "to:", newVerificationStatus);
    dispatch(updateVerifiedStatus({ id: userId, isVerified: newVerificationStatus }))
      .then(() => {
        dispatch(fetchAllUsers());
      })
      .catch((error) => {
        console.error("Failed to update verification status:", error);
      });
  };


  const confirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUserById(userToDelete._id));
    }
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleRoleUpdate = (userId, newRole) => {
    console.log("Updating role for user:", userId, "to:", newRole);
    dispatch(updateUserRole({ id: userId, role: newRole }))
      .then(() => {
        setShowEditRoleModal(false);
        setUserToEdit(null);
        // Optionally refresh the users list
        dispatch(fetchAllUsers());
      });
  };

  const cancelRoleEdit = () => {
    setShowEditRoleModal(false);
    setUserToEdit(null);
  };

  // Calculate stats from Redux users data
  const stats = {
    totalUsers: users?.length || 0,
    verifiedUsers: users?.filter(u => u.verified === 'true' || u.verified === true).length || 0,
    donors: users?.filter(u => u.role === 'donor').length || 0,
    admins: users?.filter(u => u.role === 'admin').length || 0,
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="w-full">
        {/* Header - Full width */}
        <div className="w-full bg-white rounded-xl lg:rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">

          {/* Stats Cards */}
          <UserStatsCards stats={stats} />

          {/* Search and Filters*/}
          <SearchAndFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterRole={filterRole}
            setFilterRole={setFilterRole}
            showMobileFilters={showMobileFilters}
            setShowMobileFilters={setShowMobileFilters}
          />
        </div>

        {/* Users Table - Full width */}
        <div className="hidden lg:block w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead className="bg-gradient-to-r from-green-50 to-blue-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">User</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Role</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Verified</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Address</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Donations</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Rating</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <UserTableRow
                    key={user._id || `user-${index}`}
                    user={user}
                    index={index}
                    onView={handleViewUser}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                    onVerifyToggle={handleVerifyToggle}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Cards - Full width */}
        <div className="lg:hidden w-full space-y-4">
          {filteredUsers.map((user, index) => (
            <UserCard
              key={user._id || `user-card-${index}`}
              user={user}
              index={index}
              onView={handleViewUser}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              onVerifyToggle={handleVerifyToggle}
            />
          ))}
        </div>

        {/* Empty State - Full width */}
        {filteredUsers.length === 0 && (
          <div className="w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* User Details Modal */}
        <UserDetailsModal
          isOpen={showModal}
          onClose={handleCloseModal}
          user={selectedUser}
        />

        {/* Edit Role Modal */}
        <EditRoleModal
          isOpen={showEditRoleModal}
          onClose={cancelRoleEdit}
          onConfirm={handleRoleUpdate}
          user={userToEdit}
          loading={loading}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfimationModal
          isOpen={showDeleteModal}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          user={userToDelete}
        />
      </div>
    </div>
  );
};

export default AdminUsersPage;