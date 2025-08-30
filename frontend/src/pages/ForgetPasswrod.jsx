/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Heart, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { forgotPassword, clearUserError} from '../redux/slices/userSlice';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.user);

    // Clear any existing errors when component mounts
    useEffect(() => {
        dispatch(clearUserError());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            return;
        }

        try {
            await dispatch(forgotPassword(email)).unwrap();
            setIsSubmitted(true);
            setEmail(''); // Clear email input after submission
        } catch (err) {
            console.error('Forgot password error:', err);
        }
    };

    const handleBackToLogin = () => {
        // Clear any errors before navigating
        dispatch(clearUserError());
        navigate('/login');
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
                        Forgot Password?
                    </h2>
                    <p className="text-gray-600">
                        No worries! Enter your email and we'll send you reset instructions.
                    </p>
                </div>

                {/* Success State */}
                {isSubmitted ? (
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Check Your Email
                            </h3>
                            <p className="text-gray-600 mb-6">
                                We've sent password reset instructions to your email address.
                            </p>
                            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 mb-6">
                                <p className="text-sm text-gray-700">
                                    📧 Didn't receive the email? Check your spam folder or try again in a few minutes.
                                </p>
                            </div>
                            <button
                                onClick={handleBackToLogin}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Form State */
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && !isSubmitted && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                                    <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105"
                            >
                                {loading ? (
                                    <>
                                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                                        Sending Reset Link...
                                    </>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </button>
                        </form>

                        {/* Back to Login */}
                        <div className="mt-6 text-center">
                            <Link
                                to="/login"
                                onClick={() => dispatch(clearUserError())}
                                className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors duration-200"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Login
                            </Link>
                        </div>
                    </div>
                )}

                {/* Additional Help */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Still having trouble?{' '}
                        <Link to="/contact" className="text-green-600 hover:text-green-700 font-semibold">
                            Contact Support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;