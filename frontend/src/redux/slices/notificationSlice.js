
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = 'http://localhost:4000/api/v1/notifications'

//fetchNotifications thunk
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/my`, {
        withCredentials: true,
      });
      return res.data.notifications || res.data.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

//getNgoNotificationsWithDetails thunk 
export const fetchNgoNotificationsWithDetails = createAsyncThunk(
  'notifications/fetchNgoNotificationsWithDetails',
  async ({ page = 1, limit = 9, search = '', status = 'all'}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/ngo/details`, {
        params: { page, limit, search, status,},
        withCredentials: true
      });

      return {
        notificationsdata: res.data.notifications,
        page: res.data.page,
        limit: res.data.limit,
        total: res.data.total,
        unreadCount: res.data.unreadCount
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// markNotificationRead thunk 
export const markNotificationRead = createAsyncThunk(
  'notifications/markNotificationRead',
  async ({ notificationId, statusValue }, { rejectWithValue }) => {
    try {
      await axios.patch(
        `${BASE_URL}/${notificationId}/read`,
        { statusValue },
        { withCredentials: true }
      );
      return notificationId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Slice
const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    notificationsdata: [],
    loading: false,
    error: null,
    total: 0,
    unreadCount: 0,
    page: 1,
    limit: 9,
  },
  reducers: {
    addNotification(state, action) {
      state.notifications.unshift(action.payload);
    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter(
        (n) => n._id !== action.payload
      );
    },
    clearNotifications(state) {
      state.notifications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload || [];
        state.error = null;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.notifications = [];
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter(
          (n) => n._id !== action.payload
        );
      })
      // Add NGO Notifications with details
      .addCase(fetchNgoNotificationsWithDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNgoNotificationsWithDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.notificationsdata = action.payload.notificationsdata;
        state.total = action.payload.total;
        state.unreadCount = action.payload.unreadCount;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.error = null;
      })
      .addCase(fetchNgoNotificationsWithDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
