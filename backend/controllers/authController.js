import { User } from "../models/User.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { generateToken } from "../utils/jwtToken.js";
import { OAuth2Client } from "google-auth-library";
import cloudinary from "cloudinary";
import { getCoordinatesFromAddress } from "../utils/geocode.js";
import { NGO } from "../models/Ngo.js";
import { verifyEmail } from '../utils/verifyEmail.js';

// Google OAuth Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @route   POST /api/v1/signup/donor
export const donorsignup = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    role,
  } = req.body;

  // Check for avatar upload
  if (!req.files || !req.files.avatar) {
    return next(new ErrorHandler("Avatar is required", 400));
  }

  // Validate input
  if (!name || !email || !password || !phone || !address || !role) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // Email verification with enhanced validation
  const emailVerificationResult = await verifyEmail(email);

  if (!emailVerificationResult.isValid) {
    return next(new ErrorHandler("Invalid email format", 400));
  }

  // Check email quality and deliverability
  if (emailVerificationResult.deliverability === 'UNDELIVERABLE') {
    return next(new ErrorHandler("Email address is not deliverable", 400));
  }

  // Block disposable emails for better quality
  if (emailVerificationResult.isDisposable) {
    return next(new ErrorHandler("Disposable email addresses are not allowed", 400));
  }

  // Validate phone number (Indian format)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return next(new ErrorHandler("Invalid phone number", 400));
  }

  // Address format check (length and pincode)
  if (address.length < 10 || !/\b\d{6}\b/.test(address)) {
    return next(new ErrorHandler("Address must include a valid 6-digit pincode", 400));
  }

  // Get coordinates from address
  const coords = await getCoordinatesFromAddress(address);
  if (!coords) return next(new ErrorHandler("Invalid address", 400));

  const normalizedEmail = email.trim().toLowerCase();

  // Check for duplicate email across both User and NGO collections
  const [existingUserdonor, existingUserngo] = await Promise.all([
    User.findOne({ email: normalizedEmail }),
    NGO.findOne({ email: normalizedEmail })
  ]);

  if (existingUserdonor || existingUserngo) {
    return next(new ErrorHandler("Email already registered", 400));
  }

  // Check for duplicate phone Number across both collections
  const [existingUserNumberdonor, existingUserNumberngo] = await Promise.all([
    User.findOne({ phone }),
    NGO.findOne({ phone })
  ]);

  if (existingUserNumberdonor || existingUserNumberngo) {
    return next(new ErrorHandler("Phone Number already registered", 400));
  }

  // Upload avatar to Cloudinary
  const avatarUpload = await cloudinary.v2.uploader.upload(req.files.avatar.tempFilePath, {
    folder: "FOODSHARE_USER_IMAGE",
  });

  // Create user (donor) with normalized email
  const user = await User.create({
    name,
    email: email.trim().toLowerCase(), // Store normalized email
    password,
    phone,
    address,
    role,
    location: {
      type: "Point",
      coordinates: [coords.longitude, coords.latitude],
    },
    avatar: {
      public_id: avatarUpload.public_id,
      url: avatarUpload.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "Signup Successful",
  });
});


