import { useEffect, useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Phone,
  Package,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClaimedDonations } from '../redux/slices/ngoSlice';
import Loader from '../components/Loader';
import SchedulePickupHeader from '../components/schedulePickups/SchedulePickupHeader';
import SchedulePickupFilterBar from '../components/schedulePickups/SchedulePickupFilterBar';
import SchedulePickupStatsGrid from '../components/schedulePickups/SchedulePickupStatsGrid';

// Pickup Action Buttons Component 
const PickupActions = ({ pickup }) => {
  const handleGetDirections = () => {
    const address = pickup?.donorId?.address || pickup?.address;
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
  };

  const handleCallDonor = () => {
    const contact = pickup?.donorId?.phone || pickup?.contact;
    if (contact) {
      window.open(`tel:${contact}`, '_self');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col justify-center gap-2 sm:gap-3 lg:gap-3 w-full lg:w-48 xl:w-52">
      <button
        onClick={handleGetDirections}
        className="flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 
                 px-3 py-2 sm:px-4 sm:py-2.5 lg:px-4 lg:py-3 rounded-lg lg:rounded-xl 
                 hover:bg-blue-50 transition-all duration-200 font-medium text-sm lg:text-base
                 active:scale-95"
      >
        <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Get Directions</span>
        <span className="sm:hidden">Directions</span>
      </button>

      <button
        onClick={handleCallDonor}
        className="flex items-center justify-center gap-2 border-2 border-green-600 text-green-600 
                 px-3 py-2 sm:px-4 sm:py-2.5 lg:px-4 lg:py-3 rounded-lg lg:rounded-xl 
                 hover:bg-green-50 transition-all duration-200 font-medium text-sm lg:text-base
                 active:scale-95"
      >
        <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Call Donor</span>
        <span className="sm:hidden">Call</span>
      </button>
    </div>
  );
};

// Pickup Card Component
const PickupCard = ({ pickup }) => {
  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Helper function to format time
  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Extract data with safe fallbacks
  const donorName = pickup?.donorId?.name || pickup?.donor || 'Unknown Donor';
  const foodType = pickup?.foodType || pickup?.food || 'Food Items';
  const quantity = pickup?.quantity || 'N/A';
  const address = pickup?.donorId?.address || pickup?.address || 'Address not available';
  const contact = pickup?.donorId?.phone || pickup?.contact || 'N/A';
  const claimedDate = pickup?.claimedAt || pickup?.date;
  const scheduledTime = pickup?.scheduledTime || formatTime(claimedDate);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-xl rounded-xl lg:rounded-2xl 
                  p-4 sm:p-5 lg:p-6 shadow-lg border border-blue-100/50 
                  hover:shadow-xl hover:scale-[1.01] transition-all duration-300">

      {/* Mobile Layout */}
      <div className="block lg:hidden space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{donorName}</h3>
            <p className="text-sm sm:text-base text-blue-700 font-semibold truncate">{foodType}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Package className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">{quantity}</span>
          </div>
        </div>

        {/* Time & Date */}
        <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
          <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span className="text-sm text-gray-700 font-medium">
            {formatDate(claimedDate)} at {scheduledTime}
          </span>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700 font-medium line-clamp-2">{address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <span className="text-sm text-gray-700 font-medium">{contact}</span>
          </div>
        </div>

        {/* Notes */}
        {pickup?.notes && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-200">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-green-700">Notes: </span>
              {pickup.notes}
            </p>
          </div>
        )}

        {/* Action Buttons - Mobile */}
        <PickupActions pickup={pickup} />
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden lg:flex gap-6">
        {/* Main Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl xl:text-2xl font-bold text-gray-800">{donorName}</h3>
              <p className="text-base xl:text-lg text-blue-700 font-semibold">{foodType}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4 bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <span className="text-sm text-gray-700 font-medium">{quantity}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-sm text-gray-700 font-medium">
                {formatDate(claimedDate)} at {scheduledTime}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-2 bg-green-50 p-2 rounded-lg">
              <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="font-medium">{address}</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 p-2 rounded-lg">
              <Phone className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span className="font-medium"><strong>Contact:</strong> {contact}</span>
            </div>
            {pickup?.notes && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-200">
                <p className="font-medium">
                  <strong className="text-green-700">Notes:</strong> {pickup.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - Desktop */}
        <PickupActions pickup={pickup} />
      </div>
    </div>
  );
};

// Empty State Component - Responsive
const EmptyState = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl rounded-xl lg:rounded-2xl 
                  p-8 sm:p-10 lg:p-12 shadow-lg border border-gray-200 text-center">
      <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No pickups found</h3>
      <p className="text-sm sm:text-base text-gray-500">Try adjusting your filters or search terms</p>
    </div>
  );
};

// Pickup List Component
const PickupList = ({ pickups }) => {
  if (pickups.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {pickups.map((pickup) => (
        <PickupCard
          key={pickup._id || pickup.id || `pickup-${Math.random()}`}
          pickup={pickup}
        />
      ))}
    </div>
  );
};

// Main Component
export default function ScheduledPickups() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const { claimedDonations, loading } = useSelector((state) => state.ngo);

  useEffect(() => {
    dispatch(fetchClaimedDonations());
  }, [dispatch]);

  // Helper function to map filter values to actual status values
  const getActualStatus = (filterValue) => {
    switch (filterValue) {
      case 'in-progress':
        return 'claimed';
      case 'completed':
        return 'picked-up';
      case 'cancelled':
        return 'cancelled';
      default:
        return filterValue;
    }
  };

  const filteredPickups = (claimedDonations || []).filter((pickup) => {
    if (!pickup) return false;

    const donorName = pickup?.donorId?.name || pickup?.donor || '';
    const foodType = pickup?.foodType || pickup?.food || '';
    const status = pickup?.status || 'pending';

    const actualFilterStatus = getActualStatus(filter);
    const matchesFilter = filter === 'all' || status === actualFilterStatus;
    const matchesSearch = searchTerm === '' ||
      donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      foodType.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 
                  p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header Component */}
        <SchedulePickupHeader />

        {/* Stats Grid Component */}
        <SchedulePickupStatsGrid pickups={claimedDonations} />

        {/* Filter Bar Component */}
        <SchedulePickupFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
        />

        {/* Pickup List Components */}
        <PickupList pickups={filteredPickups} />
      </div>
    </div>
  );
}