// models/ContactMessage.js
import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
  },
  message: {
    type: String,
    required: [true, 'Message cannot be empty'],
  }
},{ timestamps: true });

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
