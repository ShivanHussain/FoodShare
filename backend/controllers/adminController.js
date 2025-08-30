import { User } from "../models/User.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { NGO } from "../models/Ngo.js";
import cloudinary from "cloudinary";
import { Donation } from "../models/Donation.js";
import { Feedback } from "../models/Feedback.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { Newsletter } from "../models/Newsletter.js";


//====================User & NGO Controllers====================//

// @desc    Get all users (admin only)
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {

  const users = await User.find().select(
    "-password -resetPasswordToken -resetPasswordExpire -__v"
  );

  if (!users || users.length === 0) {
    return next(new ErrorHandler("No Users found", 404));
  }

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});




// @desc    Get all NGOs (admin only)
export const getAllNgos = catchAsyncErrors(async (req, res, next) => {

  const ngos = await NGO.find().select(
    "-password -resetPasswordToken -resetPasswordExpire -__v"
  );

  if (!ngos || ngos.length === 0) {
    return next(new ErrorHandler("No NGOs found", 404));
  }

  res.status(200).json({
    success: true,
    count: ngos.length,
    ngos,
  });
});

// @desc    Get user by ID (admin only)
export const getUserById = catchAsyncErrors(async (req, res, next) => {

  const userId = req.params.id;

  let user = await User.findById(userId).select(
    "-password -resetPasswordToken -resetPasswordExpire -__v"
  );

  if (!user) {
    user = await NGO.findById(userId).select(
      "-password -resetPasswordToken -resetPasswordExpire -__v"
    );

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  }

  res.status(200).json({
    success: true,
    user,
  });
});



// @desc    Delete user by ID (admin only)
export const deleteUserById = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;

  let user = await User.findById(userId);
  if (!user) {
    user = await NGO.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  }

  // Delete avatar from Cloudinary if exists
  if (user.avatar && user.avatar.public_id) {
    try {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    } catch (error) {
      console.error("Cloudinary deletion failed:", error);
    }
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});


// @desc    Update user role (admin only)
export const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  const { role } = req.body;
  let user = await User.findById(userId);
  if (!user) {
    user = await NGO.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  }

  user.role = role || user.role;
  await user.save();

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
    user,
  });
});



// @desc    Get user by ID with details (admin only)
export const getUserByIdWithDetails = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  // Donor check
  let user = await User.findById(userId)
    .select("-password -resetPasswordToken -resetPasswordExpire -__v")
    .populate("donationHistory")
    .populate({
      path: "feedbackReceived",
      populate: {
        path: "fromUser",   // Mongoose picks correct model from refPath
        select: "name email avatar",
      },
    });

  if (!user) {
    // NGO check
    user = await NGO.findById(userId)
      .select("-password -resetPasswordToken -resetPasswordExpire -__v")
      .populate("claimedDonations")
      .populate({
        path: "feedbackReceived",
        populate: {
          path: "fromUser",
          select: "name email avatar",
        },
      });
  }

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});


// @route  Update User verified Status
export const updateVerifiedStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { isVerified } = req.body;

  // Validate input
  if (typeof isVerified !== "boolean") {
    return next(new ErrorHandler("isVerified field must be true/false", 400));
  }

  let user;

  user = await User.findById(id);

  if (!user) {

    user = await NGO.findById(id);

    if (!user) {

      return next(new ErrorHandler("User not found", 404));

    }
  }
  // Update verification status
  user.verified = isVerified;
  await user.save();

  res.status(200).json({
    success: true,
    message: `User verification status updated to ${isVerified ? 'Verified' :'Unverified'}`,
    user,
  });
});


//====================Donation Controllers====================//

// @desc    Get all donations (admin only)
export const getAllDonation = catchAsyncErrors(async (req, res, next) => {

  const donations = await Donation.find();

  if (!donations || donations.length === 0) {
    return next(new ErrorHandler("No donations found", 404));
  }

  res.status(200).json({
    success: true,
    count: donations.length,
    donations,
  });
});


