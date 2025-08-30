
export default function NotificationItem({ notification, onNotificationClick, onAccept, onReject }) {
  return (
    <div className="px-4 py-3 hover:bg-gray-50 transition-colors">
      <div className="flex items-start">
        <div className="w-2 h-2 rounded-full mt-2 mr-3 bg-green-500"></div>
        <div className="flex-1">
          <div
            className="cursor-pointer"
            onClick={() => onNotificationClick(notification)}
          >
            <p className="text-sm text-gray-800 hover:text-green-600">
              New donation: {notification.donation?.foodType || 'Unknown'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Click to view details
            </p>
          </div>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAccept(notification.donation?._id, notification._id);
              }}
              className="text-xs text-green-600 border border-green-300 px-2 py-1 rounded hover:bg-green-50"
              disabled={!notification.donation?._id}
            >
              Accept
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReject(notification.donation?._id, notification._id);
              }}
              className="text-xs text-red-600 border border-red-300 px-2 py-1 rounded hover:bg-red-50"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}