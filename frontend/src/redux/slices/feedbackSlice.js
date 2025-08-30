import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://foodshare-wwb9.onrender.com/api/v1/feedback";

// ========== Thunks ==========

// Create feedback 
export const createFeedback = createAsyncThunk(
  "feedback/createFeedback",
  async (feedbackData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/create`, feedbackData, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res.data.feedback;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(`Error: ${message}`);
      return rejectWithValue(message);
    }
  }
);

// Get received feedbacks 
export const fetchFeedbacksReceived = createAsyncThunk(
  "feedback/fetchFeedbacksReceived",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/received`, {
        withCredentials: true,
      });
      return res.data.feedbacks;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(`Error: ${message}`);
      return rejectWithValue(message);
    }
  }
);

// Get given feedbacks 
export const fetchFeedbacksGiven = createAsyncThunk(
  "feedback/fetchFeedbacksGiven",
  async (toUserId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/given`, {
        params: toUserId ? { toUserId } : {},
        withCredentials: true,
      });
      return res.data.feedbacks;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(`Error: ${message}`);
      return rejectWithValue(message);
    }
  }
);

// Mark feedback as read
export const markFeedbackAsRead = createAsyncThunk(
  "feedback/markFeedbackAsRead",
  async (feedbackId, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/${feedbackId}/read`, {}, { withCredentials: true });
      toast.success(res.data.message || "Marked as read");
      return res.data.feedback;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(`Error: ${message}`);
      return rejectWithValue(message);
    }
  }
);

// Delete feedback
export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async (feedbackId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${feedbackId}`, { withCredentials: true });
      toast.success(res.data.message || "Feedback deleted");
      return feedbackId;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(`Error: ${message}`);
      return rejectWithValue(message);
    }
  }
);

// Like feedback
export const likeFeedback = createAsyncThunk(
  "feedback/likeFeedback",
  async (feedbackId, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/like/${feedbackId}`, {}, { withCredentials: true });
      toast.success(res.data.message);
      return res.data.feedback;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(`Error: ${message}`);
      return rejectWithValue(message);
    }
  }
);

// Dislike feedback
export const dislikeFeedback = createAsyncThunk(
  "feedback/dislikeFeedback",
  async (feedbackId, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/dislike/${feedbackId}`, {}, { withCredentials: true });
      toast.success(res.data.message);
      return res.data.feedback;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(`Error: ${message}`);
      return rejectWithValue(message);
    }
  }
);

// ========== Slice ==========
const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbacksReceived: [],
    feedbacksGiven: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearFeedbackState(state) {
      state.feedbacksReceived = [];
      state.feedbacksGiven = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Feedback
      .addCase(createFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacksGiven.unshift(action.payload);
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Received
      .addCase(fetchFeedbacksReceived.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedbacksReceived.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacksReceived = action.payload;
      })
      .addCase(fetchFeedbacksReceived.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Given
      .addCase(fetchFeedbacksGiven.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedbacksGiven.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacksGiven = action.payload;
      })
      .addCase(fetchFeedbacksGiven.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Mark as Read
      .addCase(markFeedbackAsRead.fulfilled, (state, action) => {
        state.feedbacksReceived = state.feedbacksReceived.map((fb) =>
          fb._id === action.payload._id ? action.payload : fb
        );
      })

      // Delete Feedback
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.feedbacksGiven = state.feedbacksGiven.filter((fb) => fb._id !== action.payload);
        state.feedbacksReceived = state.feedbacksReceived.filter((fb) => fb._id !== action.payload);
      })

      // Like Feedback
      .addCase(likeFeedback.fulfilled, (state, action) => {
        state.feedbacksReceived = state.feedbacksReceived.map((fb) =>
          fb._id === action.payload._id ? action.payload : fb
        );
        state.feedbacksGiven = state.feedbacksGiven.map((fb) =>
          fb._id === action.payload._id ? action.payload : fb
        );
      })

      // Dislike Feedback
      .addCase(dislikeFeedback.fulfilled, (state, action) => {
        state.feedbacksReceived = state.feedbacksReceived.map((fb) =>
          fb._id === action.payload._id ? action.payload : fb
        );
        state.feedbacksGiven = state.feedbacksGiven.map((fb) =>
          fb._id === action.payload._id ? action.payload : fb
        );
      });
  },
});

export const { clearFeedbackState } = feedbackSlice.actions;
export default feedbackSlice.reducer;
