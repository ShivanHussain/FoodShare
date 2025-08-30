import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://foodshare-wwb9.onrender.com/api/v1/auth';

// REGISTER  
export const registerUser = createAsyncThunk(
  'auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      const userRole = formData.get("role");
      const res = await axios.post(`${BASE_URL}/signup/${userRole}`, formData, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Signup failed';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// LOGIN    
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password }, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      return {
        user: res.data.user,
        token: res.data.token,
        message: res.data.message
      };
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// LOGOUT 
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/logout`, {
        withCredentials: true,
      });
      dispatch(clearUser()); // Use clearUser instead of logout
      localStorage.removeItem("token");
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Logout failed';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// CURRENT USER 
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      dispatch(clearUser());
      return rejectWithValue('No token found');
    }
    
    try {
      const res = await axios.get(`${BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return {
        user: res.data.user,
        token: token
      };
    } catch (error) {
      // If token is invalid or expired, clear everything
      if (error.response?.status === 401 || 
          error.response?.data?.message?.toLowerCase().includes('token') ||
          error.response?.data?.message?.toLowerCase().includes('expired') ||
          error.response?.data?.message?.toLowerCase().includes('invalid')) {
        
        dispatch(clearUser());
        localStorage.removeItem('token');
        toast.error('Session expired. Please login again.');
      }
      
      const msg = error.response?.data?.message || 'Failed to fetch user';
      return rejectWithValue(msg);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    userInfo: null,
    token: null, 
    isAuthenticated: false,
    success: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // Main function to clear user data (for token expiry/invalid cases)
    clearUser: (state) => {
      state.userInfo = null;
      state.token = null;
      state.success = false;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },
    // Keep logout separate for manual logout
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.success = false;
      state.isAuthenticated = false;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload.user || action.payload;
      state.token = action.payload.token || state.token;
      state.isAuthenticated = true;
      state.success = true;
    },
    // Action to handle token expiry from other parts of app
    handleTokenExpiry: (state) => {
      state.userInfo = null;
      state.token = null;
      state.isAuthenticated = false;
      state.success = false;
      localStorage.removeItem('token');
      toast.error('Session expired. Please login again.');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
        state.success = true;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.isAuthenticated = false;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.userInfo = null;
        state.token = null;
        state.isAuthenticated = false;
        state.success = false;
      })

      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
        state.success = true;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.userInfo = null;
        state.token = null;
        state.isAuthenticated = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, logout, setUserInfo, clearUser, handleTokenExpiry } = authSlice.actions;
export default authSlice.reducer;
