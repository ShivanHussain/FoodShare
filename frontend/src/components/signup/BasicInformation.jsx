import React, { useState } from 'react';
import { User, Mail, Phone, Camera, Upload, X, FileText, UserCheck } from 'lucide-react';

const BasicInformation = ({ 
  formData, 
  onInputChange, 
  onNext, 
  onPrev,
  onAvatarUpload,
  onRemoveAvatar 
}) => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const isNGO = formData.role === 'ngo';

  // Handle avatar file upload
  const handleAvatarUpload = (file) => {
    if (file) {
      onAvatarUpload(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleAvatarUpload(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleAvatarUpload(e.dataTransfer.files[0]);
    }
  };

  const removeAvatar = () => {
    onRemoveAvatar();
    setAvatarPreview(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {isNGO ? 'Organization Information' : 'Basic Information'}
        </h3>
        <p className="text-gray-600">
          {isNGO ? 'Tell us about your organization' : 'Tell us about yourself'}
        </p>
      </div>

      {/* Avatar Upload Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          {avatarPreview ? (
            <div className="relative">
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-green-200"
              />
              <button
                type="button"
                onClick={removeAvatar}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-gray-200">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Upload Area */}
        <div className="mt-4 w-full max-w-sm">
          <div
            className={`border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 ${
              dragActive
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Drop {isNGO ? 'your organization logo' : 'your avatar'} here or
            </p>
            <label className="cursor-pointer">
              <span className="text-green-600 hover:text-green-700 font-semibold">
                browse files
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Name Field */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          name="name"
          placeholder={isNGO ? "Contact Person Name" : "Full Name"}
          value={formData.name}
          onChange={onInputChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          required
        />
      </div>

      {/* Email Field */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={onInputChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          required
        />
      </div>

      {/* Phone Field */}
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={onInputChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          required
        />
      </div>

      {/* NGO Specific Fields */}
      {isNGO && (
        <>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="registrationNumber"
              placeholder="Registration Number"
              value={formData.registrationNumber}
              onChange={onInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div className="relative">
            <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="organizationName"
              placeholder="Organization Name"
              value={formData.organizationName}
              onChange={onInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
        </>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BasicInformation;