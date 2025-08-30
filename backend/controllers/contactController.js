import { ContactMessage } from '../models/ContactMessage.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';

// @desc    Handle contact form submission
// @route   POST /api/v1/contact
export const submitContactForm = catchAsyncErrors(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return next(new ErrorHandler('All fields are required', 400));
  }

  const newMessage = await ContactMessage.create({ name, email, subject, message });

  res.status(201).json({
    success: true,
    message: "Message received successfully",
    data: newMessage
  });
});






// @access  Admin only
export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: messages.length,
    messages,
  });
});