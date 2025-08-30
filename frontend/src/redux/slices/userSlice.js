import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:4000/api/v1/user';

// ==============================
// Async Thunks

// 1. GET ALL USERS WITH FEEDBACK   
export const getAllUsersFeedback = createAsyncThunk(
  'user/getAllUsersFeedback',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/all/feedback`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to load users feedback';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 2. UPDATE PROFILE   
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/profile/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      toast.success(res.data.message);
      
      // Return the complete updated user object
      return {
        success: true,
        user: res.data.user || res.data.data, 
        message: res.data.message
      };
    } catch (error) {
      const msg = error.response?.data?.message || 'Profile update failed';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 3. CHANGE PASSWORD   
export const updateUserPassword = createAsyncThunk(
  'user/changePassword',
  async ({ currentPassword, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/password/change`, {
        currentPassword, newPassword, confirmPassword
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res.data.message;
    } catch (error) {
      const msg = error.response?.data?.message || 'Password change failed';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 4. GET FULL DONATION HISTORY
export const getDonationHistory = createAsyncThunk(
  'user/getDonationHistory',
  async ({ role }, { rejectWithValue }) => {
    if (role === 'ngo') return rejectWithValue('Role is required to fetch donation history');
    try {
      const res = await axios.get(`${BASE_URL}/history/${role}`, {
        withCredentials: true,
      });
      return res.data.donations;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to load donation history';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 5. GET DONATION HISTORY BY STATUS  
export const getDonationHistoryByStatus = createAsyncThunk(
  'user/getDonationHistoryByStatus',
  async (status, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/history/status`, {
        params: { status },
        withCredentials: true,
      });
      return res.data.donations;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to filter donation history';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 6. GET RECENT DONATIONS - DONOR   
export const getRecentThreeDonations = createAsyncThunk(
  'user/getRecentThreeDonations',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/history/recent/donor`, {
        withCredentials: true,
      });
      return res.data.recentDonations;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch recent donations';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 7. GET RECENT DONATIONS - NGO   
export const getRecentThreeDonationsNgo = createAsyncThunk(
  'user/getRecentThreeDonationsNgo',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/history/recent/ngo`, {
        withCredentials: true,
      });
      return res.data.recentDonations;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch NGO recent donations';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 8. FORGOT PASSWORD 
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/password/forgot`, { email }, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res.data.message;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to send email';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// 9. RESET PASSWORD   
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ token, newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/password/reset/${token}`, { newPassword, confirmPassword }, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res.data.message;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to reset password';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);




// ==============================
// Slice

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    success: false,
    error: null,
    userInfo: null, 
    donationHistory: [],
    filteredDonationHistory: [],
    recentDonations: [],
    recentNgoDonations: [],
    allUsersFeedback: [],
    message: '',
  },
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearUserMessage: (state) => {
      state.message = '';
    },
    clearUserSuccess: (state) => {
      state.success = false;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    //Direct user info update reducer
    updateUserInfoLocal: (state, action) => {
      if (state.userInfo) {
        state.userInfo = { ...state.userInfo, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Users Feedback
      .addCase(getAllUsersFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsersFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsersFeedback = action.payload;
      })
      .addCase(getAllUsersFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Update Profile with proper user data 
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        // Update userInfo with the latest data from backend
        if (action.payload?.user) {
          // Merge existing userInfo with updated data
          state.userInfo = {
            ...state.userInfo,
            ...action.payload.user,
            // Ensure important fields are preserved
            _id: state.userInfo?._id || action.payload.user._id,
            email: action.payload.user.email || state.userInfo?.email,
            role: action.payload.user.role || state.userInfo?.role,
          };
        }
        
        if (action.payload?.message) {
          state.message = action.payload.message;
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Change Password
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Donation History
      .addCase(getDonationHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDonationHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.donationHistory = action.payload;
      })
      .addCase(getDonationHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Filtered Donation History by Status
      .addCase(getDonationHistoryByStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDonationHistoryByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredDonationHistory = action.payload;
      })
      .addCase(getDonationHistoryByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Recent Donations (Donor)
      .addCase(getRecentThreeDonations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecentThreeDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.recentDonations = action.payload;
      })
      .addCase(getRecentThreeDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Recent Donations (NGO)
      .addCase(getRecentThreeDonationsNgo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecentThreeDonationsNgo.fulfilled, (state, action) => {
        state.loading = false;
        state.recentNgoDonations = action.payload;
      })
      .addCase(getRecentThreeDonationsNgo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearUserError, 
  clearUserMessage, 
  clearUserSuccess, 
  setUserInfo, 
  updateUserInfoLocal 
} = userSlice.actions;

export default userSlice.reducer;