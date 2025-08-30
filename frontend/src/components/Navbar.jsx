// components/Navbar/Navbar.jsx
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import socket from '../socket/socket.js';
import { toast } from 'react-toastify';
import { fetchNotifications, markNotificationRead } from '../redux/slices/notificationSlice.js';
import { clearError, logoutUser } from '../redux/slices/authSlice.js';
import { claimDonation } from '../redux/slices/donationSlice.js';
import { sendEmailOtp } from '../redux/slices/pickupOtpSlice.js';
import { ngoMenuItems } from '../constants/Navbar/ngoMenuItems.jsx';
import { donorMenuItems } from '../constants/Navbar/donorMenuItems.jsx';
import { adminMenuItems } from '../constants/Navbar/adminMenuItems.jsx';

// Import all components
import Logo from '../components/Navbar/Logo.jsx';
import RoleDisplay from '../components/Navbar/RoleDisplay';
import DesktopNavigation from '../components/Navbar/DesktopNavigation.jsx';
import MobileMenu from '../components/Navbar/MobileMenu.jsx';
import LoginButton from '../components/Navbar/LoginButton.jsx';
import ProfileDropdown from '../components/Navbar/ProfileDropdown.jsx';
import NotificationsDropdown from '../components/Navbar/NotificationsDropdown.jsx';
import NotificationDetailsModal from '../components/Navbar/NotificationDetailsModal.jsx';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const notificationState = useSelector((state) => state.notifications);
  const { notifications = [], loading = false, error = null } = notificationState || {};

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isNotificationDetailsOpen, setIsNotificationDetailsOpen] = useState(false);

  const userRole = userInfo?.role || 'donor';

  let menuItems;

  if (userRole === "donor") {
    menuItems = donorMenuItems;
  } else if (userRole === "ngo") {
    menuItems = ngoMenuItems;
  } else if (userRole === "admin") {
    menuItems = adminMenuItems;
  } else {
    menuItems = donorMenuItems;
  }


  const closeAllDropdowns = () => {
    setIsProfileOpen(false);
    setIsNotificationOpen(false);
    setIsNotificationDetailsOpen(false);
    setSelectedNotification(null);
    setIsMenuOpen(false);
  };

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
    setIsNotificationOpen(false);
  };

  const handleLogout = () => {
    closeAllDropdowns();
    dispatch(logoutUser());
    dispatch(clearError());
    navigate('/');
  };

  const handleAccept = async (donationId, notificationId) => {
    if (!donationId || !notificationId) {
      toast.error('Invalid donation or notification ID');
      return;
    }

    try {
      await dispatch(claimDonation({ id: donationId, statusValue: 'accepted' })).unwrap();
      await dispatch(markNotificationRead({ notificationId, statusValue: 'accepted' })).unwrap();
      await dispatch(sendEmailOtp({ donationId, notificationId })).unwrap();

      setIsNotificationDetailsOpen(false);
      setSelectedNotification(null);
      dispatch(fetchNotifications());
    } catch (err) {
      const errorMessage = err?.message || "Failed to claim donation";
      toast.error(errorMessage);
    }
  };

  const handleReject = async (donationId, notificationId) => {
    if (!notificationId) {
      toast.error('Missing Notification ID');
      return;
    }

    try {
      await dispatch(claimDonation({ id: donationId, statusValue: 'rejected' })).unwrap();
      await dispatch(markNotificationRead({ notificationId, statusValue: 'rejected' })).unwrap();

      setIsNotificationDetailsOpen(false);
      setSelectedNotification(null);
      dispatch(fetchNotifications());
    } catch (error) {
      const errorMessage = error?.message || 'Failed to update notification';
      toast.error(errorMessage);
    }
  };

  const handleNotificationClick = (notification, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!notification) {
      console.error('No notification data received');
      return;
    }

    setTimeout(() => {
      setSelectedNotification(notification);
      setIsNotificationDetailsOpen(true);
      setIsNotificationOpen(false);
    }, 0);
  };

  // Socket connection and notification effects
  useEffect(() => {
    if (!userInfo?._id) return;

    dispatch(fetchNotifications());

    if (socket.connected) {
      socket.emit('user-online', { userId: userInfo._id, role: userInfo.role });
    } else {
      socket.on('connect', () => {
        socket.emit('user-online', { userId: userInfo._id, role: userInfo.role });
      });
    }

    const handleDonationAlert = (donationData) => {
      if (donationData?.foodType) {
        dispatch(fetchNotifications()).unwrap();
      }
    };

    const handleDonationClaimed = ({ donationId }) => {
      if (donationId) {
        dispatch(fetchNotifications()).unwrap();
      }
    };

    const handleSocketConnect = () => {
      socket.emit('user-online', { userId: userInfo._id, role: userInfo.role });
    };

    const handleSocketDisconnect = () => {
      console.log('Socket disconnected');
    };

    socket.on('donation-alert', handleDonationAlert);
    socket.on('donation-claimed', handleDonationClaimed);
    socket.on('connect', handleSocketConnect);
    socket.on('disconnect', handleSocketDisconnect);

    return () => {
      socket.off('donation-alert', handleDonationAlert);
      socket.off('donation-claimed', handleDonationClaimed);
      socket.off('connect', handleSocketConnect);
      socket.off('disconnect', handleSocketDisconnect);
    };
  }, [userInfo?._id, dispatch, userInfo?.role]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNotificationDetailsOpen) {
        const isInsideModal = event.target.closest('[data-modal="true"]') ||
          event.target.closest('.modal') ||
          event.target.closest('[role="dialog"]');

        if (!isInsideModal) {
          setIsNotificationDetailsOpen(false);
          setSelectedNotification(null);
        }
        return;
      }

      const isInsideDropdown = event.target.closest('[data-dropdown="true"]');

      if (!isInsideDropdown) {
        setIsProfileOpen(false);
        setIsNotificationOpen(false);
        setIsMenuOpen(false);
      }
    };

    if (isProfileOpen || isNotificationOpen || isMenuOpen || isNotificationDetailsOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, true);
      }, 10);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside, true);
      };
    }
  }, [isProfileOpen, isNotificationOpen, isMenuOpen, isNotificationDetailsOpen]);

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <DesktopNavigation userInfo={userInfo} menuItems={menuItems} />

            <div className="flex items-center space-x-3">
              {/* Desktop role display */}
              <div className="hidden md:block">
                <RoleDisplay userInfo={userInfo} userRole={userRole} />
              </div>

              {/* Mobile role display with notifications */}
              <div className="flex items-center space-x-2 md:hidden">
                <RoleDisplay userInfo={userInfo} userRole={userRole} showOnMobile={true} />
                <div data-dropdown="true">
                  <NotificationsDropdown
                    userInfo={userInfo}
                    notifications={notifications}
                    loading={loading}
                    error={error}
                    isNotificationOpen={isNotificationOpen}
                    setIsNotificationOpen={setIsNotificationOpen}
                    setIsProfileOpen={setIsProfileOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    handleNotificationClick={handleNotificationClick}
                    dispatch={dispatch}
                    fetchNotifications={fetchNotifications}
                    markNotificationRead={markNotificationRead}
                  />
                </div>
              </div>

              {/* Desktop notifications */}
              <div className="hidden md:block" data-dropdown="true">
                <NotificationsDropdown
                  userInfo={userInfo}
                  notifications={notifications}
                  loading={loading}
                  error={error}
                  isNotificationOpen={isNotificationOpen}
                  setIsNotificationOpen={setIsNotificationOpen}
                  setIsProfileOpen={setIsProfileOpen}
                  setIsMenuOpen={setIsMenuOpen}
                  handleNotificationClick={handleNotificationClick}
                  dispatch={dispatch}
                  fetchNotifications={fetchNotifications}
                  markNotificationRead={markNotificationRead}
                />
              </div>

              <div data-dropdown="true">
                {/* profile Dropdown conponents */}
                <ProfileDropdown
                  userInfo={userInfo}
                  isProfileOpen={isProfileOpen}
                  setIsProfileOpen={setIsProfileOpen}
                  setIsNotificationOpen={setIsNotificationOpen}
                  setIsMenuOpen={setIsMenuOpen}
                  handleLogout={handleLogout}
                />
              </div>
              {/* login Button Components */}
              <LoginButton userInfo={userInfo} />

              {/* Mobile menu button */}
              {userInfo && (
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                  data-dropdown="true"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuItems={menuItems}
        closeAllDropdowns={closeAllDropdowns}
        userInfo={userInfo}
      />

      {/* Notification Details Modal */}
      {selectedNotification && isNotificationDetailsOpen && (
        <div className="fixed inset-0 z-[60]" data-modal="true">
          <NotificationDetailsModal
            isOpen={isNotificationDetailsOpen}
            onClose={() => {
              setIsNotificationDetailsOpen(false);
              setSelectedNotification(null);
            }}
            notification={selectedNotification}
            onAccept={handleAccept}
            onReject={handleReject}
            userRole={userRole}
          />
        </div>
      )}

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeAllDropdowns}
        />
      )}
    </>
  );
}