// @desc    Get donation by ID (admin only)
export const getDonationByIdWithDetails = catchAsyncErrors(async (req, res, next) => {
  const donationId = req.params.id;

  const donation = await Donation.findById(donationId)
    .populate("donorId", "name email avatar phone address averageRating donationHistory createdAt") // donor details
    .populate("claimedBy", "name email phone address registrationNumber organizationName avatar averageRating"); // NGO details

  if (!donation) {
    return next(new ErrorHandler("Donation not found", 404));
  }

  res.status(200).json({
    success: true,
    donation,
  });
});


// @desc    Delete donation by ID (admin only)
export const deleteDonationById = catchAsyncErrors(async (req, res, next) => {
  const donationId = req.params.id;

  const donation = await Donation.findById(donationId);
  if (!donation) {
    return next(new ErrorHandler("Donation not found", 404));
  }
  await donation.deleteOne();
  res.status(200).json({
    success: true,
    message: "Donation deleted successfully",
  });
});


// @desc    Update donation status (admin only)
export const updateDonationStatus = catchAsyncErrors(async (req, res, next) => {
  const donationId = req.params.id;
  const { status } = req.body;

  const donation = await Donation.findById(donationId);
  if (!donation) {
    return next(new ErrorHandler("Donation not found", 404));
  }
  donation.status = status || donation.status;
  await donation.save();

  res.status(200).json({
    success: true,
    message: "Donation status updated successfully",
    donation,
  });
});




//====================Feedback Controllers====================//

export const getAllFeedback = catchAsyncErrors(async (req, res, next) => {
  const feedbacks = await Feedback.find()
    .populate("fromUser", "name email avatar role")
    .populate("toUser", "name email avatar role")
    .sort({ createdAt: -1 });

  if (!feedbacks || feedbacks.length === 0) {
    return next(new ErrorHandler("No Feedback found", 404));
  }

  res.status(200).json({
    success: true,
    count: feedbacks.length,
    feedbacks,
  });
});


//===================Contact Controllers===================//


export const getAllContacts = catchAsyncErrors(async (req, res, next) => {

  const contacts = await ContactMessage.find().sort({ createdAt: -1 });

  if (!contacts || contacts.length === 0) {
    return next(new ErrorHandler("No contacts found", 404));
  }

  res.status(200).json({
    success: true,
    count: contacts.length,
    contacts,
  });
});


//==============================Newsletter Controllers==============================//

export const getAllNewsletters = catchAsyncErrors(async (req, res, next) => {

  const newsletters = await Newsletter.find().sort({ createdAt: -1 });

  if (!newsletters || newsletters.length === 0) {
    return next(new ErrorHandler("No newsletters found", 404));
  }

  res.status(200).json({
    success: true,
    count: newsletters.length,
    newsletters,
  });
});





//===================================Analytics Controller========================================//

// @desc Dashboard Overview Stats 
export const getDashboardStats = catchAsyncErrors(async (req, res, next) => {
  const now = new Date();
  const startOfToday = new Date(now.setHours(0, 0, 0, 0));
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

  const [
    totalDonations,
    todayDonations,
    weeklyDonations,
    monthlyDonations,
    activeDonations,
    claimedDonations,
    expiredDonations,
    totalUsers,
    totalNGOs,
    totalWeight,
    totalServings
  ] = await Promise.all([
    Donation.countDocuments(),
    Donation.countDocuments({ createdAt: { $gte: startOfToday } }),
    Donation.countDocuments({ createdAt: { $gte: startOfWeek } }),
    Donation.countDocuments({ createdAt: { $gte: startOfMonth } }),
    Donation.countDocuments({ status: "available" }),
    Donation.countDocuments({ status: "claimed" }),
    Donation.countDocuments({ status: "expired" }),
    User.countDocuments(),
    NGO.countDocuments(),
    Donation.aggregate([{ $group: { _id: null, total: { $sum: "$quantity" } } }]),
    Donation.aggregate([{ $group: { _id: null, total: { $sum: "$servings" } } }])
  ]);

  res.status(200).json({
    success: true,
    data: {
      overview: {
        totalDonations,
        todayDonations,
        weeklyDonations,
        monthlyDonations,
        activeDonations,
        claimedDonations,
        expiredDonations,
        totalUsers,
        totalNGOs,
        totalWeight: totalWeight[0]?.total || 0,
        totalServings: totalServings[0]?.total || 0
      }
    }
  });
});

