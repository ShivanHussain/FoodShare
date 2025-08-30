// controllers/newsletterController.js
import { Newsletter } from "../models/Newsletter.js";
import { sendEmail } from "../utils/sendEmail.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

export const subscribeNewsletter = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return next(new ErrorHandler("Please enter a valid email", 400));
  }

  // Check if already subscribed
  const existing = await Newsletter.findOne({ email });
  if (existing) {
    return next(new ErrorHandler("Email already subscribed", 409));
  }

  // Save in DB
  await Newsletter.create({ email });

  // Send confirmation email
  await sendEmail({
    email,
    subject: "Welcome to FoodShare Newsletter",
    message: `Thank you for subscribing to our FoodShare Newsletter!
            We'll keep you updated with our latest initiatives and news.`
  });

  res.status(201).json({
    success: true,
    message: "Subscribed successfully. Please check your email for confirmation."
  });
});
