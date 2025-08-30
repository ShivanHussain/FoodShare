/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import slices
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice'; 
import donationReducer from './slices/donationSlice';
import notificationReducer from './slices/notificationSlice';
import analyticsReducer from './slices/donorAnalyticsSlice';
import nearbyNGOsReducer from './slices/pickupOtpSlice';
import mapplsSliceReducer from './slices/mapplsTokenSlice';
import contactSupportReducer from './slices/contactSlice';
import ngoSliceReducer from './slices/ngoSlice';
import ngoImpactReducer from './slices/ngoAnalyticsSlice';
import feedbackReducer from './slices/feedbackSlice';
import newsletterReducer from './slices/newsletterSlice';
import adminReducer from './slices/adminSlice';
import adminAnalyticsReducer from './slices/adminAnalyticsSlice';

// Auth persist config - persist both userInfo and token
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['userInfo', 'token', 'isAuthenticated'], // Include token and auth status
};

// Custom middleware to handle token expiry
const tokenExpiryMiddleware = (store) => (next) => (action) => {
  if (action.type.includes('rejected')) {
    const payload = action.payload;

    // Normalize payload to a string for checking
    let message = '';
    if (typeof payload === 'string') {
      message = payload.toLowerCase();
    } else if (typeof payload === 'object' && payload !== null) {
      message = (payload.message || payload.error || '').toLowerCase();
    }

    if (
      message.includes('token') ||
      message.includes('expired') ||
      message.includes('unauthorized')
    ) {
      // Clear persisted data
      localStorage.removeItem('token');
    }
  }

  return next(action);
};

// Final store setup
const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer), // persisted
    user: userReducer, 
    donation: donationReducer,
    notifications: notificationReducer,
    analytics: analyticsReducer,
    nearbyNGOs: nearbyNGOsReducer,
    mappls: mapplsSliceReducer,
    contactSupport: contactSupportReducer,
    ngo: ngoSliceReducer,
    ngoImpact: ngoImpactReducer,
    feedback: feedbackReducer,
    newsletter: newsletterReducer,
    admin: adminReducer,
    adminAnalytics: adminAnalyticsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(tokenExpiryMiddleware),
});

export const persistor = persistStore(store);
export default store;