// @desc Donation Trends 
export const getDonationTrends = catchAsyncErrors(async (req, res, next) => {
  const { period = "week", range = "30" } = req.query;
  let dateRange, groupBy;

  const now = new Date();
  switch (period) {
    case "day":
      dateRange = new Date(now.setDate(now.getDate() - parseInt(range)));
      groupBy = { year: { $year: "$createdAt" }, month: { $month: "$createdAt" }, day: { $dayOfMonth: "$createdAt" } };
      break;
    case "week":
      dateRange = new Date(now.setDate(now.getDate() - parseInt(range) * 7));
      groupBy = { year: { $year: "$createdAt" }, week: { $week: "$createdAt" } };
      break;
    case "month":
      dateRange = new Date(now.setMonth(now.getMonth() - parseInt(range)));
      groupBy = { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } };
      break;
    default:
      dateRange = new Date(now.setDate(now.getDate() - 30));
      groupBy = { year: { $year: "$createdAt" }, month: { $month: "$createdAt" }, day: { $dayOfMonth: "$createdAt" } };
  }

  const trends = await Donation.aggregate([
    { $match: { createdAt: { $gte: dateRange } } },
    {
      $group: {
        _id: groupBy,
        totalDonations: { $sum: 1 },
        totalQuantity: { $sum: "$quantity" },
        totalServings: { $sum: "$servings" },
        avgQuantity: { $avg: "$quantity" }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.week": 1 } }
  ]);

  if (!trends || trends.length === 0) {
    return next(new ErrorHandler("No donation trends found", 404));
  }

  res.status(200).json({ success: true, data: trends });
});

// @desc  Category Distribution 
export const getCategoryDistribution = catchAsyncErrors(async (req, res, next) => {
  const distribution = await Donation.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 }, totalQuantity: { $sum: "$quantity" }, totalServings: { $sum: "$servings" }, 
    avgQuantity: { $avg: "$quantity" } } },
    { $sort: { count: -1 } }
  ]);

  const foodPreferenceDistribution = await Donation.aggregate([
    { $group: { _id: "$foodPreference", count: { $sum: 1 }, totalQuantity: { $sum: "$quantity" } } },
    { $sort: { count: -1 } }
  ]);

  res.status(200).json({
    success: true,
    data: { categoryDistribution: distribution, foodPreferenceDistribution }
  });
});

// @desc Location-based Analytics 
export const getLocationAnalytics = catchAsyncErrors(async (req, res, next) => {
  const locationStats = await Donation.aggregate([
    {
      $addFields: {
        city: { $arrayElemAt: [{ $split: ["$pickupAddress", ","] }, -2] }
      }
    },
    {
      $group: {
        _id: { $trim: { input: "$city" } },
        count: { $sum: 1 },
        totalQuantity: { $sum: "$quantity" },
        activeCount: { $sum: { $cond: [{ $eq: ["$status", "available"] }, 1, 0] } },
        claimedCount: { $sum: { $cond: [{ $eq: ["$status", "claimed"] }, 1, 0] } }
      }
    },
    { $match: { _id: { $ne: null, $ne: "" } } },
    { $sort: { count: -1 } },
    { $limit: 15 }
  ]);

  res.status(200).json({ success: true, data: locationStats });
});

