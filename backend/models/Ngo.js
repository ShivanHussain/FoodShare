import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import crypto from "crypto";

const ngoSchema = new mongoose.Schema({
  name: {
    //contact person name
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false, // prevent from being returned by default
  },
  phone: {
    type: String,
    required: function () {
      return !this.googleAuthenicated;
    },
    match: /^[\+]?[1-9][\d]{0,15}$/
  },
  address: {
    type: String,
    required: function () {
      return !this.googleAuthenicated;
    },
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
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  organizationName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ["donor", "ngo", "admin"],
    required: function () {
      return !this.googleAuthenticated;
    },
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  isActive: {
    type: Boolean,
    default: true
  },
  claimedDonations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation'
  }],
  totalPickups: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false,
  },
  // FEEDBACK RELATED FIELDS
  feedbackReceived: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },
  ],
  feedbackGiven: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },
  ],
  averageRating: {
    type: Number,
    default: 1,
    min: 0,
    max: 5,
  },
  totalFeedbacks: {
    type: Number,
    default: 0,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    },
    autoAccept: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});



// @desc Hash password before saving
ngoSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// @desc Compare password during login
ngoSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// @desc Generate JWT token
ngoSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};


// @desc Method to generate reset token
ngoSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

  return resetToken;
};


// @desc Method to update average rating
ngoSchema.methods.updateAverageRating = async function () {
  const feedbacks = await mongoose.model("Feedback").find({ toUser: this._id });
  if (feedbacks.length > 0) {
    const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    this.averageRating = (totalRating / feedbacks.length).toFixed(1);
    this.totalFeedbacks = feedbacks.length;
  } else {
    this.averageRating = 0;
    this.totalFeedbacks = 0;
  }
  await this.save();
};

ngoSchema.index({ location: '2dsphere' });


export const NGO = mongoose.model("NGO", ngoSchema);