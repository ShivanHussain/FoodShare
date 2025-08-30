import { NGO } from '../models/Ngo.js';
import { User } from '../models/User.js';
import { Donation } from '../models/Donation.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import { OtpVerification } from '../models/OtpVerificationModel.js';
import { sendEmail } from '../utils/sendEmail.js';


// @disc Request OTP for Pickup Verification
export const sendEmailOtp = catchAsyncErrors(async (req, res, next) => {
  const ngoId = req.user._id;
  const donationId = req.params.donationId;
  const notificationId = req.params.notificationId;

  //Fetch NGO Details
  const ngo = await NGO.findById(ngoId);
  if (!ngo || !ngo.email) {
    return next(new ErrorHandler('NGO not found or email missing', 404));
  }

  //Fetch Donation & Donor
  const donation = await Donation.findById(donationId);
  if (!donation || !donation.donorId) {
    return next(new ErrorHandler('Donation or donor not found', 404));
  }
  const donorId = donation.donorId;

  //Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP in DB
  await OtpVerification.create({
    otp,
    userId: donorId,
    ngoId,
    donationId,
    notificationId,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours expiry
  });

  //Send Email to NGO
  await sendEmail({
    email: ngo.email,
    subject: 'FoodShare OTP for Claimed Donation',
    message: `Hi ${ngo.organizationName},\n\nYou have claimed a donation.\nYour OTP is: ${otp}\n\nUse this OTP to verify the pickup.\n\nRegards,\nFoodShare Team`,
  });

  //Respond
  res.status(200).json({
    success: true,
    message: 'OTP generated and sent to email.',
    data: {
      otpSentTo: ngo.email,
      donationId,
      notificationId,
    },
  });
});



// @disc Verify OTP for Pickup
export const verifyOtp = catchAsyncErrors(async (req, res, next) => {
  const { otp, donationId, ngoId , userId } = req.body;

  const record = await OtpVerification.findOne({
    otp,
    donationId,
    ngoId,
    userId,
    expiresAt: { $gt: new Date() },
    verified: false
  });

  const ngo = await NGO.findById(ngoId);
  if(!ngo){
    return (new next(ErrorHandler("NGO not Found",404)));
  }

  if (!record) return next(new ErrorHandler("Invalid or expired OTP", 400));

  record.verified = true;
  await record.save();


  // Update Donation Status
  const donation = await Donation.findById(donationId);
  if (!donation) return next(new ErrorHandler("Donation not found", 404));  
  donation.status = 'picked-up';
  ngo.totalPickups += 1;      //check login work or not

  await ngo.save();
  await donation.save();
  res.status(200).json({
    success: true,
    message: "OTP verified successfully.",
  });
});

// @disc Request Pickup
export const requestPickup = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  //Fetch user with claimed donations and claimed NGO details
  const user = await User.findById(userId).populate({
    path: 'donationHistory',
    match: { status: 'claimed' },
    options: { sort: { createdAt: -1 } },
    populate: {
      path: 'claimedBy',
      model: 'NGO',
      select: 'organizationName email phone address location'
    }
  });

  if (!user || user.donationHistory.length === 0) {
    return next(new ErrorHandler('No claimed donations found for this user.', 404));
  }

  //Build response array: donation + claimed NGO
  const pickupRequests = user.donationHistory.map(donation => ({
    donationId: donation._id,
    item: donation.item || 'Food',
    quantity: donation.quantity,
    description: donation.description,
    pickupTime: donation.pickupTime,
    address: donation.pickupAddress,
    status: donation.status,
    ngo: donation.claimedBy,
  }));

  res.status(200).json({
    success: true,
    message: 'Pickup requests retrieved successfully.',
    data: {
      donor: {
        name: user.name,
        email: user.email,
      },
      pickups: pickupRequests
    },
  });
});

