import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


const API_BASE_URL = 'https://foodshare-wwb9.onrender.com/api/v1/analytics/donor';

// 1️ FETCH DASHBOARD STATS 
export const fetchDashboardStats = createAsyncThunk(
  'analytics/fetchDashboardStats',
  async (timeFilter = '7d', { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/dashboard?timeFilter=${timeFilter}`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch dashboard stats';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 2️ FETCH WEEKLY DATA
export const fetchWeeklyData = createAsyncThunk(
  'analytics/fetchWeeklyData',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/weekly`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch weekly data';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 3️ FETCH FOOD TYPE DISTRIBUTION
export const fetchFoodTypeDistribution = createAsyncThunk(
  'analytics/fetchFoodTypeDistribution',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/food-types`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch food type distribution';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 4️ FETCH IMPACT DATA
export const fetchImpactData = createAsyncThunk(
  'analytics/fetchImpactData',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/impact`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch impact data';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 5️ FETCH PERFORMANCE METRICS
export const fetchPerformanceMetrics = createAsyncThunk(
  'analytics/fetchPerformanceMetrics',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/performance`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch performance metrics';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// Initial State
const initialState = {
  loading: false,
  success: false,
  error: {
    dashboard: null,
    weekly: null,
    foodTypes: null,
    impact: null,
    performance: null,
  },
  timeFilter: '7d',
  dashboardStats: {
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
  weeklyData: [],
  foodTypeData: [],
  impactData: [],
  performanceMetrics: {
    avgResponseTime: 0,
    coverageArea: 0,
    successRate: 0,
  },
};

// Slice
const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearAnalyticsError: (state) => {
      state.error = {
        dashboard: null,
        weekly: null,
        foodTypes: null,
        impact: null,
        performance: null,
      };
    },
    setTimeFilter: (state, action) => {
      state.timeFilter = action.payload;
    },
    resetAnalytics: () => initialState,
  },
  extraReducers: (builder) => {
    // DASHBOARD STATS
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error.dashboard = null;
        state.success = false;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardStats = action.payload;
        state.error.dashboard = null;
        state.success = true;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error.dashboard = action.payload;
        state.success = false;
      });

    // WEEKLY DATA
    builder
      .addCase(fetchWeeklyData.pending, (state) => {
        state.loading = true;
        state.error.weekly = null;
        state.success = false;
      })
      .addCase(fetchWeeklyData.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyData = action.payload;
        state.error.weekly = null;
        state.success = true;
      })
      .addCase(fetchWeeklyData.rejected, (state, action) => {
        state.loading = false;
        state.error.weekly = action.payload;
        state.success = false;
      });

    // FOOD TYPE DISTRIBUTION
    builder
      .addCase(fetchFoodTypeDistribution.pending, (state) => {
        state.loading = true;
        state.error.foodTypes = null;
        state.success = false;
      })
      .addCase(fetchFoodTypeDistribution.fulfilled, (state, action) => {
        state.loading = false;
        state.foodTypeData = action.payload;
        state.error.foodTypes = null;
        state.success = true;
      })
      .addCase(fetchFoodTypeDistribution.rejected, (state, action) => {
        state.loading = false;
        state.error.foodTypes = action.payload;
        state.success = false;
      });

    // IMPACT DATA
    builder
      .addCase(fetchImpactData.pending, (state) => {
        state.loading = true;
        state.error.impact = null;
        state.success = false;
      })
      .addCase(fetchImpactData.fulfilled, (state, action) => {
        state.loading = false;
        state.impactData = action.payload;
        state.error.impact = null;
        state.success = true;
      })
      .addCase(fetchImpactData.rejected, (state, action) => {
        state.loading = false;
        state.error.impact = action.payload;
        state.success = false;
      });

    // PERFORMANCE METRICS
    builder
      .addCase(fetchPerformanceMetrics.pending, (state) => {
        state.loading = true;
        state.error.performance = null;
        state.success = false;
      })
      .addCase(fetchPerformanceMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.performanceMetrics = action.payload;
        state.error.performance = null;
        state.success = true;
      })
      .addCase(fetchPerformanceMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error.performance = action.payload;
        state.success = false;
      });
  },
});

export const { clearAnalyticsError, setTimeFilter, resetAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
