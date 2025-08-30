export default function MobileMenu({ userInfo, menuItems, isMenuOpen, setIsMenuOpen }) {
  if (!userInfo) return null;
  
  return (
    <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
      isMenuOpen 
        ? 'max-h-screen opacity-100 border-b border-gray-200' 
        : 'max-h-0 opacity-0'
    }`}>
      <div className="bg-white px-4 pt-2 pb-4 space-y-1">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center px-3 py-3 rounded-xl text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors border-b border-gray-100 last:border-b-0"
            onClick={() => setIsMenuOpen(false)}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}