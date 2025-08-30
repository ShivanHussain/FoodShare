// models/Donation.js
import mongoose, { Schema, model } from 'mongoose';

const donationSchema = new Schema({
  foodType: {
    type: String,
    required: [true, "Food Type is required"],
    trim: true
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ['Fresh Fruits', 'Fresh Vegetables', 'Dairy Products', 'Bakery Items (Veg)', 'Packaged Vegetarian Food', 'Beverages', 'Cooked Vegetarian Meals',
      'Sweets & Desserts (Veg)', 'Grains & Cereals', 'Pulses & Legumes', 'Vegan Dishes', 'Other Vegetarian','Cooked Non-Vegetarian Meals', 
      'Chicken Dishes', 'Mutton/Lamb Dishes', 'Fish & Seafood', 'Egg Dishes', 'Mixed Veg & Non-Veg', 'Bakery Items (Non-Veg)', 
      'Packaged Non-Vegetarian Food', 'Biryani & Rice Dishes', 'Curry & Gravy Items', 'Grilled/Roasted Items', 'Other Non-Vegetarian']
  },
  foodPreference: {
    type: String,
    required: [true, "Foodpreference is required"]
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: 0
  },
  unit: {
    type: String,
    enum: ['kg', 'liters', 'pieces', 'plates', 'other'],
    default: 'kg'
  },
  servings: {
    type: Number,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  foodCondition:{
    type: String,
    required: true,
  },
  images: [{
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  }],

  // Contact & Pickup Details
  contactPerson: {
    type: String,
    required: true,
    trim: true
  },
  contactPhone: {
    type: String,
    required: true,
    match: /^[\+]?[1-9][\d]{0,15}$/
  },
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  alternateContactNumber: {
    type: String,
  },

  pickupAddress: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],   // [longitude, latitude]
      index: '2dsphere'
    }
  },
  // Status Management
  status: {
    type: String,
    enum: ['available', 'claimed', 'picked-up', 'expired', 'cancelled'],
    default: 'available'
  },

  // Metadata
  donorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  claimedBy: {
    type: Schema.Types.ObjectId,
    ref: 'NGO'
  },
  claimedAt: {
    type: Date
  },
  rejectedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'NGO'
  }],
  expiryDate: {
    type: Date,
    required: true,
    default: function () {
      return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    }
  },
  expiryTime: {
    type: String, 
    required: false
  },


  // Notifications
  notificationsSent: [{
    ngoId: {
      type: Schema.Types.ObjectId,
      ref: 'NGO'
    },
    sentAt: {
      type: Date,
      default: Date.now
    },
    method: {
      type: String,
      enum: ['email', 'sms', 'push']
    }
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
donationSchema.index({ location: '2dsphere' });
donationSchema.index({ status: 1, createdAt: -1 });
donationSchema.index({ donorId: 1, status: 1 });
donationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


export const Donation = mongoose.model("Donation", donationSchema)