// @desc Status Breakdown 
export const getStatusBreakdown = catchAsyncErrors(async (req, res, next) => {
  const statusStats = await Donation.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 }, totalQuantity: { $sum: "$quantity" } } }
  ]);

  const totalDonations = await Donation.countDocuments();
  const enrichedStats = statusStats.map(stat => ({
    ...stat,
    percentage: ((stat.count / totalDonations) * 100).toFixed(2)
  }));

  res.status(200).json({ success: true, data: enrichedStats });
});

// @desc  NGO Performance 
export const getNGOPerformance = catchAsyncErrors(async (req, res, next) => {
  const ngoStats = await Donation.aggregate([
    { $match: { claimedBy: { $ne: null } } },
    {
      $group: {
        _id: "$claimedBy",
        claimedCount: { $sum: 1 },
        totalQuantityClaimed: { $sum: "$quantity" },
        totalServingsClaimed: { $sum: "$servings" },
        avgResponseTime: { $avg: { $subtract: ["$claimedAt", "$createdAt"] } }
      }
    },
    {
      $lookup: { from: "ngos", localField: "_id", foreignField: "_id", as: "ngoDetails" }
    },
    { $unwind: "$ngoDetails" },
    {
      $project: {
        ngoName: "$ngoDetails.organizationName",
        claimedCount: 1,
        totalQuantityClaimed: 1,
        totalServingsClaimed: 1,
        avgResponseTimeHours: { $divide: ["$avgResponseTime", 1000 * 60 * 60] }
      }
    },
    { $sort: { claimedCount: -1 } },
    { $limit: 20 }
  ]);

  res.status(200).json({ success: true, data: ngoStats });
});

// @desc Monthly Comparison 
export const getMonthlyComparison = catchAsyncErrors(async (req, res, next) => {
  const currentYear = new Date().getFullYear();
  const monthlyStats = await Donation.aggregate([
    { $match: { createdAt: { $gte: new Date(`${currentYear}-01-01`), $lte: new Date(`${currentYear}-12-31`) } } },
    {
      $group: {
        _id: { month: { $month: "$createdAt" } },
        totalDonations: { $sum: 1 },
        totalQuantity: { $sum: "$quantity" },
        totalServings: { $sum: "$servings" },
        claimedDonations: { $sum: { $cond: [{ $eq: ["$status", "claimed"] }, 1, 0] } },
        expiredDonations: { $sum: { $cond: [{ $eq: ["$status", "expired"] }, 1, 0] } }
      }
    },
    { $sort: { "_id.month": 1 } }
  ]);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const completeMonthlyStats = monthNames.map((name, index) => {
    const monthData = monthlyStats.find(stat => stat._id.month === index + 1);
    return {
      month: name,
      monthNumber: index + 1,
      totalDonations: monthData?.totalDonations || 0,
      totalQuantity: monthData?.totalQuantity || 0,
      totalServings: monthData?.totalServings || 0,
      claimedDonations: monthData?.claimedDonations || 0,
      expiredDonations: monthData?.expiredDonations || 0,
      successRate: monthData ? ((monthData.claimedDonations / monthData.totalDonations) * 100).toFixed(2) : 0
    };
  });

  res.status(200).json({ success: true, data: completeMonthlyStats });
});

// @desc Expiry Analytics 
export const getExpiryAnalytics = catchAsyncErrors(async (req, res, next) => {
  const now = new Date();
  const expiryStats = await Donation.aggregate([
    {
      $addFields: {
        expiryCategory: {
          $switch: {
            branches: [
              { case: { $lt: ["$expiryDate", now] }, then: "Expired" },
              { case: { $lt: ["$expiryDate", new Date(now.getTime() + 2 * 60 * 60 * 1000)] }, then: "Critical (< 2 hours)" },
              { case: { $lt: ["$expiryDate", new Date(now.getTime() + 6 * 60 * 60 * 1000)] }, then: "Urgent (< 6 hours)" },
              { case: { $lt: ["$expiryDate", new Date(now.getTime() + 24 * 60 * 60 * 1000)] }, then: "Soon (< 24 hours)" }
            ],
            default: "Safe (> 24 hours)"
          }
        }
      }
    },
    { $group: { _id: "$expiryCategory", count: { $sum: 1 }, totalQuantity: { $sum: "$quantity" } } },
    { $sort: { count: -1 } }
  ]);

  const expiredByCategory = await Donation.aggregate([
    { $match: { status: "expired" } },
    { $group: { _id: "$category", expiredCount: { $sum: 1 }, expiredQuantity: { $sum: "$quantity" } } },
    { $sort: { expiredCount: -1 } },
    { $limit: 10 }
  ]);

  res.status(200).json({ success: true, data: { expiryBreakdown: expiryStats, expiredByCategory } });
});

