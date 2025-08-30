import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';


const BASE_URL = 'http://localhost:4000/api/v1/otp'

// ===============================
// 1️ SEND OTPs  
export const sendEmailOtp = createAsyncThunk(
  'otp/fetchClaimedDonations',
  async ({ donationId, notificationId}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/${donationId}/send/${notificationId}`,{
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch claimed donations');
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch claimed donations');
    }
  }
);

// ===============================
// 2️ VERIFY OTP  
export const verifyDonationOtp = createAsyncThunk(
  'otp/verifyDonationOtp',
  async ({ otp, donationId, ngoId ,userId}, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/verify-otp`, { otp, donationId, ngoId, userId },{
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res.data.message;
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
      return rejectWithValue(err.response?.data?.message || 'OTP verification failed');
    }
  }
);

// ===============================
// 3️ FETCH PICKUP REQUESTS (Donor → Claimed Donations + NGO)
export const fetchPickupRequests = createAsyncThunk(
  'otp/fetchPickupRequests',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/v1/donations/request-pickup',{
        withCredentials: true,
      });
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch pickup requests');
    }
  }
);

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    loading: false,
    error: null,
    user: null,
    donations: [],
    otpStatus: [],
    otpVerifiedMessage: null,
    pickupRequests: [],
  },
  reducers: {
    clearOtpState: (state) => {
      state.loading = false;
      state.error = null;
      state.otpVerifiedMessage = null;
      state.pickupRequests = [];
    },
  },
  extraReducers: (builder) => {
    //Fetch Claimed Donations
    builder
      .addCase(sendEmailOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendEmailOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.donations = action.payload.donations;
        state.otpStatus = action.payload.otpStatus;
      })
      .addCase(sendEmailOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //Verify OTP
    builder
      .addCase(verifyDonationOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpVerifiedMessage = null;
      })
      .addCase(verifyDonationOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerifiedMessage = action.payload;
      })
      .addCase(verifyDonationOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.otpVerifiedMessage = null;
      });

    //Fetch Pickup Requests
    builder
      .addCase(fetchPickupRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPickupRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.pickupRequests = action.payload.pickups;
        state.user = action.payload.donor;
      })
      .addCase(fetchPickupRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOtpState } = otpSlice.actions;
export default otpSlice.reducer;
