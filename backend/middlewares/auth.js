import jwt from "jsonwebtoken";
import { NGO } from "../models/Ngo.js";
import { User } from "../models/User.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";

// @desc Common authentication middleware
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  let token = req.cookies.token;

  // Token from Authorization header if not in cookie
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) return next(new ErrorHandler("User not authenticated!", 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find user in User or NGO collection
    let user = await User.findById(decoded.id);
    if (!user) {
      user = await NGO.findById(decoded.id);
      if (!user) return next(new ErrorHandler("User no longer exists!", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    // Remove expired/invalid token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    const message =
      error.name === "TokenExpiredError"
        ? "Token expired!"
        : error.name === "JsonWebTokenError"
          ? "Invalid token!"
          : "Authentication failed!";
    return next(new ErrorHandler(message, 401));
  }
});

// @desc Role-based middlewares -----> NGO
export const isNgo = catchAsyncErrors(async (req, res, next) => {
  if (!req.user || req.user.role !== "ngo") {
    return next(new ErrorHandler("Access denied: NGO only route", 403));
  }
  next();
});


// @desc Role-based middlewares -------> Admin
export const isAdmin = catchAsyncErrors(async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return next(new ErrorHandler("Access denied: Admin only route", 403));
  }
  next();
});

//@desc Role-based middlewares ------> donor
export const isDonor = catchAsyncErrors(async (req, res, next) => {
  if (!req.user || req.user.role !== "donor") {
    return next(new ErrorHandler("Access denied: Donor only route", 403));
  }
  next();
});
