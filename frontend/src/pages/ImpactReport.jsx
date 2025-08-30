/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  BarChart3, 
  Calendar
} from 'lucide-react';
import {
  fetchTotalMeals,
  fetchTotalPickups,
  fetchWasteReduced,
  fetchCO2Saved,
  fetchMoneyValueSaved,
  fetchAverageResponseTime,
} from '../redux/slices/ngoAnalyticsSlice';
import Loader from '../components/Loader';
import { ImpactMetricsGrid } from '../components/impactReport/ImpactMetricsGrid';
import { ImpactOverview} from '../components/impactReport/ImpactOverview';
import { TopContributors } from '../components/impactReport/TopContributors';
import { EnhancedImpactSummary } from '../components/impactReport/EnhancedImpactSummary';

export default function ImpactReport() {
  const dispatch = useDispatch();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Get data from Redux store 
  const ngoImpactState = useSelector((state) => state.ngoImpact || {});
  const {
    totalMeals = null,
    totalPickups = null,
    wasteReduced = null,
    co2Saved = null,
    moneySaved = null,
    avgResponseTime = null,
    loading = false,
    error = null
  } = ngoImpactState;

  // Fetch all impact data when component mounts
  useEffect(() => {
    fetchAllImpactData();
  }, []);

  // Set initial load to false when data starts coming or loading completes
  useEffect(() => {
    if (!loading && (totalMeals !== null || error)) {
      setIsInitialLoad(false);
    }
  }, [loading, totalMeals, error]);

  const fetchAllImpactData = () => {
    try {
      dispatch(fetchTotalMeals());
      dispatch(fetchTotalPickups());
      dispatch(fetchWasteReduced());
      dispatch(fetchCO2Saved());
      dispatch(fetchMoneyValueSaved());
      dispatch(fetchAverageResponseTime());
    } catch (err) {
      console.error('Error fetching impact data:', err);
    }
  };

  // Show custom loader during initial load
  if (isInitialLoad && loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-6">
      {/* Redux Store Error Check */}
      {!ngoImpactState && (
        <div className="fixed inset-0 bg-red-50 flex items-center justify-center z-50">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            </div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Redux Store Error</h2>
            <p className="text-red-600 mb-4">
              NGO Impact slice is not configured properly in Redux store. 
              Please check your store configuration.
            </p>
            <div className="text-sm text-red-500 bg-red-100 p-3 rounded-lg">
              Make sure to add ngoImpact: ngoImpactReducer to your store.
            </div>
          </div>
        </div>
      )}

      {ngoImpactState && (
        <div className="max-w-7xl mx-auto space-y-6">
        
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  Impact Report
                </h1>
                <p className="text-gray-600 mt-2">Track your organization's social and environmental impact</p>
              </div>
              
              {/* Current Date Display */}
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">
                  {new Date().toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <p className="text-red-700 font-medium">Error loading data</p>
              </div>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Impact Metrics Grid */}
          <ImpactMetricsGrid 
            totalMeals={totalMeals}
            totalPickups={totalPickups}
            wasteReduced={wasteReduced}
            co2Saved={co2Saved}
            moneySaved={moneySaved}
            avgResponseTime={avgResponseTime}
          />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ImpactOverview 
              totalMeals={totalMeals}
              totalPickups={totalPickups}
              wasteReduced={wasteReduced}
              co2Saved={co2Saved}
              moneySaved={moneySaved}
            />
            <TopContributors />
          </div>

          {/* Enhanced Impact Summary Section */}
          <EnhancedImpactSummary 
            totalMeals={totalMeals}
            totalPickups={totalPickups}
            wasteReduced={wasteReduced}
            co2Saved={co2Saved}
            moneySaved={moneySaved}
            avgResponseTime={avgResponseTime}
          />

        </div>
      )}
    </div>
  );
}