import express from "express";
import {  updateProfile, changePassword,getAllDonationHistory, getRecentThreeDonationDonor, getRecentThreeDonationNgo, forgotPassword,
     resetPassword, getDonationHistoryByStatus, getAllUsersFeedback } from "../controllers/userController.js";
import {  isAuthenticated, isDonor, isNgo } from "../middlewares/auth.js";

const router = express.Router();

//-----------------------User Routes-----------------------

// Update profile route
router.put("/profile/update",isAuthenticated,updateProfile);


router.get("/all/feedback",isAuthenticated,getAllUsersFeedback);


// Get donation history by status
router.get("/history/status",isAuthenticated,isDonor,getDonationHistoryByStatus);

// Get all donation history for the authenticated donor
router.get("/history/:role",isAuthenticated,isDonor,getAllDonationHistory);


// Get recent three donations claimed by the donor
router.get("/history/recent/donor", isAuthenticated, isDonor, getRecentThreeDonationDonor);

// Get recent three donations claimed by the NGO
router.get("/history/recent/ngo", isAuthenticated, isNgo, getRecentThreeDonationNgo);

// Change password route
router.put("/password/change",isAuthenticated,changePassword);

// Forgot password route
router.post("/password/forgot", forgotPassword);

// Reset password route
router.put("/password/reset/:token", resetPassword);





export default router;
