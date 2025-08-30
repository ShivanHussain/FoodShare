/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { fetchDistanceETA, getAccessToken, selectDistanceData } from '../redux/slices/mapplsTokenSlice';
import { useSelector, useDispatch } from 'react-redux';
import MapDisplay from '../subComponents/NearbyNGO/MapDisplay'
import PickupInfo from '../subComponents/NearbyNGO/PickupInfo';

const MapComponent = ({ selectedPickup, onBack }) => {
  const dispatch = useDispatch();
  //Safe selector with fallback values
  const distanceData = useSelector((state) => {
    try {
      return selectDistanceData(state);
    } catch (error) {
      const mapplsState = state.mappls || {};
      return {
        distance: mapplsState.distance || null,
        eta: mapplsState.eta || null,
        loading: mapplsState.isLoading || mapplsState.loading || false
      };
    }
  });

  const { distance, eta, loading } = distanceData;
  const mapplsState = useSelector((state) => {
    const mappls = state.mappls || {};
    return {
      distance: mappls.distance || null,
      eta: mappls.eta || null,
      loading: mappls.isLoading || mappls.loading || false,
      error: mappls.error || null
    };
  });

  useEffect(() => {
  }, [mapplsState, distance, eta, loading]);

  useEffect(() => {
    dispatch(getAccessToken());
    const donor = `${selectedPickup.location.coordinates[0]},${selectedPickup.location.coordinates[1]}`;
    const ngo = `${selectedPickup.claimedBy.location.coordinates[0]},${selectedPickup.claimedBy.location.coordinates[1]}`;
    dispatch(fetchDistanceETA({ from: donor, to: ngo }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="flex items-center text-gray-600 font-bold hover:text-green-600 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h2 className="text-xl font-bold text-gray-800">Route to {selectedPickup.claimedBy.organizationName}</h2>
          <div></div> 
        </div>
      </div>

      <div className="p-4">
        {/* Map Display Component */}
        <MapDisplay 
          selectedPickup={selectedPickup}
          distance={distance}
          eta={eta}
          loading={loading}
        />
        
        {/* Pickup Information Component */}
        <PickupInfo 
          selectedPickup={selectedPickup}
        />
      </div>
    </div>
  );
};

export default MapComponent;