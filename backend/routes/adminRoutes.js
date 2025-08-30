import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { deleteDonationById, deleteUserById, getAllContacts, getAllDonation, getAllFeedback, getAllNewsletters, getAllNgos, getAllUsers, getCategoryDistribution, getDashboardStats, getDonationByIdWithDetails, getDonationTrends, getExpiryAnalytics, getFoodPreferenceStats, getLocationAnalytics, getMonthlyComparison, getNGOPerformance, getRecentActivity, getStatusBreakdown, getTimeBasedAnalytics, getTopDonors, getUserById, getUserByIdWithDetails, updateDonationStatus, updateUserRole, updateVerifiedStatus } from "../controllers/adminController.js";

const router = express.Router();


//====================User & NGO Routes====================//

// Get all users
router.get("/users", isAuthenticated, isAdmin, getAllUsers);

// Get all NGOs
router.get("/ngos", isAuthenticated, isAdmin, getAllNgos);

// Get user by ID
router.get("/users/:id", isAuthenticated, isAdmin, getUserById);


router.get("/users/details/:id", isAuthenticated, isAdmin, getUserByIdWithDetails);

// Delete user by ID
router.delete("/users/:id", isAuthenticated, isAdmin, deleteUserById);

// Update user role
router.patch("/users/:id/role", isAuthenticated, isAdmin, updateUserRole);

// update status
router.patch("/users/:id/verify",isAuthenticated, isAdmin, updateVerifiedStatus);







//====================Donation Routes====================//

// Get all donations
router.get("/donations", isAuthenticated, isAdmin, getAllDonation);


router.get("/donations/details/:id", isAuthenticated, isAdmin, getDonationByIdWithDetails);

// Get donation by ID
router.put("/donations/:id", isAuthenticated, isAdmin, updateDonationStatus);

// Delete donation by ID
router.delete("/donations/:id", isAuthenticated, isAdmin, deleteDonationById);



//====================Feedback Routes====================//

router.get("/feedbacks", isAuthenticated, isAdmin, getAllFeedback);



//====================Contact Message Routes====================//

router.get("/contact-messages", isAuthenticated, isAdmin, getAllContacts);


//====================Newsletter Routes====================//

router.get("/newsletters", isAuthenticated, isAdmin, getAllNewsletters);



//=============================Analytics Controller======================//

// Dashboard Overview Stats
router.get('/dashboard/stats', isAuthenticated, isAdmin, getDashboardStats);

router.get('/analytics/donation-trends', isAuthenticated, isAdmin, getDonationTrends);

router.get('/analytics/category-distribution', isAuthenticated, isAdmin, getCategoryDistribution);

router.get('/analytics/location-analytics', isAuthenticated, isAdmin, getLocationAnalytics);

router.get('/analytics/status-breakdown', isAuthenticated, isAdmin, getStatusBreakdown);

router.get('/analytics/ngo-performance', isAuthenticated, isAdmin, getNGOPerformance);

router.get('/analytics/monthly-comparison', isAuthenticated, isAdmin, getMonthlyComparison);

router.get('/analytics/expiry-analytics', isAuthenticated, isAdmin, getExpiryAnalytics);

router.get('/analytics/food-preference', isAuthenticated, isAdmin, getFoodPreferenceStats);

router.get('/analytics/top-donors', isAuthenticated, isAdmin, getTopDonors);

router.get('/analytics/recent-activity', isAuthenticated, isAdmin, getRecentActivity);

router.get('/analytics/time-based', isAuthenticated, isAdmin, getTimeBasedAnalytics);


export default router;
