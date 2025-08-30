import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your full name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      match: [/.+\@.+\..+/, 'Please use a valid email address'],
      lowercase: true,
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
        return !this.googleAuthenticated;
      },
      match: /^[\+]?[1-9][\d]{9,14}$/, // international format
    },
    address: {
      type: String,
      required: function () {
        return !this.googleAuthenticated;
      },
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere",
      },
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
    verified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    donationHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donation",
      },
    ],

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
    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
      },
    },
    googleAuthenticated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// @dics Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// @dics Compare password during login
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// @dics Generate JWT token
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// @dics Method to generate reset token
userSchema.methods.getResetPasswordToken = function () {

  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

// @dics Method to update average rating
userSchema.methods.updateAverageRating = async function () {
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

export const User = mongoose.model("User", userSchema);
