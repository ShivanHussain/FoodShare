import {  X, Plus } from 'lucide-react';
import { foodCategories } from '../../constants/FoodDetailsForm/foodCategories';
import { foodConditions } from '../../constants/FoodDetailsForm/foodCondition';

const FoodDetailsForm = ({ formData, onInputChange }) => {

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    onInputChange('images', [...formData.images, ...files.slice(0, 3 - formData.images.length)]);
  };

  const removeImage = (index) => {
    onInputChange('images', formData.images.filter((_, i) => i !== index));
  };

  // Get minimum date (today) and time for expiry
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().slice(0, 5);
    return { date, time };
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
        Food Details
      </h2>

      {/* Food Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Food Name*</label>
        <input
          type="text"
          value={formData.foodType}
          onChange={(e) => onInputChange('foodType', e.target.value)}
          placeholder="e.g., Chicken Biryani, Mixed Vegetables"
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 
          sm:focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-sm sm:text-base"
          required
        />
      </div>

      {/* Veg/Non-Veg Radio Buttons  */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Food Type*</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
          {/* Vegetarian Option */}
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="foodPreference"
              value="Veg"
              checked={formData.foodPreference === 'Veg'}
              onChange={(e) => onInputChange('foodPreference', e.target.value)}
              className="sr-only"
              required
            />
            <div className={`relative flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 
            transition-all duration-300 w-full ${
              formData.foodPreference === 'Veg'
                ? 'border-green-500 bg-green-50 shadow-md'
                : 'border-gray-300 hover:border-green-300 hover:bg-green-50/50'
            }`}>
              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all 
              duration-300 ${
                formData.foodPreference === 'Veg'
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-400'
              }`}>
                {formData.foodPreference === 'Veg' && (
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className={`font-medium transition-colors duration-300 text-sm sm:text-base ${
                formData.foodPreference === 'Veg' ? 'text-green-700' : 'text-gray-700'
              }`}>
                Vegetarian
              </span>
            </div>
          </label>

          {/* Non-Vegetarian Option */}
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="foodPreference"
              value="Non-Veg"
              checked={formData.foodPreference === 'Non-Veg'}
              onChange={(e) => onInputChange('foodPreference', e.target.value)}
              className="sr-only"
            />
            <div className={`relative flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 
            transition-all duration-300 w-full ${
              formData.foodPreference === 'Non-Veg'
                ? 'border-red-500 bg-red-50 shadow-md'
                : 'border-gray-300 hover:border-red-300 hover:bg-red-50/50'
            }`}>
              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-all 
              duration-300 ${
                formData.foodPreference === 'Non-Veg'
                  ? 'border-red-500 bg-red-500'
                  : 'border-gray-400'
              }`}>
                {formData.foodPreference === 'Non-Veg' && (
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className={`font-medium transition-colors duration-300 text-sm sm:text-base ${
                formData.foodPreference === 'Non-Veg' ? 'text-red-700' : 'text-gray-700'
              }`}>
                Non-Vegetarian
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Category Selection */}
      {formData.foodPreference && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category*</label>
          <select
            value={formData.category}
            onChange={(e) => onInputChange('category', e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 
            sm:focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-sm sm:text-base"
            required
          >
            <option value="">Select Category</option>
            {foodCategories[formData.foodPreference].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      )}

      {/* Food Condition */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Food Condition*
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {foodConditions.map((condition) => (
            <label key={condition.value} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="foodCondition"
                value={condition.value}
                checked={formData.foodCondition === condition.value}
                onChange={(e) => onInputChange('foodCondition', e.target.value)}
                className="sr-only"
                required
              />
              <div className={`relative flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 
              transition-all duration-300 w-full ${
                formData.foodCondition === condition.value
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50/50'
              }`}>
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center transition-all 
                duration-300 ${
                  formData.foodCondition === condition.value
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-400'
                }`}>
                  {formData.foodCondition === condition.value && (
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                    formData.foodCondition === condition.value ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {condition.label}
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Quantity, Unit & Servings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity*</label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => onInputChange('quantity', e.target.value)}
            placeholder="5"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 
            sm:focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Unit</label>
          <select
            value={formData.unit}
            onChange={(e) => onInputChange('unit', e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 
            sm:focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-sm sm:text-base"
          >
            <option value="kg">Kilograms</option>
            <option value="liters">Liters</option>
            <option value="pieces">Pieces</option>
            <option value="plates">Plates</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Servings
          </label>
          <input
            type="number"
            value={formData.servings}
            onChange={(e) => onInputChange('servings', e.target.value)}
            placeholder="10"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 
            sm:focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Expiry Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Expiry Date*
          </label>
          <input
            type="date"
            value={formData.expiryDate}
            onChange={(e) => onInputChange('expiryDate', e.target.value)}
            min={getCurrentDateTime().date}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 
            sm:focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Expiry Time
          </label>
          <input
            type="time"
            value={formData.expiryTime}
            onChange={(e) => onInputChange('expiryTime', e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 
            sm:focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-sm sm:text-base"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          placeholder="Brief description of the food, cooking method, ingredients..."
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 
          sm:focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 h-20 sm:h-24 resize-none 
          text-sm sm:text-base"
        />
      </div>

      {/* Image Upload  */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3"> 
          Food Images (Max 3)
        </label>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Food ${index + 1}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg sm:rounded-xl border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 
                  sm:h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-2 h-2 sm:w-3 sm:h-3" />
                </button>
              </div>
            ))}
            {formData.images.length < 3 && (
              <label className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl 
              flex items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all 
              duration-300">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsForm;