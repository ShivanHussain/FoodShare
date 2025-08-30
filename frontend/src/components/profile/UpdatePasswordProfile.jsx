import { useState } from "react";
import { X, Lock, Eye, EyeOff, Settings, Loader} from 'lucide-react';
import { useSelector } from 'react-redux';
export const SettingsModal = ({ isOpen, setIsOpen, onPasswordUpdate }) => {

    const { loading } = useSelector((state) => state.user);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!passwordData.currentPassword) {
            newErrors.currentPassword = 'Current password is required';
        }

        if (!passwordData.newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (passwordData.newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters';
        }

        if (!passwordData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (passwordData.newPassword !== passwordData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onPasswordUpdate(passwordData);
        }
    };

    const resetForm = () => {
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setErrors({});
        setShowPasswords({
            current: false,
            new: false,
            confirm: false
        });
    };

    const handleClose = () => {
        resetForm();
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Settings className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
                            <p className="text-sm text-gray-600">Update your password</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Current Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Current Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                <Lock className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type={showPasswords.current ? 'text' : 'password'}
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.currentPassword ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                placeholder="Enter current password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('current')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPasswords.current ? (
                                    <EyeOff className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <Eye className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <p className="text-sm text-red-600">{errors.currentPassword}</p>
                        )}
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">New Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                <Lock className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type={showPasswords.new ? 'text' : 'password'}
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.newPassword ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('new')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPasswords.new ? (
                                    <EyeOff className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <Eye className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className="text-sm text-red-600">{errors.newPassword}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                <Lock className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type={showPasswords.confirm ? 'text' : 'password'}
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                placeholder="Confirm new password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirm')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPasswords.confirm ? (
                                    <EyeOff className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <Eye className="w-5 h-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Password Strength Indicator */}
                    {passwordData.newPassword && (
                        <div className="space-y-2">
                            <div className="text-sm text-gray-600">Password Strength:</div>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((level) => (
                                    <div
                                        key={level}
                                        className={`h-2 flex-1 rounded-full transition-colors ${passwordData.newPassword.length >= level * 2
                                            ? level <= 2
                                                ? 'bg-red-400'
                                                : level === 3
                                                    ? 'bg-yellow-400'
                                                    : 'bg-green-400'
                                            : 'bg-gray-200'
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="text-xs text-gray-500">
                                {passwordData.newPassword.length < 6 && 'Too short'}
                                {passwordData.newPassword.length >= 6 && passwordData.newPassword.length < 8 && 'Weak'}
                                {passwordData.newPassword.length >= 8 && passwordData.newPassword.length < 12 && 'Good'}
                                {passwordData.newPassword.length >= 12 && 'Strong'}
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-green-600 disabled:hover:to-emerald-600 disabled:transform-none"
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Update Password'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};