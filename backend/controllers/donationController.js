import { Donation } from '../models/Donation.js';
import ErrorHandler from '../middlewares/error.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import cloudinary from 'cloudinary';
import { getCoordinatesFromAddress } from '../utils/geocode.js';
import { NGO } from '../models/Ngo.js'
import { Notification } from '../models/Notification.js';
import { User } from '../models/User.js';


// @desc Helper function to upload multiple files to Cloudinary
const uploadImages = async (filesArray) => {
  const uploadedImages = [];

  for (const file of filesArray) {
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: 'FOODSHARE_DONATION_IMAGES',
    });

    uploadedImages.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  return uploadedImages;
};


// @desc create donations
export const createDonation = catchAsyncErrors(async (req, res, next) => {
  const {
    foodType,
    category,
    quantity,
    unit,
    servings,
    description,
    contactPerson,
    contactPhone,
    pickupAddress,
    foodPreference,
    email,
    alternateContactNumber,
    expiryDate,
    expiryTime,
    foodCondition
  } = req.body;

  // Validate required fields
  if (!foodType || !category || !quantity || !pickupAddress || !foodPreference || !contactPerson
    || !contactPhone || !email || !expiryDate || !foodCondition) {
    return next(new ErrorHandler("All fields Required!", 400));
  }

  // Validate image presence
  if (!req.files || !req.files.images) {
    return next(new ErrorHandler("Donation image is required", 400));
  }

  // Validate phone number (Indian format)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(contactPhone)) {
    return next(new ErrorHandler("Invalid phone number", 400));
  }

  // Validate pickup address
  if (pickupAddress.length < 10 || !/\b\d{6}\b/.test(pickupAddress)) {
    return next(new ErrorHandler("Address must include a valid 6-digit pincode", 400));
  }

  // Get coordinates from address
  const coords = await getCoordinatesFromAddress(pickupAddress);
  if (!coords) {
    return next(new ErrorHandler("Invalid address", 400));
  }

  // Upload images to Cloudinary
  let images = [];
  const fileList = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
  images = await uploadImages(fileList);
  if (!images.length) {
    return next(new ErrorHandler("Image upload failed", 500));
  }

  // Create the donation entry
  const donation = await Donation.create({
    foodType,
    category,
    foodPreference,
    quantity,
    unit,
    servings,
    description,
    images,
    contactPerson,
    contactPhone,
    pickupAddress,
    email,
    alternateContactNumber,
    expiryDate,
    expiryTime,
    foodCondition,
    location: {
      type: 'Point',
      coordinates: [parseFloat(coords.longitude), parseFloat(coords.latitude)],
    },
    donorId: req.user.id,
  });

  // Update donor's donation history
  await User.findByIdAndUpdate(req.user._id, {
    $push: { donationHistory: donation._id },
  });

  // Fetch all NGOs and create notifications in bulk
  const allNgos = await NGO.find({});
  const notifications = allNgos.map(ngo => ({
    recipient: ngo._id,
    donation: donation._id,
    type: 'donation',
    sender: req.user._id, // Optional: track who triggered the notification
  }));

  await Notification.insertMany(notifications);

  // Emit real-time alert to all NGOs (using global or NGO room)
  const io = req.app.get("io");
  io.emit("donation-alert", {
    donationId: donation._id,
    foodType,
    category,
    quantity,
    pickupAddress,
    createdAt: donation.createdAt,
  });

  // Respond to the client
  res.status(201).json({
    success: true,
    message: "Donation created successfully",
    data: donation
  });
});


