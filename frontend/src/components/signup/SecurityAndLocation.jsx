/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Lock, MapPin, Crosshair, Loader } from 'lucide-react';
import { getCurrentLocation, checkLocationAvailability } from '../../utils/locationService';

const SecurityAndLocation = ({
    formData,
    onInputChange,
    onPrev,
    onSubmit,
    loading,
    agreeToTerms,
    onTermsChange,
    onShowTerms,
    onShowPrivacy
}) => {
    const [locationLoading, setLocationLoading] = useState(false);
    const [locationError, setLocationError] = useState('');
    const [locationAvailable, setLocationAvailable] = useState(
        checkLocationAvailability().canUseLocation
    );

    const isNGO = formData.role === 'ngo';

    const handleLocationClick = async () => {
        await getCurrentLocation(
            (address, coords) => {
                // Update form data with the retrieved address
                onInputChange({
                    target: {
                        name: 'address',
                        value: address
                    }
                });
                setLocationError('');
            },
            (error) => {
                setLocationError(error);
            },
            (loading) => {
                setLocationLoading(loading);
            }
        );
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Security & Location</h3>
                <p className="text-gray-600">Secure your account and add location</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={onInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        required
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={onInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        required
                    />
                </div>
            </div>

            {/* Address Field with Location Button */}
            <div className="space-y-2">
                <div className="relative">
                    <MapPin className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                    <textarea
                        name="address"
                        placeholder={isNGO ? "Organization Address With Pincode" : "Complete Address with Pincode"}
                        value={formData.address}
                        onChange={onInputChange}
                        rows="3"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                        required
                    />
                </div>


                {/* fetch current location button */}
                {locationAvailable && (
                    <button
                        type="button"
                        onClick={handleLocationClick}
                        disabled={locationLoading}
                        className="flex items-center justify-center w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 disabled:cursor-not-allowed"
                    >
                        {locationLoading ? (
                            <>
                                <Loader className="w-4 h-4 mr-2 animate-spin" />
                                Getting location...
                            </>
                        ) : (
                            <>
                                <Crosshair className="w-4 h-4 mr-2" />
                                Use my current location
                            </>
                        )}
                    </button>
                )}
                {/* Location Error Display */}
                {locationError && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-700 px-3 py-2 rounded-lg text-sm">
                        <p className="font-semibold">Location Error:</p>
                        <p>{locationError}</p>
                    </div>
                )}

                {/* Location Not Available Message */}
                {!locationAvailable && (
                    <div className="bg-gray-50 border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm">
                        <p className="text-xs">
                            📍 Location services are not available. This may be because:
                            <br />• You're not using a secure connection (HTTPS)
                            <br />• Your browser doesn't support geolocation
                            <br />Please enter your address manually.
                        </p>
                    </div>
                )}
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => onTermsChange(e.target.checked)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    I agree to the{' '}
                    <span
                        className="text-green-600 hover:underline cursor-pointer"
                        onClick={onShowTerms}
                    >
                        Terms and Conditions
                    </span>{' '}
                    and{' '}
                    <span
                        className="text-green-600 hover:underline cursor-pointer"
                        onClick={onShowPrivacy}
                    >
                        Privacy Policy
                    </span>
                </label>
            </div>

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={onPrev}
                    className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                    Back
                </button>
                {agreeToTerms && (
                    <button
                        type="button"
                        onClick={onSubmit}
                        disabled={loading}
                        className="flex items-center justify-center flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 disabled:cursor-not-allowed disabled:hover:from-green-600 disabled:hover:to-emerald-600 disabled:transform-none"
                    >
                        {loading ? (
                            <>
                                <Loader className="w-4 h-4 mr-2 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            `Create ${isNGO ? 'NGO' : 'User'} Account`
                        )}
                    </button>
                )}

            </div>
        </div>
    );
};

export default SecurityAndLocation;