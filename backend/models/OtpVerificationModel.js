import mongoose from 'mongoose';

const otpVerificationSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    required: true,
  },
  donationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation',
    required: true,
  },
  notificationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});


// otpVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OtpVerification = mongoose.model('OtpVerification', otpVerificationSchema);
