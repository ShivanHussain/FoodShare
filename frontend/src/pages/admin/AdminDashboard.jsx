import React, { useEffect, useState } from 'react';
import { Heart, Users, Building2, BarChart3, Package, RefreshCw } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import StatsCard from '../../components/admin/adminDashboard/StatsCard';
import { DonationTrendsChart } from '../../components/admin/adminDashboard/DonationTrendsChart';
import { CategoryDistributionChart } from '../../components/admin/adminDashboard/CategoryDistributionChart';
import { StatusBreakdownChart } from '../../components/admin/adminDashboard/StatusBreakdownChart';
import { MonthlyComparisonChart } from '../../components/admin/adminDashboard/MonthlyComparisonChart';
import { 
  fetchCategoryDistribution, 
  fetchDashboardStats, 
  fetchDonationTrends, 
  fetchMonthlyComparison, 
  fetchStatusBreakdown,
  clearAnalytics 
} from '../../redux/slices/adminAnalyticsSlice';

// Main Dashboard Content Component 
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { userInfo, token } = useSelector((state) => state.auth);
  const { dashboardStats, categoryDistribution, donationTrends, monthlyComparison, statusBreakdown, loading, error 
  } = useSelector((state) => state.adminAnalytics);

  // State to track if component is mounted
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Set component as mounted
    setIsMounted(true);

    // Only fetch data if user is authenticated, has valid token, and is admin
    const shouldFetchData = userInfo && userInfo.role === 'admin' && token && isMounted;
    if (shouldFetchData) {
      // Dispatch all API calls
      dispatch(fetchDashboardStats());
      dispatch(fetchCategoryDistribution());
      dispatch(fetchDonationTrends());
      dispatch(fetchMonthlyComparison());
      dispatch(fetchStatusBreakdown());
    }

    // Cleanup function
    return () => {
      setIsMounted(false);
      // Clear analytics data when component unmounts
      if (!userInfo || userInfo.role !== 'admin') {
        dispatch(clearAnalytics());
      }
    };
  }, [dispatch, userInfo, token, isMounted]);

  // Early return if user is not admin or not authenticated
  if (!userInfo || userInfo.role !== 'admin' || !token) {
    return null;
  }

  // Early return if component is unmounted
  if (!isMounted) {
    return null;
  }

  const statsData = [
    { 
      title: 'Total Donations', 
      value: dashboardStats?.overview?.totalDonations || 0, 
      icon: Heart, 
      color: 'bg-gradient-to-r from-green-500 to-emerald-500' 
    },
    { 
      title: 'Active Users', 
      value: dashboardStats?.overview?.totalUsers || 0, 
      icon: Users, 
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500' 
    },
    { 
      title: 'NGOs Registered', 
      value: dashboardStats?.overview?.totalNGOs || 0, 
      icon: Building2, 
      color: 'bg-gradient-to-r from-purple-500 to-pink-500' 
    },
    { 
      title: 'Total Weights', 
      value: dashboardStats?.overview?.totalWeight || '0 kg', 
      icon: Package, 
      color: 'bg-gradient-to-r from-orange-500 to-red-500' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DonationTrendsChart 
          period="week" 
          range="8" 
          data={donationTrends} 
          loading={loading} 
          error={error} 
        />
        <CategoryDistributionChart 
          data={categoryDistribution} 
          loading={loading} 
          error={error} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <StatusBreakdownChart 
          data={statusBreakdown} 
          loading={loading} 
          error={error}
        />
        <MonthlyComparisonChart 
          data={monthlyComparison} 
          loading={loading}  
          error={error} 
        />
      </div>
    </div>
  );
};

export default AdminDashboard;