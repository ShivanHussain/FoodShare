import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO', // NGO receiving the notification
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Can be Donor/Admin etc. who triggered it
    required: false,
  },
  donation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation',
    required: true,
  },
  type: {
    type: String,
    enum: ['donation', 'info', 'alert'], 
    default: 'donation',
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  isRead: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

// Add index for better query performance
notificationSchema.index({ recipient: 1, isRead: 1 });

export const Notification = mongoose.model("Notification", notificationSchema);
