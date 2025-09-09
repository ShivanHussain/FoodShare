import { User } from "../models/User.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { getCoordinatesFromAddress } from "../utils/geocode.js";
import { NGO } from "../models/Ngo.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "cloudinary";



// @desc update user profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {

  const { name, phone, address, role } = req.body;

  const updateData = {};

  if (name) updateData.name = name;
  if (phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return next(new ErrorHandler("Invalid phone number", 400));
    }
    updateData.phone = phone;
  }
  if (address) {
    if (address.length < 10 || !/\b\d{6}\b/.test(address)) {
      return next(new ErrorHandler("Address must include a valid 6-digit pincode", 400));
    }
    updateData.address = address;
    // Optionally update coordinates if address changes
    const coords = await getCoordinatesFromAddress(address);
    if (!coords) return next(new ErrorHandler("Invalid address", 400));
    updateData.location = {
      type: "Point",
      coordinates: [coords.longitude, coords.latitude],
    };
  }

  // Handle avatar update if provided
  if (req.files && req.files.profileImage) {
    let user = await User.findById(req.user.id);
    if (!user) {
      user = await NGO.findById(req.user.id);
    }
    // Delete old avatar from Cloudinary if exists
    if (user.avatar && user.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }
    const avatarUpload = await cloudinary.v2.uploader.upload(req.files.profileImage.tempFilePath, {
      folder: "FOODSHARE_USER_IMAGE",
    });
    updateData.avatar = {
      public_id: avatarUpload.public_id,
      url: avatarUpload.secure_url,
    };
  }

  let user;

  if (role == 'donor' || role == 'admin') {

    user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    });

  }

  if (role == 'ngo') {

    user = await NGO.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    });

  }

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user
  });
});




// @desc    Get all donation history of logged-in donor
export const getAllDonationHistory = catchAsyncErrors(async (req, res, next) => {

  const role = req.params.role;
  const user = await User.findById(req.user._id).populate({
    path: 'donationHistory',
    select: '-__v',
    options: { sort: { createdAt: -1 } },
  });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    donations: user.donationHistory,
  });
});




// @desc    Get donation history by status (e.g., claimed, completed, available , cancelled)
export const getDonationHistoryByStatus = catchAsyncErrors(async (req, res, next) => {

  const status = req.query.status;

  if (!status) {
    return next(new ErrorHandler("Status query parameter is required", 400));
  }

  const user = await User.findById(req.user._id).populate({
    path: 'donationHistory',
    match: { status: status },
    select: '-__v',
    options: { sort: { createdAt: -1 } },
    populate: {
      path: 'claimedBy',
      model: 'NGO',
      select: 'email phone address organizationName'
    }
  });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    donations: user.donationHistory,
  });
});




// @desc    Get recent three donations claimed by the donor
export const getRecentThreeDonationDonor = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;

  const user = await User.findById(userId)
    .populate({
      path: "donationHistory",
      options: { sort: { createdAt: -1 }, limit: 3 },
      populate: {
        path: "claimedBy", // Deep populate claimedBy inside each donation
        select: "name email phone organizationName", 
      },
    });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    recentDonations: user.donationHistory,
  });
});


// @desc    Get recent three donations claimed by the NGO
export const getRecentThreeDonationNgo = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;

  const user = await NGO.findById(userId)
    .populate({
      path: 'claimedDonations',
      options: { sort: { createdAt: -1 }, limit: 3 },
      populate: {
        path: 'donorId',
        select: 'fullName email phone address name',
      },
    });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    recentDonations: user.claimedDonations,
  });
});


// @desc change password
export const changePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(new ErrorHandler("All password fields are required", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("New passwords do not match", 400));
  }

  let user = await User.findById(req.user.id).select("+password");
  if (!user) {
    user = await NGO.findById(req.user.id).select("+password");
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return next(new ErrorHandler("Current password is incorrect", 400));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

// @desc forget password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler('Email is required', 400));
  }

  let user = await User.findOne({ email }) || await NGO.findOne({ email });

  if (!user) {
    return res.status(200).json({
      success: true,
      message: 'If an account with that email exists, a reset link has been sent.',
    });
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = `You requested a password reset.\n\nClick to reset your password:\n${resetUrl}\n\nIf you didn't request this, 
  please ignore.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler('Email could not be sent', 500));
  }
});

// @desc reset Password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    return next(new ErrorHandler('Both passwords are required', 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler('Passwords do not match', 400));
  }

  const resetTokenHash = crypto.createHash('sha256').update(req.params.token).digest('hex');

  let user = await User.findOne({
    resetPasswordToken: resetTokenHash,
    resetPasswordExpire: { $gt: Date.now() },
  }) || await NGO.findOne({
    resetPasswordToken: resetTokenHash,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler('Reset token is invalid or has expired', 400));
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
  });
});


// @desc    Get all users with populated donation History
export const getAllUsersFeedback = catchAsyncErrors(async (req, res, next) => {
  const checkUser = req.user.role;

  let users;

  if (checkUser === 'ngo') {
    users = await User.find()
      .populate({
        path: "donationHistory",
        select: "createdAt",
        options: { sort: { createdAt: -1 } } // Latest first
      });
  }

  if (checkUser === 'donor') {
    users = await NGO.find()
      .populate({
        path: "claimedDonations",
        select: "createdAt",
        options: { sort: { createdAt: -1 } } // Latest first
      });
  }

  if (!users || users.length === 0) {
    return next(new ErrorHandler("No Users found", 404));
  }

  const finalData = users.map(user => {
    const userObj = user.toObject();

    let donationsArray = [];
    if (checkUser === 'ngo') {
      donationsArray = user.donationHistory || [];
      delete userObj.donationHistory;
    } else if (checkUser === 'donor') {
      donationsArray = user.claimedDonations || [];
      delete userObj.claimedDonations;
    }

    const totalDonation = donationsArray.length;
    const recentDonationDate = donationsArray[0]?.createdAt || null;

    return {
      ...userObj,
      totalDonation,
      recentDonationDate
    };
  });

  res.status(200).json({
    success: true,
    count: finalData.length,
    data: finalData
  });
});

