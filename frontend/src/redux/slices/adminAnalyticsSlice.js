import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:4000/api/v1/admin";

// ========== Thunks ==========
export const fetchDashboardStats = createAsyncThunk(
  "adminAnalytics/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return rejectWithValue('No token found');
    }
    try {
      const res = await axios.get(`${API_BASE_URL}/dashboard/stats`, {
        withCredentials: true,
      });
      return res.data.data || null;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch dashboard stats";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchDonationTrends = createAsyncThunk(
  "adminAnalytics/fetchDonationTrends",
  async ({ period = "week", range = "4" } = {}, { rejectWithValue }) => {

    const token = localStorage.getItem('token');

    if (!token) {
      return rejectWithValue('No token found');
    }
    try {
      const res = await axios.get(
        `${API_BASE_URL}/analytics/donation-trends?period=${period}&range=${range}`,
        { withCredentials: true }
      );
      return res.data.data || [];
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch donation trends";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchCategoryDistribution = createAsyncThunk(
  "adminAnalytics/fetchCategoryDistribution",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return rejectWithValue('No token found');
    }
    try {
      const res = await axios.get(`${API_BASE_URL}/analytics/category-distribution`, {
        withCredentials: true,
      });
      return res.data.data || null;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch category distribution";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchStatusBreakdown = createAsyncThunk(
  "adminAnalytics/fetchStatusBreakdown",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return rejectWithValue('No token found');
    }
    try {
      const res = await axios.get(`${API_BASE_URL}/analytics/status-breakdown`, {
        withCredentials: true,
      });
      return res.data.data || [];
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch status breakdown";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchMonthlyComparison = createAsyncThunk(
  "adminAnalytics/fetchMonthlyComparison",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return rejectWithValue('No token found');
    }
    try {
      const res = await axios.get(`${API_BASE_URL}/analytics/monthly-comparison`, {
        withCredentials: true,
      });
      return res.data.data || [];
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch monthly comparison";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ========== Initial State ==========
const initialState = {
  dashboardStats: null,
  donationTrends: [],
  categoryDistribution: null,
  statusBreakdown: [],
  monthlyComparison: [],

  loading: false,
  error: null,
};

// ========== Slice ==========
const adminAnalyticsSlice = createSlice({
  name: "adminAnalytics",
  initialState,
  reducers: {
    clearAnalytics(state) {
      state.dashboardStats = null;
      state.donationTrends = [];
      state.categoryDistribution = null;
      state.statusBreakdown = [];
      state.monthlyComparison = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    };

    builder
      // Dashboard Stats
      .addCase(fetchDashboardStats.pending, handlePending)
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, handleRejected)

      // Donation Trends
      .addCase(fetchDonationTrends.pending, handlePending)
      .addCase(fetchDonationTrends.fulfilled, (state, action) => {
        state.loading = false;
        state.donationTrends = action.payload;
      })
      .addCase(fetchDonationTrends.rejected, handleRejected)

      // Category Distribution
      .addCase(fetchCategoryDistribution.pending, handlePending)
      .addCase(fetchCategoryDistribution.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryDistribution = action.payload;
      })
      .addCase(fetchCategoryDistribution.rejected, handleRejected)

      // Status Breakdown
      .addCase(fetchStatusBreakdown.pending, handlePending)
      .addCase(fetchStatusBreakdown.fulfilled, (state, action) => {
        state.loading = false;
        state.statusBreakdown = action.payload;
      })
      .addCase(fetchStatusBreakdown.rejected, handleRejected)

      // Monthly Comparison
      .addCase(fetchMonthlyComparison.pending, handlePending)
      .addCase(fetchMonthlyComparison.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyComparison = action.payload;
      })
      .addCase(fetchMonthlyComparison.rejected, handleRejected);
  },
});

export const { clearAnalytics } = adminAnalyticsSlice.actions;
export default adminAnalyticsSlice.reducer;
