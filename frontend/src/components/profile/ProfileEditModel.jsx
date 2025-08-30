import { X, UserCircle, Loader, Camera, Upload, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';

export const EditModal = ({ isEditing, setIsEditing, formData, handleInputChange, handleSave }) => {
    const { loading } = useSelector((state) => state.user);
    const { userInfo } = useSelector((state) => state.auth);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    // Set initial image preview when modal opens
    useEffect(() => {
        if (isEditing) {
            // Set current user's avatar URL as default preview
            const currentImage = userInfo?.avatar?.url || null;
            setImagePreview(currentImage);
        }
    }, [isEditing, userInfo?.avatar?.url]);

    if (!isEditing) return null;

    const handleSaveClick = async () => {
        try {
            await handleSave();
        } catch (error) {
            console.error("Save failed:", error);
        }
    };

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            // Call the parent's image handler
            handleInputChange({
                target: {
                    name: 'profileImage',
                    files: [file]
                }
            });
        }
    };

    const handleRemoveImage = () => {
        // Reset to original user avatar URL instead of null
        const originalImage = userInfo?.avatar?.url || null;
        setImagePreview(originalImage);
        
        handleInputChange({
            target: {
                name: 'profileImage',
                value: 'RESET_TO_ORIGINAL' // Special value to indicate reset
            }
        });
        
        // Clear file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <UserCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
                            <p className="text-sm text-gray-600">Update your information</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        disabled={loading}
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 space-y-6">
                    {/* Profile Image Section */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-700">Profile Image</label>
                        
                        {/* Image Preview */}
                        <div className="flex items-center justify-center">
                            <div className="relative group">
                                {imagePreview ? (
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Profile preview"
                                            className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                                        />
                                        <button
                                            onClick={handleRemoveImage}
                                            disabled={loading}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300">
                                        <UserCircle className="w-12 h-12 text-gray-400" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Image Upload Buttons */}
                        <div className="flex gap-2 justify-center">
                            <button
                                type="button"
                                onClick={triggerFileInput}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Upload className="w-4 h-4" />
                                Change Image
                            </button>
                            
                            {/* Only show reset button if user has changed from original */}
                            {imagePreview && imagePreview !== userInfo?.avatar?.url && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Reset
                                </button>
                            )}
                        </div>

                        {/* Hidden File Input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                            disabled={loading}
                        />

                        <p className="text-xs text-gray-500 text-center">
                            Supported formats: JPG, PNG, GIF (Max 5MB)
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleInputChange}
                            disabled={loading}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            disabled
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 opacity-60"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleInputChange}
                            disabled={loading}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address || ''}
                            onChange={handleInputChange}
                            disabled={loading}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Enter your address"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={() => setIsEditing(false)}
                            disabled={loading}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveClick}
                            disabled={loading}
                            className="flex items-center justify-center flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-green-600 disabled:hover:to-emerald-600 disabled:transform-none"
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};