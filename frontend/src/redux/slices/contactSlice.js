// redux/slices/contactSupportSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = 'https://foodshare-wwb9.onrender.com/api/v1/contact';

// 1. Submit contact form (user)
export const submitContactForm = createAsyncThunk(
  'contact/submitContactForm',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/`, formData,{
        withCredentials: true,
      });
      return data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to send message');
    }
  }
);

// 2. Get all messages (admin) 
export const getAllContactMessages = createAsyncThunk(
  'contact/getAllContactMessages',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/`,{
        withCredentials: true,
      }); // Admin-only access
      return data.messages;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch messages');
    }
  }
);

const contactSupportSlice = createSlice({
  name: 'contactSupport',
  initialState: {
    // User message submission
    loading: false,
    successMessage: null,
    error: null,

    // Admin: fetch all messages
    messages: [],
    adminLoading: false,
    adminError: null,
  },
  reducers: {
    clearContactState: (state) => {
      state.loading = false;
      state.successMessage = null;
      state.error = null;
    },
    clearAdminMessages: (state) => {
      state.adminLoading = false;
      state.messages = [];
      state.adminError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- User: Submit Form ---
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Admin: Get All Messages ---
      .addCase(getAllContactMessages.pending, (state) => {
        state.adminLoading = true;
        state.adminError = null;
      })
      .addCase(getAllContactMessages.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.messages = action.payload;
      })
      .addCase(getAllContactMessages.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminError = action.payload;
      });
  }
});

export const { clearContactState, clearAdminMessages } = contactSupportSlice.actions;
export default contactSupportSlice.reducer;
