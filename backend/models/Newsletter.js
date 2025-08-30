// models/Newsletter.js
import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
});

export const Newsletter = mongoose.model("Newsletter", newsletterSchema);
