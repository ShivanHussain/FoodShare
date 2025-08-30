import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API = 'http://localhost:4000/api/v1/donations'

// =========================
// 1. CREATE DONATION 
export const createDonation = createAsyncThunk(
  'donation/createDonation',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_API}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Donation failed';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// =========================
// 2 .FETCH ALL DONATIONS  
export const fetchDonations = createAsyncThunk(
  'donation/fetchDonations',
  async (params, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_API}/`, {
        params,
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch donations';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// =========================
// 3.  GET USER DONATIONS
export const getUserDonations = createAsyncThunk(
  'donation/getUserDonations',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_API}/user/my-donations`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to load your donations';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// =========================
// 4. GET SINGLE DONATION 
export const getDonationById = createAsyncThunk(
  'donation/getDonationById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_API}/${id}`, {
        withCredentials: true,
      });
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch donation';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// =========================
// 5. CLAIM DONATION 
export const claimDonation = createAsyncThunk(
  'donation/claimDonation',
  async ({ id, statusValue }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${BASE_API}/${id}/claim`,
        { statusValue },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Claim failed';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// =========================
// 6. UPDATE DONATION STATUS
export const updateDonationStatus = createAsyncThunk(
  'donation/updateDonationStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${BASE_API}/${id}/status`,
        { status },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Update failed';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// =========================
// 7. FETCH CLAIMED DONATIONS 
export const fetchClaimedDonations = createAsyncThunk(
  'donation/fetchClaimedDonations',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_API}/claimed/donor`, {
        withCredentials: true,
      });
      return res.data.claimedDonations;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch claimed donations';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

// =========================
// SLICE
const donationSlice = createSlice({
  name: 'donation',
  initialState: {
    loading: false,
    donations: [],
    userDonations: [],
    claimedDonations: [],
    singleDonation: null,
    error: null,
    success: false,
  },
  reducers: {
    clearDonationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createDonation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userDonations.unshift(action.payload.data);
      })
      .addCase(createDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ALL
      .addCase(fetchDonations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = action.payload.data;
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // USER DONATIONS
      .addCase(getUserDonations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.userDonations = action.payload;
      })
      .addCase(getUserDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET SINGLE
      .addCase(getDonationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDonationById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDonation = action.payload;
      })
      .addCase(getDonationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CLAIM
      .addCase(claimDonation.pending, (state) => {
        state.loading = true;
      })
      .addCase(claimDonation.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(claimDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE STATUS
      .addCase(updateDonationStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDonationStatus.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateDonationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH CLAIMED DONATIONS
      .addCase(fetchClaimedDonations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClaimedDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.claimedDonations = action.payload;
      })
      .addCase(fetchClaimedDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDonationError } = donationSlice.actions;

export default donationSlice.reducer;
