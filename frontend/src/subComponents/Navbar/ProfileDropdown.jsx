
import { User, ChevronDown, LogOut } from 'lucide-react';

export default function ProfileDropdown({
  userInfo,
  isProfileOpen,
  setIsProfileOpen,
  setIsNotificationOpen,
  setIsMenuOpen,
  handleLogout
}) {
  if (!userInfo) return null;

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsProfileOpen(!isProfileOpen);
          setIsNotificationOpen(false);
          setIsMenuOpen(false);
        }}
        className="flex items-center space-x-2 p-2 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <ChevronDown className="w-4 h-4 hidden sm:block" />
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">{userInfo?.name || "Guest"}</p>
            <p className="text-xs text-gray-500">{userInfo?.email || "john@example.com"}</p>
          </div>
          <div className="py-1">
            <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <User className="w-4 h-4 mr-3" />
              Profile
            </a>
          </div>
          <div className="border-t border-gray-100 py-1">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}