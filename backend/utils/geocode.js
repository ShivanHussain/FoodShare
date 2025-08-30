// utils/geocode.js
import axios from 'axios';

export const getCoordinatesFromAddress = async (address) => {
  try {
    const apiKey = process.env.OPENCAGE_API_KEY;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${apiKey}`;

    const { data } = await axios.get(url);

    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
