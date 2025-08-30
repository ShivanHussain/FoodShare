/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import {
  Bell,
  Search,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNgoNotificationsWithDetails } from '../redux/slices/notificationSlice';
import { toast } from 'react-toastify';
import AlertDonationCard from '../components/donationAlerts/AlertDonationCard';
import DonationStatsCards from '../components/donationAlerts/DonationStatsCards';
import Loader from '../components/Loader'

export default function DonationAlerts() {
  const [alerts, setAlerts] = useState([]);

  const [loadingState, setLoadingState] = useState(false);

  const { notificationsdata, loading } = useSelector((state) => state.notifications);
  const [stats, setStats] = useState({
    newAlerts: 0,
    accepted: 0,
    total: 0,
    rejected: 0
  });

  const [filters, setFilters] = useState({
    status: 'all',
    urgency: '',
    search: ''
  });

  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const fetchDonationAlerts = async (filterParams = {}) => {
    try {
      const result = await dispatch(
        fetchNgoNotificationsWithDetails({
          search: filterParams.search,
          status: filterParams.status,
        })
      ).unwrap();
      
      const formattedAlerts = result.notificationsdata.map((notification) => {
        const donation = notification.donation || {};
        const sender = notification.sender || {};

        return {
          id: notification._id,
          donationId: donation._id,
          donor: sender.name || "Unknown Donor",
          food: donation.foodType || "Unknown Food",
          quantity: `${donation.quantity} ${donation.unit || ''}`,
          location: sender.address || "Unknown Location",
          timePosted: new Date(notification.createdAt).toLocaleString(),
          status: notification.status?.trim() || "pending",
          image: donation.images?.[0] || null,
          contact: sender.phone || "N/A",
          description: donation.description || "No description",
        };
      });

      let filteredAlerts = formattedAlerts;
      if (filterParams.status && filterParams.status !== "all") {
        filteredAlerts = filteredAlerts.filter(
          (alert) => alert.status.toLowerCase() === filterParams.status.toLowerCase()
        );
      }

      if (filterParams.search) {
        const searchTerm = filterParams.search.toLowerCase();
        filteredAlerts = filteredAlerts.filter(
          (alert) =>
            alert.donor.toLowerCase().includes(searchTerm) ||
            alert.food.toLowerCase().includes(searchTerm)
        );
      }

      setAlerts(filteredAlerts);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDonationStats = async () => {
    try {
      const mockStats = {
        newAlerts: alerts.filter(a => a.status === 'pending').length,
        accepted: alerts.filter(a => a.status === 'accepted').length,
        total: alerts.length,
        rejected: alerts.filter(a => a.status === 'rejected').length
      };
      setStats(mockStats);
    } catch (err) {
      console.error('Failed to fetch stats');
    }
  };

  useEffect(() => {
    fetchDonationAlerts(filters);
  }, [loadingState]);

  useEffect(() => {
    fetchDonationStats();
  }, [alerts, loadingState]);

  useEffect(() => {
    fetchDonationAlerts(filters);
  }, [filters, loadingState]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchDonationAlerts(filters);
      toast.success('Data refreshed successfully');
    } catch (error) {
      toast.error('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  if(loading){
    return <><Loader/></>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 
                    p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">

        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl 
                        p-4 sm:p-6 shadow-lg border border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center 
                          gap-4 sm:gap-6">
            <div className="w-full sm:w-auto">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 
                           flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-green-600 to-emerald-600 
                              rounded-lg sm:rounded-xl">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="break-words">Donation Alerts</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                Real-time food donation notifications from your area
              </p>
            </div>

            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 
                       bg-green-600 text-white rounded-lg sm:rounded-xl 
                       hover:bg-green-700 transition-colors disabled:opacity-50
                       text-sm sm:text-base font-medium w-full sm:w-auto justify-center"
            >
              {refreshing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <DonationStatsCards stats={stats} />

        {/* Filters and Search*/}
        <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl 
                        p-4 sm:p-6 shadow-lg border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
                               text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by donor or food type..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 
                           rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 
                           focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              {['all', 'pending', 'accepted', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleFilterChange('status', status)}
                  className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl 
                           text-xs sm:text-sm font-medium transition-all flex-1 sm:flex-initial
                           ${filters.status === status
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600'
                    }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && alerts.length === 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl 
                        p-8 sm:p-12 shadow-lg border border-white/20 text-center">
            <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mx-auto mb-4 animate-spin" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
              Loading donations...
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              Please wait while we fetch the latest donations
            </p>
          </div>
        )}

        {/* Alerts List */}
        {!loading || alerts.length > 0 ? (
          <AlertDonationCard 
            alerts={alerts} 
            loading={loading} 
            setLoadingState={setLoadingState} 
          />
        ) : null}

        {/* Empty State */}
        {!loading && alerts.length === 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl 
                        p-8 sm:p-12 shadow-lg border border-white/20 text-center">
            <Bell className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
              No alerts found
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
}