// components/Navbar/DesktopNavigation.jsx
const DesktopNavigation = ({ userInfo, menuItems }) => (
  userInfo && (
    <div className="hidden lg:flex items-center space-x-1">
      {menuItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="flex items-center px-4 py-2 rounded-xl text-sm font-medium text-gray-600 
          hover:text-green-600 hover:bg-green-50"
        >
          <item.icon className="w-4 h-4 mr-2" />
          {item.label}
        </a>
      ))}
    </div>
  )
);

export default DesktopNavigation;