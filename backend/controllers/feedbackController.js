import { Feedback } from "../models/Feedback.js";
import { User } from "../models/User.js";
import { NGO } from "../models/Ngo.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

// @desc Create feedback
export const createFeedback = catchAsyncErrors(async (req, res, next) => {
  const { toUserId, message, rating, type } = req.body;
  const fromUserId = req.user.id;
  const fromModel = req.user.role === "donor" ? "User" : "NGO";

  if (!toUserId || !message || !rating || !type) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  if (fromUserId === toUserId) {
    return next(new ErrorHandler("You cannot give feedback to yourself", 400));
  }

  // Find recipient & determine toModel
  let toModel;
  let recipientDoc = await User.findById(toUserId);
  if (recipientDoc) {
    toModel = "User";
  } else {
    recipientDoc = await NGO.findById(toUserId);
    if (recipientDoc) {
      toModel = "NGO";
    }
  }
  if (!recipientDoc) {
    return next(new ErrorHandler("Recipient not found", 404));
  }

  const feedback = await Feedback.create({
    fromUser: fromUserId,
    fromModel,
    toUser: toUserId,
    toModel,
    message,
    rating,
    type,
  });

  // Update arrays
  if (fromModel === "User") {
    await User.findByIdAndUpdate(fromUserId, { $push: { feedbackGiven: feedback._id } });
  } else {
    await NGO.findByIdAndUpdate(fromUserId, { $push: { feedbackGiven: feedback._id } });
  }

  if (toModel === "User") {
    await User.findByIdAndUpdate(toUserId, { $push: { feedbackReceived: feedback._id } });
  } else {
    await NGO.findByIdAndUpdate(toUserId, { $push: { feedbackReceived: feedback._id } });
  }


  await recipientDoc.updateAverageRating();

  await feedback.populate([
    { path: "fromUser", select: "name email avatar role" },
    { path: "toUser", select: "name email avatar role" },
  ]);

  res.status(201).json({
    success: true,
    message: "Feedback created successfully",
    feedback,
  });
});

// @desc Get feedbacks received by logged-in user
export const getFeedbacksReceived = catchAsyncErrors(async (req, res) => {
  const { id: userId, role } = req.user;
  const modelName = role === "donor" ? "User" : role === 'ngo' ? "NGO" : "User";

  const feedbacks = await Feedback.find({ toUser: userId, toModel: modelName })
    .populate("fromUser", "name email avatar role")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: feedbacks.length,
    feedbacks,
  });
});

// @desc Get feedbacks given by logged-in user
export const getFeedbacksGiven = catchAsyncErrors(async (req, res) => {
  const { id: userId, role } = req.user;
  const modelName = role === "donor" ? "User" : "NGO";

  const feedbacks = await Feedback.find({ fromUser: userId, fromModel: modelName })
    .populate("toUser", "name email avatar role")
    .populate("fromUser", "name email avatar role")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: feedbacks.length,
    feedbacks,
  });
});

// @desc Mark feedback as read
export const markFeedbackAsRead = catchAsyncErrors(async (req, res, next) => {
  const { feedbackId } = req.params;
  const { id: userId } = req.user;

  const feedback = await Feedback.findById(feedbackId);
  if (!feedback) return next(new ErrorHandler("Feedback not found", 404));

  if (feedback.toUser.toString() !== userId) {
    return next(new ErrorHandler("Not authorized to mark this feedback", 403));
  }

  feedback.status = "read";
  await feedback.save();

  res.status(200).json({
    success: true,
    message: "Feedback marked as read",
    feedback,
  });
});

//@desc Delete feedback
export const deleteFeedback = catchAsyncErrors(async (req, res, next) => {
  const { feedbackId } = req.params;
  const { id: userId, role } = req.user;

  const feedback = await Feedback.findById(feedbackId);
  if (!feedback) return next(new ErrorHandler("Feedback not found", 404));

  if (feedback.fromUser.toString() !== userId && role !== "admin") {
    return next(new ErrorHandler("Not authorized to delete", 403));
  }

  if (feedback.fromModel === "User") {
    await User.findByIdAndUpdate(feedback.fromUser, { $pull: { feedbackGiven: feedbackId } });
  } else {
    await NGO.findByIdAndUpdate(feedback.fromUser, { $pull: { feedbackGiven: feedbackId } });
  }

  if (feedback.toModel === "User") {
    await User.findByIdAndUpdate(feedback.toUser, { $pull: { feedbackReceived: feedbackId } });
  } else {
    await NGO.findByIdAndUpdate(feedback.toUser, { $pull: { feedbackReceived: feedbackId } });
  }

  await Feedback.findByIdAndDelete(feedbackId);

  let recipientDoc;
  if (feedback.toModel === "User") {
    recipientDoc = await User.findById(feedback.toUser);
  } else {
    recipientDoc = await NGO.findById(feedback.toUser);
  }
  if (recipientDoc?.updateAverageRating) {
    await recipientDoc.updateAverageRating();
  }

  res.status(200).json({
    success: true,
    message: "Feedback deleted successfully",
  });
});

// @desc Get feedback stats for logged-in user
export const getFeedbackStats = catchAsyncErrors(async (req, res) => {
  const { id: userId, role } = req.user;
  const modelName = role === "donor" ? "User" : "NGO";

  const stats = await Feedback.aggregate([
    { $match: { toUser: req.user._id, toModel: modelName } },
    {
      $group: {
        _id: "$rating",
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const total = stats.reduce((sum, s) => sum + s.count, 0);
  const avgRating = stats.reduce((sum, s) => sum + s._id * s.count, 0) / (total || 1);

  res.status(200).json({
    success: true,
    stats,
    avgRating,
    total,
  });
});

// @desc Like Feedback
export const likeFeedback = catchAsyncErrors(async (req, res, next) => {
  const { feedbackId } = req.params;

  // Validate ObjectId
  const isFeedback = Feedback.findById(feedbackId);

  if (!isFeedback) {
    return next(new ErrorHandler("Invalid feedback ID", 400));
  }

  const feedback = await Feedback.findByIdAndUpdate(
    feedbackId,
    { $inc: { like: 1 } }, // Increment like safely
    { new: true }
  );

  if (!feedback) {
    return next(new ErrorHandler("Feedback not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Feedback liked successfully",
    feedback,
  });
});

// @desc Dislike Feedback
export const dislikeFeedback = catchAsyncErrors(async (req, res, next) => {
  const { feedbackId } = req.params;
  const isFeedback = Feedback.findById(feedbackId);
  if (!isFeedback) {
    return next(new ErrorHandler("Invalid feedback ID", 400));
  }

  const feedback = await Feedback.findByIdAndUpdate(
    feedbackId,
    { $inc: { dislike: 1 } }, // Increment dislike safely
    { new: true }
  );

  if (!feedback) {
    return next(new ErrorHandler("Feedback not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Feedback disliked successfully",
    feedback,
  });
});
