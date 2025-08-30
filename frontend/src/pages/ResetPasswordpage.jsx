import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Heart, CheckCircle, AlertCircle, Loader, ArrowLeft } from 'lucide-react';
import { resetPassword } from '../redux/slices/userSlice'; 
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {
    const { token } = useParams(); // Get token from URL params
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Get state from Redux store
    const { loading, error, success, message } = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [touched, setTouched] = useState({}); 

    useEffect(() => {
        
        if (success && isSubmitted) {
            toast.success("Password reset successfully! Redirecting to login...");
            
            // Add a small delay before navigation to ensure the success state is shown
            const redirectTimer = setTimeout(() =>{
                navigate('/login', { replace: true });
            }, 2000); // 2 second delay

            // Cleanup timer
            return () => clearTimeout(redirectTimer);
        }
    }, [success, message, navigate, isSubmitted]);

    useEffect(() => {
        const errors = {};
        
        if (touched.newPassword && formData.newPassword.length > 0) {
            if (formData.newPassword.length < 6) {
                errors.newPassword = 'Password must be at least 6 characters';
            }
        }

        if (touched.confirmPassword && formData.confirmPassword.length > 0) {
            if (formData.newPassword !== formData.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }
        }

        setValidationErrors(errors);
    }, [formData.newPassword, formData.confirmPassword, touched]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // First check if form is valid without showing errors
        const tempErrors = {};
        
        if (!formData.newPassword) {
            tempErrors.newPassword = 'New password is required';
        } else if (formData.newPassword.length < 6) {
            tempErrors.newPassword = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            tempErrors.confirmPassword = 'Please confirm your new password';
        } else if (formData.newPassword !== formData.confirmPassword) {
            tempErrors.confirmPassword = 'Passwords do not match';
        }

        // If there are errors, show them and return
        if (Object.keys(tempErrors).length > 0) {
            setValidationErrors(tempErrors);
            setTouched({ newPassword: true, confirmPassword: true });
            return;
        }

        if (!token) {
            toast.error('Invalid reset token. Please request a new password reset.');
            return;
        }

        try {
            setIsSubmitted(true); 
            await dispatch(resetPassword({
                token,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            })).unwrap();
            setFormData({ newPassword: '', confirmPassword: '' });
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 2000);
            
        } catch (error) {
            console.error('Reset password failed:', error); 
            setIsSubmitted(false);
        }
    };

    const handleGoToLogin = () => {
        navigate('/login', { replace: true });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center items-center mb-6">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full shadow-lg">
                            <Heart className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Reset Password
                    </h2>
                    <p className="text-gray-600">
                        Enter your new password to regain access to your account.
                    </p>
                </div>

                {/* Success State */}
                {isSubmitted && success ? (
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Password Reset Successfully!
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Your password has been updated successfully. You will be redirected to login automatically in a few seconds.
                            </p>
                            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 mb-6">
                                <p className="text-sm text-gray-700">
                                    Your account is now secure with the new password.
                                </p>
                            </div>
                            
                            {/* Manual login button */}
                            <button
                                onClick={handleGoToLogin}
                                className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105"
                            >
                                Go to Login Now
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Form State */
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                                    <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Token Missing Error */}
                            {!token && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                                    <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                                    <p className="text-red-700 text-sm">Invalid reset link. Please request a new password reset.</p>
                                </div>
                            )}

                            {/* New Password Input */}
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="newPassword"
                                        name="newPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        disabled={loading || !token}
                                        className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                                            validationErrors.newPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loading || !token}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                                {validationErrors.newPassword && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {validationErrors.newPassword}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        disabled={loading || !token}
                                        className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                                            validationErrors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={loading || !token}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                                {validationErrors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {validationErrors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            {/* Password Requirements */}
                            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4">
                                <p className="text-sm text-gray-700 font-semibold mb-2">Password Requirements:</p>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    <li className={`flex items-center ${formData.newPassword.length >= 6 ? 'text-green-600' : ''}`}>
                                        <span className="mr-2">{formData.newPassword.length >= 6 ? '✓' : '•'}</span>
                                        At least 6 characters long
                                    </li>
                                    <li className={`flex items-center ${formData.newPassword && formData.confirmPassword && formData.newPassword === formData.confirmPassword ? 'text-green-600' : ''}`}>
                                        <span className="mr-2">{formData.newPassword && formData.confirmPassword && formData.newPassword === formData.confirmPassword ? '✓' : '•'}</span>
                                        Must match the confirmation password
                                    </li>
                                </ul>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={loading || Object.keys(validationErrors).length > 0 || !token || !formData.newPassword || !formData.confirmPassword}
                                className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <>
                                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                                        Resetting Password...
                                    </>
                                ) : (
                                    'Reset Password'
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;