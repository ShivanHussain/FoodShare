import axios from 'axios';
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { getMapplsAccessToken } from "../utils/tokenService.js";


// @desc  GET /api/v1/distance
export const getMapplsDistanceAndETA = catchAsyncErrors(async (req, res, next) => {
  const { from, to } = req.query;

  // Validation
  if (!from || !to) {
    return next(new ErrorHandler("Both from and to coordinates are required", 400));
  }

  const coordinateRegex = /^-?\d+\.?\d*,-?\d+\.?\d*$/;
  if (!coordinateRegex.test(from) || !coordinateRegex.test(to)) {
    return next(new ErrorHandler("Invalid coordinate format. Expected: 'lat,lng'", 400));
  }

  const validateCoordinatePair = (coordStr) => {
    const [lat, lng] = coordStr.split(",").map(Number);
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  };

  if (!validateCoordinatePair(from) || !validateCoordinatePair(to)) {
    return next(new ErrorHandler("Coordinates are out of valid range", 400));
  }

  const token = await getMapplsAccessToken();
  if (!token) {
    return next(new ErrorHandler("Failed to retrieve Mappls access token", 500));
  }

  const [fromLat, fromLng] = from.split(",");
  const [toLat, toLng] = to.split(",");

  const apiUrl = `https://apis.mappls.com/advancedmaps/v1/${token}/route_eta/driving/${fromLat},${fromLng};${toLat},${toLng}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 10000
    });
    const route = response.data?.routes?.[0];
    if (!route) {
      return next(new ErrorHandler("No route data received from Mappls", 404));
    }

    const distanceKm = (route.distance / 1000).toFixed(2);
    const durationMins = Math.round(route.duration / 60);

    const formattedDistance = `${distanceKm} km`;
    const formattedETA = durationMins < 60 
      ? `${durationMins} mins` 
      : `${Math.floor(durationMins / 60)}h ${durationMins % 60}m`;

    res.status(200).json({
      success: true,
      data: {
        distance: formattedDistance,
        eta: formattedETA,
        raw: {
          distanceMeters: route.distance,
          durationSeconds: route.duration,
          distanceKm: parseFloat(distanceKm),
          durationMinutes: durationMins
        },
        coordinates: {
          from,
          to
        }
      }
    });

  } catch (error) {
    return next(new ErrorHandler("Failed to fetch distance/ETA from Mappls API", error.response?.status || 500));
  }
});


// @desc GET /api/v1/token - Enhanced security
export const getToken = catchAsyncErrors(async (req, res, next) => {
  try {
    
    const token = await getMapplsAccessToken();
    
    if (!token) {
      return next(new ErrorHandler('Failed to retrieve Mappls access token', 500));
    }
    
    res.status(200).json({ 
      success: true,
      access_token: token,
      expires_in: 3600 // Usually 1 hour for Mappls tokens
    });
    
  } catch (error) {
    return next(new ErrorHandler('Failed to retrieve access token', 500));
  }
});

// @desc Utility function for coordinate validation
export const validateCoordinates = (coord) => {
  try {
    const [lat, lng] = coord.split(',').map(Number);
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  } catch {
    return false;
  }
};

// @desc Health check endpoint for Mappls API
export const checkMapplsAPIHealth = catchAsyncErrors(async (req, res, next) => {
  try {
    const token = await getMapplsAccessToken();
    
    if (!token) {
      return res.status(503).json({
        success: false,
        message: 'Mappls API authentication failed',
        status: 'unhealthy'
      });
    }
    
    // Test with a simple distance calculation (Delhi to Mumbai)
    const testResponse = await axios.get(
      'https://apis.mappls.com/advancedmaps/v1/matrix/driving/28.6139,77.2090;19.0760,72.8777',
      {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      }
    );
    
    if (testResponse.data?.results?.[0]?.elements?.[0]?.status === 'OK') {
      res.status(200).json({
        success: true,
        message: 'Mappls API is working correctly',
        status: 'healthy'
      });
    } else {
      res.status(503).json({
        success: false,
        message: 'Mappls API returned invalid response',
        status: 'unhealthy'
      });
    }
    
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Mappls API health check failed',
      status: 'unhealthy',
      error: error.message
    });
  }
});