// @route   POST /api/v1/signup/ngo
export const ngosignup = catchAsyncErrors(async (req, res, next) => {
  const {
    name,   //==> Contact Person Name
    email,
    password,
    phone,
    address,
    role,
    registrationNumber,
    organizationName
  } = req.body;

  // Check for avatar upload
  if (!req.files || !req.files.avatar) {
    return next(new ErrorHandler("Avatar is required", 400));
  }

  // Validate input
  if (!name || !email || !password || !phone || !address || !role || !registrationNumber || !organizationName) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // Email verification with enhanced validation
  const emailVerificationResult = await verifyEmail(email);

  if (!emailVerificationResult.isValid) {
    return next(new ErrorHandler("Invalid email format", 400));
  }

  // Check email quality and deliverability
  if (emailVerificationResult.deliverability === 'UNDELIVERABLE') {
    return next(new ErrorHandler("Email address is not deliverable", 400));
  }

  // Block disposable emails for NGOs (higher security requirement)
  if (emailVerificationResult.isDisposable) {
    return next(new ErrorHandler("Disposable email addresses are not allowed for NGO registration", 400));
  }

  // Validate phone number (Indian format)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return next(new ErrorHandler("Invalid phone number", 400));
  }

  // Address format check (length and pincode)
  if (address.length < 10 || !/\b\d{6}\b/.test(address)) {
    return next(new ErrorHandler("Address must include a valid 6-digit pincode", 400));
  }

  // Get coordinates from address
  const coords = await getCoordinatesFromAddress(address);
  if (!coords) return next(new ErrorHandler("Invalid address", 400));

  const normalizedEmail = email.trim().toLowerCase();

  // Check for duplicate email across both User and NGO collections
  const [existingUserdonor, existingUserngo] = await Promise.all([
    User.findOne({ email: normalizedEmail }),
    NGO.findOne({ email: normalizedEmail })
  ]);

  if (existingUserdonor || existingUserngo) {
    return next(new ErrorHandler("Email already registered", 400));
  }

  // Check for duplicate phone Number across both collections
  const [existingUserNumberdonor, existingUserNumberngo] = await Promise.all([
    User.findOne({ phone }),
    NGO.findOne({ phone })
  ]);

  if (existingUserNumberdonor || existingUserNumberngo) {
    return next(new ErrorHandler("Phone Number already registered", 400));
  }

  // Upload avatar to Cloudinary
  const avatarUpload = await cloudinary.v2.uploader.upload(req.files.avatar.tempFilePath, {
    folder: "FOODSHARE_USER_IMAGE",
  });

  // Create NGO user with normalized email
  const user = await NGO.create({
    name,
    email: normalizedEmail, // Store normalized email
    password,
    phone,
    address,
    role,
    registrationNumber,
    organizationName,
    location: {
      type: "Point",
      coordinates: [coords.longitude, coords.latitude],
    },
    avatar: {
      public_id: avatarUpload.public_id,
      url: avatarUpload.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "signup successful",
  });
});




// @desc login donor/Ngo
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required", 400));
  }

  //Check in User model
  let user = await User.findOne({ email }).select("+password");
  if (user) {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    return generateToken(user, "login successful", 200, res);
  }

  // If not found, check in NGO model
  let ngoUser = await NGO.findOne({ email }).select("+password");
  if (ngoUser) {
    const isMatch = await ngoUser.comparePassword(password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    return generateToken(ngoUser, "login successful", 200, res);
  }

  // No user found in either collection
  return next(new ErrorHandler("Invalid email or password", 401));
});



// @route   POST /api/v1/auth/google
export const googleAuth = catchAsyncErrors(async (req, res, next) => {
  const { credential } = req.body;

  if (!credential) {
    return next(new ErrorHandler("Google token is required", 400));
  }

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { email, name, picture } = payload;

  if (!email || !name) {
    return next(new ErrorHandler("Incomplete Google profile data", 400));
  }

  let user = await User.findOne({ email });

  // If user doesn't exist, create one
  if (!user) {
    user = await User.create({
      name,
      email,
      password: email + process.env.JWT_SECRET_KEY,
      googleAuthenticated: true,
      avatar: {
        public_id: "google_user",
        url: picture || "https://via.placeholder.com/150",
      },
    });
  }

  generateToken(user, "Google login successful", 200, res);
});


// @route   GET /api/v1/profile
export const getMyProfile = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("Not authenticated", 401));
  }

  let user = await User.findById(req.user.id);
  if (!user) {
    user = await NGO.findById(req.user.id);
  }
  res.status(200).json({ success: true, user });
});


// @route   GET /api/v1/logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    })
    .json({ success: true, message: "Logged out successfully" });
});











