import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


const BASE_URL = 'https://foodshare-wwb9.onrender.com/api/v1/donations'

// Async thunk to fetch claimed donations by NGO  
export const fetchClaimedDonations = createAsyncThunk(
  'ngo/fetchClaimedDonations',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/claimed/ngo`, {
        withCredentials: true,
      });

      //Show backend success message 
      if (res.data?.message) {
        toast.success(res.data.message);
      }
      return res.data.claimedDonations || [];
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong';
      toast.error(`Error: ${message}`);
      return rejectWithValue(message);
    }
  }
);

// Slice
const ngoSlice = createSlice({
  name: 'ngo',
  initialState: {
    claimedDonations: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearClaimedDonations(state) {
      state.claimedDonations = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClaimedDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClaimedDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.claimedDonations = action.payload;
        state.error = null;
      })
      .addCase(fetchClaimedDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.claimedDonations = [];
      });
  },
});

export const { clearClaimedDonations } = ngoSlice.actions;

export default ngoSlice.reducer;
