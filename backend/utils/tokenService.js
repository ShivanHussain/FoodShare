import axios from 'axios';

let cachedToken = null;
let tokenExpiry = null;
let tokenRefreshPromise = null; // Prevent multiple simultaneous token requests

export const getMapplsAccessToken = async () => {
  const clientId = process.env.MAPPLS_CLIENT_ID;
  const clientSecret = process.env.MAPPLS_CLIENT_SECRET;

  // Validate environment variables
  if (!clientId || !clientSecret) {
    throw new Error('Mappls credentials not found in environment variables');
  }

  const now = new Date();
  
  // Add 5-minute buffer before token expiry
  const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
  
  // Return cached token if still valid
  if (cachedToken && tokenExpiry && (tokenExpiry.getTime() - now.getTime()) > bufferTime) {
    return cachedToken;
  }

  // If a token refresh is already in progress, wait for it
  if (tokenRefreshPromise) {
    return await tokenRefreshPromise;
  }

  // Create the token refresh promise
  tokenRefreshPromise = (async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('grant_type', 'client_credentials');
      formData.append('client_id', clientId);
      formData.append('client_secret', clientSecret);

      const response = await axios.post(
        'https://outpost.mappls.com/api/security/oauth/token',
        formData,
        { 
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          timeout: 10000 // 10 second timeout
        }
      );

      if (!response.data?.access_token) {
        throw new Error('Invalid token response from Mappls');
      }

      cachedToken = response.data.access_token;
      
      // Set expiry time (default to 1 hour if not provided)
      const expiresIn = response.data.expires_in || 3600;
      tokenExpiry = new Date(now.getTime() + expiresIn * 1000);
      
      return cachedToken;

    } catch (error) {
      // Clear cached values on error
      cachedToken = null;
      tokenExpiry = null;
      
      if (error.response?.status === 401) {
        throw new Error('Invalid Mappls credentials - check client ID and secret');
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded for token requests');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Token request timeout');
      } else {
        throw new Error(`Failed to get Mappls token: ${error.message}`);
      }
    } finally {
      // Clear the promise so future requests can create a new one
      tokenRefreshPromise = null;
    }
  })();

  return await tokenRefreshPromise;
};

// Utility function to clear cached token (useful for testing or error recovery)
export const clearTokenCache = () => {
  cachedToken = null;
  tokenExpiry = null;
  tokenRefreshPromise = null;
};

// Check if token is still valid
export const isTokenValid = () => {
  if (!cachedToken || !tokenExpiry) return false;
  
  const now = new Date();
  const bufferTime = 5 * 60 * 1000; // 5 minutes buffer
  
  return (tokenExpiry.getTime() - now.getTime()) > bufferTime;
};

// Get token info (for debugging)
export const getTokenInfo = () => {
  return {
    hasToken: !!cachedToken,
    expiry: tokenExpiry?.toISOString(),
    isValid: isTokenValid(),
    timeRemaining: tokenExpiry ? Math.max(0, Math.floor((tokenExpiry.getTime() - new Date().getTime()) / 1000)) : 0
  };
};