import express from "express";
import { login, logout, googleAuth, getMyProfile,donorsignup, ngosignup } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


// User signup route for donors
router.post("/signup/donor", donorsignup);

// NGO signup route
router.post("/signup/ngo", ngosignup);

// Login route
router.post("/login", login);

// Google authentication route
router.post("/google",googleAuth);


// Get my profile route
router.get("/me", isAuthenticated, getMyProfile);

// Logout route
router.get("/logout",isAuthenticated,logout);


export default router;
