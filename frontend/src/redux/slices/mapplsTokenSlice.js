/* eslint-disable no-unused-vars */


// redux/slices/mapplsTokenSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://foodshare-wwb9.onrender.com/api/v1/mappls'

// Async thunk for getting access token 
export const getAccessToken = createAsyncThunk(
  'mappls/getAccessToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/token`,{
        withCredentials: true,
      });
      
      if (!response.data.success) {
        throw new Error('Failed to get access token');
      }
      
      return {
        token: response.data.access_token,
        expiresIn: response.data.expires_in || 3600
      };
    } catch (error) {
      console.error('Token fetch error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch access token'
      );
    }
  }
);

// Async thunk for fetching distance and ETA 
export const fetchDistanceETA = createAsyncThunk(
  'mappls/fetchDistanceETA',
  async ({ from, to }, { rejectWithValue }) => {
    try {
      
      const response = await axios.get(`${BASE_URL}/distance`, {
        params: { from, to },
        timeout: 15000 // 15 second timeout
      },{
        withCredentials: true,
      });

      if (!response.data.success) {
        throw new Error('Failed to fetch distance and ETA');
      }

      
      //Return the actual data structure
      const data = response.data.data;
      
      return {
        distance: data.distance || null,
        eta: data.eta || null,
        raw: data.raw || null
      };
      
    } catch (error) {
      console.error('Distance/ETA fetch error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch distance and ETA'
      );
    }
  }
);

// Initial state
const initialState = {
  // Token state
  accessToken: null,
  tokenExpiresAt: null,
  tokenLoading: false,
  tokenError: null,
  
  // Distance/ETA state
  distance: null,
  eta: null,
  rawData: null,
  isLoading: false,
  loading: false, 
  error: null,
  lastFetchedCoordinates: null,
  
  // API health
  apiHealthy: true,
};

// Slice
const mapplsSlice = createSlice({
  name: 'mappls',
  initialState,
  reducers: {
    // Clear distance/ETA data
    clearDistanceData: (state) => {
      state.distance = null;
      state.eta = null;
      state.rawData = null;
      state.error = null;
      state.lastFetchedCoordinates = null;
    },
    
    // Clear all data
    clearAllData: (state) => {
      return { ...initialState };
    },
    
    // Set API health status
    setApiHealth: (state, action) => {
      state.apiHealthy = action.payload;
    },
    
    // Clear errors
    clearErrors: (state) => {
      state.error = null;
      state.tokenError = null;
    }
  },
  
  extraReducers: (builder) => {
    // Get Access Token
    builder
      .addCase(getAccessToken.pending, (state) => {
        state.tokenLoading = true;
        state.tokenError = null;
      })
      .addCase(getAccessToken.fulfilled, (state, action) => {
        state.tokenLoading = false;
        state.accessToken = action.payload.token;
        
        // Calculate expiry time
        const now = new Date();
        const expiryTime = new Date(now.getTime() + (action.payload.expiresIn * 1000));
        state.tokenExpiresAt = expiryTime.toISOString();
        
        state.tokenError = null;
        state.apiHealthy = true;
      })
      .addCase(getAccessToken.rejected, (state, action) => {
        state.tokenLoading = false;
        state.tokenError = action.payload;
        state.accessToken = null;
        state.tokenExpiresAt = null;
        state.apiHealthy = false;
      });

    // Fetch Distance and ETA
    builder
      .addCase(fetchDistanceETA.pending, (state, action) => {
        state.isLoading = true;
        state.loading = true; 
        state.error = null;
        // Store the coordinates being fetched
        const { from, to } = action.meta.arg;
        state.lastFetchedCoordinates = { from, to };
      })
      .addCase(fetchDistanceETA.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loading = false; 
        
        //Properly set the distance and ETA values
        state.distance = action.payload.distance;
        state.eta = action.payload.eta;
        state.rawData = action.payload.raw;
        
        state.error = null;
        state.apiHealthy = true;
        
      })
      .addCase(fetchDistanceETA.rejected, (state, action) => {
        state.isLoading = false;
        state.loading = false;
        state.error = action.payload;
        state.distance = null;
        state.eta = null;
        state.rawData = null;
        
        // Set API health to false if it's a server error
        if (action.payload?.includes('server') || action.payload?.includes('timeout')) {
          state.apiHealthy = false;
        }
      });
  }
});

// Export actions
export const { 
  clearDistanceData, 
  clearAllData, 
  setApiHealth, 
  clearErrors 
} = mapplsSlice.actions;

const selectMapplsState = (state) => state.mappls || {};

export const selectTokenData = createSelector(
  [selectMapplsState],
  (mapplsState) => ({
    token: mapplsState.accessToken || null,
    loading: mapplsState.tokenLoading || false,
    error: mapplsState.tokenError || null,
    expiresAt: mapplsState.tokenExpiresAt || null
  })
);



export const selectDistanceData = createSelector(
  [selectMapplsState],
  (mapplsState) => ({
    distance: mapplsState.distance || null,
    eta: mapplsState.eta || null,
    loading: mapplsState.isLoading || mapplsState.loading || false,
    error: mapplsState.error || null,
    rawData: mapplsState.rawData || null
  })
);

export const selectApiHealth = createSelector(
  [selectMapplsState],
  (mapplsState) => mapplsState.apiHealthy !== undefined ? mapplsState.apiHealthy : true
);

// Helper selector to check if token is expired or about to expire
export const selectIsTokenValid = createSelector(
  [selectMapplsState],
  (mapplsState) => {
    const { accessToken, tokenExpiresAt } = mapplsState;
    
    if (!accessToken || !tokenExpiresAt) return false;
    
    const now = new Date();
    const expiry = new Date(tokenExpiresAt);
    const bufferTime = 5 * 60 * 1000; // 5 minutes buffer
    
    return expiry.getTime() - now.getTime() > bufferTime;
  }
);

// Export reducer
export default mapplsSlice.reducer;