// @desc Food Preference Stats
export const getFoodPreferenceStats = catchAsyncErrors(async (req, res, next) => {
  const preferenceStats = await Donation.aggregate([
    {
      $group: {
        _id: "$foodPreference",
        count: { $sum: 1 },
        totalQuantity: { $sum: "$quantity" },
        avgQuantity: { $avg: "$quantity" },
        claimedCount: { $sum: { $cond: [{ $eq: ["$status", "claimed"] }, 1, 0] } }
      }
    },
    { $addFields: { claimRate: { $multiply: [{ $divide: ["$claimedCount", "$count"] }, 100] } } },
    { $sort: { count: -1 } }
  ]);

  res.status(200).json({ success: true, data: preferenceStats });
});

// @desc Top Donors 
export const getTopDonors = catchAsyncErrors(async (req, res, next) => {
  const topDonors = await Donation.aggregate([
    {
      $group: {
        _id: "$donorId",
        donationCount: { $sum: 1 },
        totalQuantity: { $sum: "$quantity" },
        totalServings: { $sum: "$servings" },
        successfulDonations: { $sum: { $cond: [{ $eq: ["$status", "claimed"] }, 1, 0] } }
      }
    },
    { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "donorDetails" } },
    { $unwind: "$donorDetails" },
    {
      $project: {
        donorName: "$donorDetails.name",
        donorEmail: "$donorDetails.email",
        donationCount: 1,
        totalQuantity: 1,
        totalServings: 1,
        successfulDonations: 1,
        successRate: { $multiply: [{ $divide: ["$successfulDonations", "$donationCount"] }, 100] }
      }
    },
    { $sort: { donationCount: -1 } },
    { $limit: 20 }
  ]);

  res.status(200).json({ success: true, data: topDonors });
});

// @desc Recent Activity 
export const getRecentActivity = catchAsyncErrors(async (req, res, next) => {
  const { limit = 50 } = req.query;
  const recentDonations = await Donation.find()
    .populate("donorId", "name email")
    .populate("claimedBy", "organizationName")
    .sort({ updatedAt: -1 })
    .limit(parseInt(limit))
    .select("foodType category quantity status createdAt updatedAt claimedAt");

  res.status(200).json({ success: true, data: recentDonations });
});

// @desc Time-based Analytics 
export const getTimeBasedAnalytics = catchAsyncErrors(async (req, res, next) => {
  const hourlyDistribution = await Donation.aggregate([
    { $group: { _id: { hour: { $hour: "$createdAt" } }, count: { $sum: 1 } } },
    { $sort: { "_id.hour": 1 } }
  ]);

  const dailyDistribution = await Donation.aggregate([
    { $group: { _id: { dayOfWeek: { $dayOfWeek: "$createdAt" } }, count: { $sum: 1 }, avgQuantity: { $avg: "$quantity" } } },
    { $sort: { "_id.dayOfWeek": 1 } }
  ]);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dailyWithNames = dailyDistribution.map(day => ({
    ...day,
    dayName: dayNames[day._id.dayOfWeek - 1]
  }));

  res.status(200).json({ success: true, data: { hourlyDistribution, dailyDistribution: dailyWithNames } });
});


