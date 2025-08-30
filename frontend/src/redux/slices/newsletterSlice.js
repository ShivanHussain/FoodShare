// redux/newsletterSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const BASE_URL = 'http://localhost:4000/api/v1/newsletter'

export const subscribeNewsletter = createAsyncThunk(
  "newsletter/subscribe",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/subscribe`, { email });
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Subscription failed");
      return rejectWithValue(err.response?.data);
    }
  }
);

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: { 
    loading: false, 
    error: null },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribeNewsletter.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(subscribeNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  }
});

export default newsletterSlice.reducer;
