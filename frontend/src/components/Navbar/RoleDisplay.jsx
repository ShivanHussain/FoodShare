// components/Navbar/RoleDisplay.jsx
import { Utensils, Users ,User} from 'lucide-react';

const RoleDisplay = ({ userInfo, userRole, className = "", showOnMobile = false }) => (
  userInfo && (
    <div
      className={`flex items-center px-2 py-1 rounded-lg text-xs font-medium ${userRole === 'donor'
        ? 'bg-green-100 text-green-700 border border-green-200'
        : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
        } ${showOnMobile ? 'block' : 'hidden sm:block'} ${className}`}
    >
      {userRole === 'donor' ? (
        <>
          <Utensils className="w-3 h-3 mr-1" />
          Donor
        </>
      ) : userRole === 'ngo' ? (
        <>
          <Users className="w-3 h-3 mr-1" />
          NGO
        </>

      ) : (
        <>
          <User className="w-3 h-3 mr-1" />
          Admin
        </>

      )}
    </div>
  )
);

export default RoleDisplay;