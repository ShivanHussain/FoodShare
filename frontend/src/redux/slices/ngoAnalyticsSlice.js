// @disc This file contains the NGO analytics slice for Redux Toolkit.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Base URL for NGO impact API
const BASE_URL = 'https://foodshare-wwb9.onrender.com/api/v1/analytics/ngo/impact';

// @disc fetch total meals  
export const fetchTotalMeals = createAsyncThunk('ngoImpact/fetchTotalMeals', 
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/total-meals`, { withCredentials: true });
      return res.data.totalMeals;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch total meals';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// @disc fetch total pickups    
export const fetchTotalPickups = createAsyncThunk('ngoImpact/fetchTotalPickups', 
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/total-pickups`, { withCredentials: true });
      return res.data.totalPickups;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch total pickups';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// @disc fetch waste reduced    
export const fetchWasteReduced = createAsyncThunk('ngoImpact/fetchWasteReduced', 
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/waste-reduced`, { withCredentials: true });
      return res.data.wasteReduced;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch waste reduced';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// @disc fetch CO2 saved  
export const fetchCO2Saved = createAsyncThunk('ngoImpact/fetchCO2Saved', 
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/co2-saved`, { withCredentials: true });
      return res.data.co2Saved;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch CO2 saved';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// @disc fetch money value saved   
export const fetchMoneyValueSaved = createAsyncThunk('ngoImpact/fetchMoneyValueSaved', 
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/money-saved`, { withCredentials: true });
      return res.data.moneyValueSaved;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch money saved';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// @disc fetch average response time  
export const fetchAverageResponseTime = createAsyncThunk('ngoImpact/fetchAverageResponseTime', 
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/avg-response-time`, { withCredentials: true });
      return res.data.averageResponseTime;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch average response time';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// @disc fetch yearly trend data  
export const fetchYearlyTrendData = createAsyncThunk('ngoImpact/fetchYearlyTrendData', 
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/yearly-trend`, { withCredentials: true });
      return res.data.monthlyCounts;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch yearly trend data';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Slice
const ngoImpactSlice = createSlice({
  name: 'ngoImpact',
  initialState: {
    totalMeals: null,
    totalPickups: null,
    wasteReduced: null,
    co2Saved: null,
    moneySaved: null,
    avgResponseTime: null,
    yearlyTrendData: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearNgoImpact(state) {
      state.totalMeals = null;
      state.totalPickups = null;
      state.wasteReduced = null;
      state.co2Saved = null;
      state.moneySaved = null;
      state.avgResponseTime = null;
      state.yearlyTrendData = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Total Meals
    builder
      .addCase(fetchTotalMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.totalMeals = action.payload;
      })
      .addCase(fetchTotalMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Total Pickups
    builder
      .addCase(fetchTotalPickups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalPickups.fulfilled, (state, action) => {
        state.loading = false;
        state.totalPickups = action.payload;
      })
      .addCase(fetchTotalPickups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Waste Reduced
    builder
      .addCase(fetchWasteReduced.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWasteReduced.fulfilled, (state, action) => {
        state.loading = false;
        state.wasteReduced = action.payload;
      })
      .addCase(fetchWasteReduced.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // CO2 Saved
    builder
      .addCase(fetchCO2Saved.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCO2Saved.fulfilled, (state, action) => {
        state.loading = false;
        state.co2Saved = action.payload;
      })
      .addCase(fetchCO2Saved.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Money Saved
    builder
      .addCase(fetchMoneyValueSaved.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoneyValueSaved.fulfilled, (state, action) => {
        state.loading = false;
        state.moneySaved = action.payload;
      })
      .addCase(fetchMoneyValueSaved.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Average Response Time
    builder
      .addCase(fetchAverageResponseTime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAverageResponseTime.fulfilled, (state, action) => {
        state.loading = false;
        state.avgResponseTime = action.payload;
      })
      .addCase(fetchAverageResponseTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Yearly Trend Data
    builder
      .addCase(fetchYearlyTrendData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchYearlyTrendData.fulfilled, (state, action) => {
        state.loading = false;
        state.yearlyTrendData = action.payload;
      })
      .addCase(fetchYearlyTrendData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNgoImpact } = ngoImpactSlice.actions;

export default ngoImpactSlice.reducer;
