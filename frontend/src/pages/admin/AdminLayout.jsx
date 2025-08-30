import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Heart, 
  Package, 
  MessageSquare, 
  Settings, 
  LogOut,
  User,
  Building,
  Menu,
  X
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { clearError, logoutUser } from '../../redux/slices/authSlice';
import { clearAnalytics } from '../../redux/slices/adminAnalyticsSlice';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, token } = useSelector((state) => state.auth);
  
  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsMobileSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Enhanced logout handler with proper cleanup
  const handleLogout = async () => {
    try {
      // 1. Clear analytics data first to prevent any pending API calls
      dispatch(clearAnalytics());
      
      // 2. Clear any auth errors
      dispatch(clearError());
      
      // 3. Dispatch logout action
      dispatch(logoutUser());
      
      // 4. Clear localStorage manually (backup)
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      
      // 5. Navigate to login page
      navigate('/login', { replace: true });
      
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigation even if there's an error
      navigate('/login', { replace: true });
    }
  };

  // Security check - redirect if not admin
  useEffect(() => {
    if (userInfo && userInfo.role !== 'admin') {
      navigate('/', { replace: true });
    }
  }, [userInfo, navigate]);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Users', icon: Users, path: '/all-users' },
    { name: 'NGOs', icon: Building, path: '/all-ngos' },
    { name: 'Donations', icon: Package, path: '/all-donations' },
    { name: 'Messages', icon: MessageSquare, path: '/support-center' },
    { name: 'Profile', icon: User, path: '/admin/profile' },
    { name: 'Settings', icon: Settings, path: '/settings' }
  ];

  const SidebarContent = ({ isMobile = false }) => (
    <>
      {/* Logo Section */}
      <div className="flex items-center justify-between p-6 border-b border-teal-500">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold">FoodShare</h1>
            <p className="text-xs text-teal-200">Admin Panel</p>
          </div>
        </div>
        {isMobile && (
          <button
            onClick={closeMobileSidebar}
            className="p-2 text-white hover:bg-teal-700 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Welcome Section */}
      <div className="px-6 py-4 border-b border-teal-500">
        <p className="text-sm text-teal-200">Welcome back,</p>
        <p className="font-semibold">{userInfo?.name || 'Admin'}!</p>
        <p className="text-xs text-teal-300">Member since Aug 2025</p>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-4 flex-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={isMobile ? closeMobileSidebar : undefined}
              className={`flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-white text-teal-800 shadow-md'
                  : 'text-teal-100 hover:bg-teal-700 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 text-teal-100 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </>
  );

  // Don't render if user is not authenticated or not admin
  if (!userInfo || !token || userInfo.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-white/50 bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Desktop Sidebar - Always visible on desktop */}
      <div className="hidden lg:flex lg:w-64 xl:w-72 bg-gradient-to-b from-teal-600 to-teal-800 text-white shadow-lg fixed left-0 top-0 h-full z-50">
        <div className="flex flex-col w-full">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar - Full sidebar like desktop */}
      <div className={`lg:hidden fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-teal-600 to-teal-800 text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <SidebarContent isMobile={true} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 xl:ml-72">
        {/* Top Header */}
        <div className="bg-white shadow-sm border-b px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileSidebar}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div>
                <h2 className="text-lg sm:text-xl xl:text-2xl font-bold text-gray-900 truncate">
                  {sidebarItems.find(item => item.path === location.pathname)?.name || 'Admin Panel'}
                </h2>
              </div>
            </div>
            
            {/* User Info - Responsive */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 truncate max-w-24 lg:max-w-32">
                    {userInfo?.name || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{userInfo?.role || 'admin'}</p>
                </div>
                <div className="bg-yellow-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                  <span className="text-xs font-semibold text-yellow-800">⭐ 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 sm:p-6 max-w-full ">
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;