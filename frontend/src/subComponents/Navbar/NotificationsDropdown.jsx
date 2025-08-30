
import { Bell } from 'lucide-react';
import { toast } from 'react-toastify';
import NotificationItem from './NotificationItem';

export default function NotificationsDropdown({
  userInfo,
  notifications,
  loading,
  error,
  isNotificationOpen,
  setIsNotificationOpen,
  setIsProfileOpen,
  setIsMenuOpen,
  handleNotificationClick,
  handleAccept,
  handleReject,
  dispatch,
  fetchNotifications,
  markNotificationRead
}) {
  if (!userInfo) return null;

  const handleClearAll = async () => {
    try {
      const clearPromises = notifications.map(n =>
        dispatch(markNotificationRead(n._id)).unwrap()
      );
      await Promise.all(clearPromises);
      dispatch(fetchNotifications());
      toast.success('All notifications cleared');
    } catch (error) {
      console.error('Error clearing notifications:', error);
      toast.error('Failed to clear some notifications');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsNotificationOpen(!isNotificationOpen);
          setIsProfileOpen(false);
          setIsMenuOpen(false);
        }}
        className="p-2 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-200 relative"
      >
        <Bell className="w-5 h-5" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {isNotificationOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-red-500 hover:text-red-600"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="max-h-64 overflow-y-auto">
            {loading ? (
              <div className="px-4 py-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto"></div>
                <p className="text-sm text-gray-500 mt-2">Loading notifications...</p>
              </div>
            ) : error ? (
              <div className="px-4 py-4 text-center">
                <p className="text-sm text-red-500">Error loading notifications</p>
                <button
                  onClick={() => dispatch(fetchNotifications())}
                  className="text-xs text-green-600 hover:text-green-700 mt-1"
                >
                  Retry
                </button>
              </div>
            ) : notifications.length === 0 ? (
              <p className="text-sm text-gray-500 px-4 py-4 text-center">
                No notifications yet.
              </p>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                  onNotificationClick={handleNotificationClick}
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}