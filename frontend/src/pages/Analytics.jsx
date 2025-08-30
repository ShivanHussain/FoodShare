// Analytics.js 
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'lucide-react';
import { 
  fetchDashboardStats, 
  fetchWeeklyData, 
  fetchFoodTypeDistribution, 
  fetchImpactData, 
  fetchPerformanceMetrics,
} from '../redux/slices/donorAnalyticsSlice.js';
import Loader from '../components/Loader';
import StatCard from '../components/analytics/StatCard.jsx';
import WeeklyChart from '../components/analytics/WeeklyChart.jsx';
import FoodTypeChart from '../components/analytics/FoodTypeChart';
import ImpactChart from '../components/analytics/ImpactChart';
import QuickInsights from '../components/analytics/QuickInsights';

const Analytics = () => {
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);
  const analytics = useSelector((state) => state.analytics) || {};
  const {
    dashboardStats = {
      totalFoodDonated: 0,
      totalMeals: 0,
      activeNGOs: 0,
      co2Saved: 0,
      changes: {
        donationChange: 0,
        mealChange: 0,
        ngoChange: 0,
        co2Change: 0,
      },
    },
    weeklyData = [],
    foodTypeData = [],
    impactData = [],
    performanceMetrics = {
      avgResponseTime: 0,
      coverageArea: 0,
      successRate: 0,
    },
    loading = {
      dashboard: false,
      weekly: false,
      foodTypes: false,
      impact: false,
      performance: false,
    },
    error = {
      dashboard: null,
      weekly: null,
      foodTypes: null,
      impact: null,
      performance: null,
    },
  } = analytics;

  // Load data on component mount
  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        setInitialLoading(true);
        await Promise.all([
          dispatch(fetchDashboardStats()),
          dispatch(fetchWeeklyData()),
          dispatch(fetchFoodTypeDistribution()),
          dispatch(fetchImpactData()),
          dispatch(fetchPerformanceMetrics()),
        ]);
      } catch (error) {
        console.error('Error loading analytics data:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadAnalyticsData();
  }, [dispatch]);

  // Show main loader when initially loading
  if (initialLoading || !analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Analytics Dashboard
                </h1>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                  Track your impact on reducing food waste
                </p>
              </div>
              
              {/* Date Display */}
              <div className="flex justify-center sm:justify-end">
                <div className="flex items-center space-x-2 bg-white rounded-xl px-3 py-2 sm:px-4 shadow-md">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">
                    {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <StatCard
              title="Total Food Donated"
              value={dashboardStats.totalFoodDonated}
              change={dashboardStats.changes.donationChange}
              choice={1}
              color="bg-gradient-to-r from-green-500 to-green-600"
              suffix=" kg"
              isLoading={loading.dashboard}
            />
            <StatCard
              title="Meals Provided"
              value={dashboardStats.totalMeals}
              change={dashboardStats.changes.mealChange}
              choice={2}
              color="bg-gradient-to-r from-red-500 to-red-600"
              isLoading={loading.dashboard}
            />
            <StatCard
              title="Active NGOs"
              value={dashboardStats.activeNGOs}
              change={dashboardStats.changes.ngoChange}
              choice={3}
              color="bg-gradient-to-r from-blue-500 to-blue-600"
              isLoading={loading.dashboard}
            />
            <StatCard
              title="CO₂ Saved"
              value={dashboardStats.co2Saved}
              change={dashboardStats.changes.co2Change}
              choice={4}
              color="bg-gradient-to-r from-purple-500 to-purple-600"
              suffix=" kg"
              isLoading={loading.dashboard}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <WeeklyChart 
              weeklyData={weeklyData}
              loading={loading.weekly}
              error={error.weekly}
              onRetry={() => dispatch(fetchWeeklyData())}
            />
            <FoodTypeChart 
              foodTypeData={foodTypeData}
              loading={loading.foodTypes}
              error={error.foodTypes}
              onRetry={() => dispatch(fetchFoodTypeDistribution())}
            />
          </div>

          {/* Impact Chart */}
          <div className="mb-6 sm:mb-8">
            <ImpactChart 
              impactData={impactData}
              loading={loading.impact}
              error={error.impact}
              onRetry={() => dispatch(fetchImpactData())}
            />
          </div>

          {/* Quick Insights */}
          <QuickInsights 
            loading={loading} 
            performanceMetrics={performanceMetrics}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;