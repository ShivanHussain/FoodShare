

/**
 * Enhanced geocoding with better error handling
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<string>} - Formatted address string
 */
export const getAddressFromCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
      {
        method: 'GET',
        headers: {
          'User-Agent': 'FoodDonationApp/1.0 (contact@example.com)'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.display_name) {
      return data.display_name;
    } else {
      return `Location: ${lat.toFixed(6)}, ${lon.toFixed(6)}`;
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    return `Coordinates: ${lat.toFixed(6)}, ${lon.toFixed(6)}`;
  }
};

/**
 * Promisified getCurrentPosition
 * @param {object} options - Geolocation options
 * @returns {Promise<Position>} - Position object
 */
export const getCurrentPositionPromise = (options) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

/**
 * @param {Function} onSuccess - Callback for successful location retrieval
 * @param {Function} onError - Callback for error handling
 * @param {Function} onLoading - Callback for loading state changes
 * @returns {Promise<void>}
 */
export const getCurrentLocation = async (onSuccess, onError, onLoading) => {
  onLoading(true);
  onError('');

  // Check if geolocation is supported
  if (!navigator.geolocation) {
    const error = 'Geolocation is not supported by your browser';
    onError(error);
    onLoading(false);
    return;
  }

  // Check for secure connection (HTTPS required for geolocation)
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    const error = 'Location services require a secure connection (HTTPS)';
    onError(error);
    onLoading(false);
    return;
  }

  // Multiple strategies for better success rate
  const strategies = [
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    },
    {
      enableHighAccuracy: false,
      timeout: 20000,
      maximumAge: 300000
    },
    {
      enableHighAccuracy: false,
      timeout: 30000,
      maximumAge: 600000
    }
  ];

  // Try each strategy until one succeeds
  for (let i = 0; i < strategies.length; i++) {
    try {
      const position = await getCurrentPositionPromise(strategies[i]);
      const { latitude, longitude, accuracy } = position.coords;
      const address = await getAddressFromCoords(latitude, longitude);

      onSuccess(address, { latitude, longitude, accuracy });
      onError('');
      onLoading(false);
      return;

    } catch (error) {
      // If this is the last strategy, handle the error
      if (i === strategies.length - 1) {
        let errorMessage = '';
        switch (error.code) {
          case 1:
            errorMessage = 'Location access denied. Please allow location permissions in your browser settings and try again.';
            break;
          case 2:
            errorMessage = 'Location unavailable. Please check: 1) GPS is enabled, 2) Location services are on, 3) You\'re not in an area with poor signal.';
            break;
          case 3:
            errorMessage = 'Location request timed out. Please try again or check your internet connection.';
            break;
          default:
            errorMessage = 'Unable to get location. Please enter your address manually.';
            break;
        }
        onError(errorMessage);
        onLoading(false);
      }
    }
  }
};

/**
 * Check location service availability and security
 * @returns {object} - Status object with availability info
 */
export const checkLocationAvailability = () => {
  return {
    isSupported: !!navigator.geolocation,
    isSecure: location.protocol === 'https:' || location.hostname === 'localhost',
    canUseLocation: !!navigator.geolocation && (location.protocol === 'https:' || location.hostname === 'localhost')
  };
};