// @desc Get all donations with filters
export const getDonations = catchAsyncErrors(async (req, res) => {
  const {
    status = 'available',
    category,
    latitude,
    longitude,
    radius = 10000,
    page = 1,
    limit = 10
  } = req.query;

  const query = { status };

  if (category) query.category = category;

  if (latitude && longitude) {
    query.location = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        $maxDistance: parseInt(radius)
      }
    };
  }

  const donations = await Donation.find(query)
    .populate('donorId', 'name phone')
    .populate('claimedBy', 'name contactPerson')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Donation.countDocuments(query);

  res.status(200).json({
    success: true,
    data: donations,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc Get donation by ID
export const getDonationById = catchAsyncErrors(async (req, res, next) => {
  const donation = await Donation.findById(req.params.id)
    .populate('donorId', 'name email phone')
    .populate('claimedBy', 'name contactPerson phone');

  if (!donation) {
    return next(new ErrorHandler("Donation not found", 404));
  }

  res.status(200).json({ success: true, data: donation });
});


// @desc Claim a donation (NGO)
export const claimDonation = catchAsyncErrors(async (req, res, next) => {
  const donationId = req.params.id;
  const { statusValue } = req.body;
  let donation;

  // If status is 'accepted', update donation to claimed
  if (statusValue === 'accepted') {
    donation = await Donation.findOneAndUpdate(
      { _id: donationId, status: 'available' },
      {
        status: 'claimed',
        claimedBy: req.user._id,
        claimedAt: new Date(),
      },
      { new: true }
    );

    if (!donation) {
      return next(new ErrorHandler("Donation already claimed or not found", 400));
    }

    // Update NGO's claimedDonations list
    await NGO.findByIdAndUpdate(req.user._id, {
      $push: { claimedDonations: donation._id },
    });

    // Emit socket event
    const io = req.app.get("io");
    io.emit("donation-claimed", {
      donationId: donation._id,
      claimedBy: {
        id: req.user._id,
        name: req.user.name,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Donation claimed successfully",
      data: donation,
    });
  }

  // If status is 'rejected', only record the rejection
  if (statusValue === 'rejected') {
    donation = await Donation.findOneAndUpdate(
      { _id: donationId, status: 'available' },
      {
        $addToSet: { rejectedBy: req.user._id }, // Avoid duplicates
      },
      { new: true }
    );

    if (!donation) {
      return next(new ErrorHandler("Donation already claimed or not found", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Donation rejection recorded",
      data: donation,
    });
  }

  // Handle unsupported status
  return next(new ErrorHandler("Invalid status value", 400));
});


// @desc Update donation status
export const updateDonationStatus = catchAsyncErrors(async (req, res, next) => {
  const { status } = req.body;
  const donation = await Donation.findById(req.params.id);

  if (!donation) return next(new ErrorHandler("Donation not found", 404));

  if (req.user.role !== 'admin' && donation.donorId.toString() !== req.user.id) {
    return next(new ErrorHandler("Not authorized to update this donation", 403));
  }

  donation.status = status;
  await donation.save();

  res.status(200).json({
    success: true,
    message: "Donation status updated successfully",
    data: donation
  });
});

// @desc Get donations for logged-in user
export const getUserDonations = catchAsyncErrors(async (req, res) => {
  const donations = await Donation.find({ donorId: req.user.id })
    .populate('claimedBy', 'name contactPerson')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: donations
  });
});


// @desc claimed Donation 
export const ClaimedDonationByDonor = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;


  const user = await User.findById(userId).populate({
    path: 'donationHistory',
    populate: {
      path: 'claimedBy',
      model: 'NGO',
      select: 'name email phone address organizationName location',
    },
  });

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  const claimedDonations = user.donationHistory.filter(
    (donation) => donation.status === 'claimed'
  );

  res.status(200).json({
    success: true,
    claimedDonations,
  });
});


export const ClaimedDonationsByNgo = catchAsyncErrors(async (req, res, next) => {
  const ngoId = req.user._id;

  const ngo = await NGO.findById(ngoId)
    .populate({
      path: "claimedDonations",
      populate: {
        path: "donorId", 
        model: "User",    
        select: "name email phone address"
      }
    });

  if (!ngo) {
    return next(new ErrorHandler("NGO not found", 404));
  }

  res.status(200).json({
    success: true,
    claimedDonations: ngo.claimedDonations,
  });
});








