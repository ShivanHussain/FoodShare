import axios from 'axios';
import store from '../redux/store';
import { handleTokenExpiry } from '../redux/slices/authSlice';

// Create axios instance
const api = axios.create({
  withCredentials: true,
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check for token expiry/invalid token errors
    if (error.response?.status === 401 || 
        error.response?.data?.message?.toLowerCase().includes('token') ||
        error.response?.data?.message?.toLowerCase().includes('expired') ||
        error.response?.data?.message?.toLowerCase().includes('invalid') ||
        error.response?.data?.message?.toLowerCase().includes('unauthorized')) {
      
      // Dispatch token expiry action
      store.dispatch(handleTokenExpiry());
      
      //Redirect to login page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;