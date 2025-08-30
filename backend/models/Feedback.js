
import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "fromModel",
      required: [true, "Feedback sender is required"],
    },
    fromModel: {
      type: String,
      required: true,
      enum: ["User", "NGO"],
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "toModel",
      required: [true, "Feedback recipient is required"],
    },
    toModel: {
      type: String,
      required: true,
      enum: ["User", "NGO"],
    },
    message: {
      type: String,
      required: [true, "Feedback message is required"],
      trim: true,
      maxlength: [500, "Feedback message cannot exceed 500 characters"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    type: {
      type: String,
      enum: ["positive", "suggestion"],
      required: [true, "Feedback type is required"],
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["unread", "read"],
      default: "unread",
    },
  },
  {
    timestamps: true,
  }
);

feedbackSchema.index({ toUser: 1, createdAt: -1 });
feedbackSchema.index({ fromUser: 1, createdAt: -1 });

export const Feedback = mongoose.model("Feedback", feedbackSchema);
