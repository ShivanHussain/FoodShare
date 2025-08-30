import { Notification } from '../models/Notification.js';
import { Donation } from '../models/Donation.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import { User } from '../models/User.js';

// @desc Get all unread notifications for logged-in NGO
export const getMyNotifications = catchAsyncErrors(async (req, res) => {
  const notifications = await Notification.find({
    recipient: req.user._id,
    isRead: false,
    status: "pending",
  })
    .populate('donation', 'foodType pickupAddress createdAt quantity category expiresAt ')
    .sort({ createdAt: -1 }); // Newest first


  res.status(200).json({
    success: true,
    notifications,
  });

});


// @desc Mark a notification as read
export const markNotificationRead = catchAsyncErrors(async (req, res, next) => {

  const { statusValue } = req.body;
  debugNotificationController("status mark Notification Read ", statusValue);
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, recipient: req.user._id },
    { isRead: true, status: statusValue },
    { new: true, runValidators: true }
  );

  if (!notification) {
    return next(new ErrorHandler("Notification not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Marked as read and accepted",
    notification,
  });
});



// @desc Get all notifications for NGO with details
export const getNgoNotificationsWithDetails = catchAsyncErrors(async (req, res, next) => {
  const ngoId = req.user?._id;
  if (!ngoId) return next(new ErrorHandler('Unauthorized', 401));

  const { page = 1, limit = 9, search = '', status = 'all' } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  //Base filter for notifications (NGO + search)
  const filter = { recipient: ngoId };
  if (status !== 'all') filter.status = status;
  if (search.trim()) filter.message = { $regex: search, $options: 'i' };

  //Donation status condition based on notification status
  let donationMatch = {};
  if (status === 'all' || status === 'pending') {
    donationMatch = { status: 'available' };
  } else if (status === 'accept') {
    donationMatch = { status: { $in: ['claimed', 'pick-up'] } };
  } else if (status === 'reject') {
    donationMatch = {}; // reject case → no restriction on donation
  }

  //Fetch notifications
  let notificationsdata = await Notification.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .populate([
      {
        path: 'donation',
        model: 'Donation',
        match: donationMatch, //dynamic donation filter
        populate: [
          {
            path: 'donorId',
            model: 'User',
            select: '-password -resetPasswordToken -resetPasswordExpire -__v'
          },
          {
            path: 'claimedBy',
            model: 'NGO',
            select: '-__v'
          }
        ]
      },
      {
        path: 'sender',
        model: 'User',
        select: '-password -resetPasswordToken -resetPasswordExpire -__v'
      }
    ]);

  //Remove notifications with null donations (only if donationMatch is applied)
  if (status !== 'reject') {
    notificationsdata = notificationsdata.filter(n => n.donation !== null);
  }

  res.status(200).json({
    success: true,
    count: notificationsdata.length,
    notifications: notificationsdata
  });
});



