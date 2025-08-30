/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Loader } from 'lucide-react';

const MAPPLS_MAP_KEY = import.meta.env.VITE_MAPPLS_MAP_KEY;

const MapDisplay = ({ selectedPickup, distance, eta, loading }) => {
  const [map, setMap] = useState(null);
  const [mapplsLoaded, setMapplsLoaded] = useState(false);
  const [showCoordinatesPopup, setShowCoordinatesPopup] = useState(false);

  useEffect(() => {
    const loadMapplsScript = () => {
      if (document.getElementById('mappls-script')) {
        setMapplsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.id = 'mappls-script';
      script.src = `https://apis.mappls.com/advancedmaps/api/${MAPPLS_MAP_KEY}/map_sdk?layer=vector&v=3.0&callback=initializeMapplsGL`;
      script.async = true;

      window.initializeMapplsGL = () => setMapplsLoaded(true);
      document.head.appendChild(script);
    };

    loadMapplsScript();
  }, []);

  useEffect(() => {
    if (selectedPickup && mapplsLoaded && !map) initializeMap();
  }, [selectedPickup, mapplsLoaded]);

  const initializeMap = () => {
    try {
      const donorLat = selectedPickup.location.coordinates[0];
      const donorLng = selectedPickup.location.coordinates[1];
      const ngoLat = selectedPickup.claimedBy.location.coordinates[0];
      const ngoLng = selectedPickup.claimedBy.location.coordinates[1];

      const centerLat = (donorLat + ngoLat) / 2;
      const centerLng = (donorLng + ngoLng) / 2;

      const donorCoordinates = [donorLng, donorLat];
      const ngoCoordinates = [ngoLng, ngoLat];
      const centerCoordinates = [centerLng, centerLat];

      const mapInstance = new window.mappls.Map('map-container', {
        center: centerCoordinates,
        zoom: 6,
        traffic: true,
        geolocation: false,
      });

      mapInstance.on('load', () => {
        // Enhanced donor marker
        const donorMarker = new window.mappls.Marker({
          map: mapInstance,
          position: donorCoordinates,
          fitbounds: false,
          icon_url: 'https://apis.mappls.com/map_v3/1.png',
          width: 35,
          height: 35,
          popupHtml: `
            <div style="padding: 12px; min-width: 200px;">
              <h4 style="margin: 0 0 8px 0; color: #2563eb; font-size: 14px; font-weight: bold;">
                PICKUP LOCATION
              </h4>
              <p style="margin: 0 0 6px 0; font-weight: 600;">${selectedPickup.contactPerson}</p>
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">${selectedPickup.pickupAddress}</p>
              ${selectedPickup.contactPhone ? `<p style="margin: 0 0 6px 0; color: #2563eb; font-size: 12px;">📞 ${selectedPickup.contactPhone}</p>` : ''}
              ${selectedPickup.foodItems ? `<p style="margin: 6px 0 0 0; font-size: 11px; color: #059669;"><strong>Items:</strong> ${selectedPickup.foodItems}</p>` : ''}
            </div>
          `,
          popupOptions: { openPopup: false },
        });

        // Enhanced NGO marker
        const ngoMarker = new window.mappls.Marker({
          map: mapInstance,
          position: ngoCoordinates,
          fitbounds: false,
          icon_url: 'https://apis.mappls.com/map_v3/2.png',
          width: 35,
          height: 35,
          popupHtml: `
            <div style="padding: 12px; min-width: 200px;">
              <h4 style="margin: 0 0 8px 0; color: #059669; font-size: 14px; font-weight: bold;">
                 DESTINATION (NGO)
              </h4>
              <p style="margin: 0 0 6px 0; font-weight: 600;">${selectedPickup.claimedBy.organizationName}</p>
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">${selectedPickup.claimedBy.address}</p>
              ${selectedPickup.claimedBy.phone ? `<p style="margin: 0 0 6px 0; color: #059669; font-size: 12px;">📞 ${selectedPickup.claimedBy.phone}</p>` : ''}
              ${selectedPickup.claimedBy.contactPerson ? `<p style="margin: 6px 0 0 0; font-size: 11px; color: #2563eb;"><strong>Contact:</strong> ${selectedPickup.claimedBy.contactPerson}</p>` : ''}
            </div>
          `,
          popupOptions: { openPopup: false },
        });

        // Show route directions with a small delay
        setTimeout(() => {
          showDirections(mapInstance, donorCoordinates, ngoCoordinates);
        }, 500);

        // Fit bounds to show both markers with better padding
        setTimeout(() => {
          try {
            const bounds = new window.mappls.LatLngBounds();
            bounds.extend(donorCoordinates);
            bounds.extend(ngoCoordinates);
            mapInstance.fitBounds(bounds);
            mapInstance.panTo({ lat: donorCoordinates[0], lng: donorCoordinates[1] });
          } catch (boundsError) {
            console.error('Error fitting bounds:', boundsError);
          }
        }, 1000);
      });

      mapInstance.on('error', (error) => {
        console.error('Map error:', error);
      });

      setMap(mapInstance);
    } catch (err) {
      console.error('Map Init Error:', err);
    }
  };

  const showDirections = (mapInstance, start, end) => {
    try {
      if (window.mappls.Direction) {
        new window.mappls.Direction({
          map: mapInstance,
          start: start,
          end: end,
          strokeColor: '#059669',
          strokeOpacity: 0.8,
          strokeWeight: 4,
        });
      } else if (window.mappls.route) {
        window.mappls.route({
          map: mapInstance,
          start: start,
          end: end,
          strokeColor: '#059669',
          strokeOpacity: 0.8,
          strokeWeight: 4,
        });
      } else if (window.mappls.Polyline) {
        new window.mappls.Polyline({
          map: mapInstance,
          paths: [start, end],
          strokeColor: '#059669',
          strokeOpacity: 0.8,
          strokeWeight: 4,
          fitbounds: false,
        });
      } else {
        console.warn('No direction service available, showing markers only');
      }
    } catch (error) {
      console.error('Direction Error:', error);
      try {
        if (window.mappls.Polyline) {
          new window.mappls.Polyline({
            map: mapInstance,
            paths: [start, end],
            strokeColor: '#059669',
            strokeOpacity: 0.6,
            strokeWeight: 3,
            fitbounds: false,
          });
        }
      } catch (fallbackError) {
        console.error('Fallback polyline error:', fallbackError);
      }
    }
  };

  const CoordinatesPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Location Coordinates</h3>
            <button
              onClick={() => setShowCoordinatesPopup(false)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            {/* Donor Coordinates */}
            <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
              <div className="flex items-center mb-2">
                <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                <h4 className="font-semibold text-blue-800 text-sm sm:text-base">Pickup Location</h4>
              </div>
              <p className="text-sm font-medium text-gray-800 mb-2">{selectedPickup.contactPerson}</p>
              <div className="space-y-1 text-xs sm:text-sm">
                <p><span className="font-medium">Latitude:</span> {selectedPickup.location.coordinates[0]}</p>
                <p><span className="font-medium">Longitude:</span> {selectedPickup.location.coordinates[1]}</p>
                <p className="text-xs text-gray-600 mt-2">{selectedPickup.pickupAddress}</p>
              </div>
            </div>

            {/* NGO Coordinates */}
            <div className="bg-green-50 rounded-lg p-3 sm:p-4">
              <div className="flex items-center mb-2">
                <MapPin className="w-4 h-4 text-green-600 mr-2" />
                <h4 className="font-semibold text-green-800 text-sm sm:text-base">NGO Destination</h4>
              </div>
              <p className="text-sm font-medium text-gray-800 mb-2">{selectedPickup.claimedBy.organizationName}</p>
              <div className="space-y-1 text-xs sm:text-sm">
                <p><span className="font-medium">Latitude:</span> {selectedPickup.claimedBy.location.coordinates[0]}</p>
                <p><span className="font-medium">Longitude:</span> {selectedPickup.claimedBy.location.coordinates[1]}</p>
                <p className="text-xs text-gray-600 mt-2">{selectedPickup.claimedBy.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const displayDistance = loading ? 'Loading...' : (distance || 'N/A');
  const displayETA = loading ? 'Loading...' : (eta || 'N/A');

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden mb-4 sm:mb-6">
      {/* Map Container */}
      <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200 relative">
        {mapplsLoaded ? (
          <div id="map-container" className="w-full h-full"></div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Loader className="w-6 h-6 sm:w-8 sm:h-8 animate-spin mx-auto mb-2 text-blue-600" />
              <p className="text-gray-600 text-sm sm:text-base">Loading map...</p>
            </div>
          </div>
        )}
        
        {/* Coordinates Button */}
        <button
          onClick={() => setShowCoordinatesPopup(true)}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center px-2 sm:px-3 py-1 sm:py-2 
          bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-xs sm:text-sm z-10"
        >
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span className="hidden sm:inline">Coordinates</span>
          <span className="sm:hidden">GPS</span>
        </button>
      </div>

      {/* Distance/ETA Display */}
      <div className="p-3 sm:p-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="flex justify-between items-center text-center">
          <div className="flex-1">
            <div className="flex items-center justify-center mb-1">
              <Navigation className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <p className="text-xs sm:text-sm opacity-90">Distance</p>
            </div>
            <p className="text-lg sm:text-xl font-bold">{displayDistance}</p>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-center mb-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <p className="text-xs sm:text-sm opacity-90">ETA</p>
            </div>
            <p className="text-lg sm:text-xl font-bold">{displayETA}</p>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-center mb-1">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <p className="text-xs sm:text-sm opacity-90">To NGO</p>
            </div>
            <p className="text-sm sm:text-lg font-bold text-center max-w-[100px] sm:max-w-[120px] mx-auto truncate">
              {selectedPickup.claimedBy.organizationName}
            </p>
          </div>
        </div>
      </div>

      {/* Coordinates Popup */}
      {showCoordinatesPopup && <CoordinatesPopup />}
    </div>
  );
};

export default MapDisplay;