import express from 'express';
import { isAuthenticated, isDonor, isNgo } from '../middlewares/auth.js'
import { requestPickup, sendEmailOtp, verifyOtp } from '../controllers/otpVerificationController.js';

const router = express.Router();


router.get("/:donationId/send/:notificationId", isAuthenticated, isNgo, sendEmailOtp);
router.post('/verify-otp',isAuthenticated, isDonor, verifyOtp);
router.get("/request", isAuthenticated, isDonor, requestPickup);



export default router;