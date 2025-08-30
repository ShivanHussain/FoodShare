/* eslint-disable no-unused-vars */
// components/Navbar/MobileMenu.jsx
import { useNavigate } from 'react-router-dom';

const MobileMenu = ({ userInfo, menuItems, isMenuOpen, setIsMenuOpen, closeAllDropdowns }) => {
  const navigate = useNavigate();

  // Don't render if user is not logged in
  if (!userInfo) return null;

  const handleMenuItemClick = (href, event) => {
    event.preventDefault();
    closeAllDropdowns(); // Close the menu
    navigate(href); // Navigate to the route
  };

  return (
    <>
      {/* Mobile Menu Container */}
      <div 
        className={`lg:hidden fixed top-16 left-0 right-0 z-50 bg-gray-100 border-b border-gray-200 shadow-lg transform 
          transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'translate-y-0 opacity-100 visible' 
            : '-translate-y-full opacity-0 invisible'
        }`}
      >
        <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Menu Items */}
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={(e) => handleMenuItemClick(item.href, e)}
              className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:text-green-600 
              hover:bg-green-50 transition-all duration-200 border border-gray-100 hover:border-green-200 focus:outline-none 
              focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
            >
              <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="text-left">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

    </>
  );
};

export default MobileMenu;