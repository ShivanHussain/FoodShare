// components/Navbar/NotificationsDropdown.jsx
import { Bell } from 'lucide-react';
import { toast } from 'react-toastify';

const NotificationsDropdown = ({ userInfo,notifications,loading,error,isNotificationOpen,setIsNotificationOpen,setIsProfileOpen,
  setIsMenuOpen, handleNotificationClick, dispatch, fetchNotifications, markNotificationRead }) => (
  userInfo && (
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
        {userInfo?.role === 'ngo' && (
          <Bell className="w-5 h-5" />
        )}
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {isNotificationOpen && (
        <div className="absolute -right-18 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
            {notifications.length > 0 && (
              <button
                onClick={async () => {
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
                }}
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
              notifications.map((n) => (
                <div key={n._id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full mt-2 mr-3 bg-green-500"></div>
                    <div className="flex-1">
                      <div
                        className="cursor-pointer"
                        onClick={() => handleNotificationClick(n)}
                      >
                        <p className="text-sm text-gray-800 hover:text-green-600">
                          New donation: {n.donation?.foodType || 'Unknown'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                        {/* <p className="text-xs text-blue-600 mt-1">
                          Click to view details
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
);

export default NotificationsDropdown;