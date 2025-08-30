
import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {  createFeedback, deleteFeedback, dislikeFeedback, getFeedbacksGiven, getFeedbacksReceived, getFeedbackStats, likeFeedback, markFeedbackAsRead } from "../controllers/feedbackController.js";


const router = express.Router();

// Create feedback
router.post("/create", isAuthenticated, createFeedback);


// Get feedbacks received by user
router.get("/received", isAuthenticated, getFeedbacksReceived);

// Get feedbacks given by user
router.get("/given", isAuthenticated, getFeedbacksGiven);

// Mark feedback as read
router.patch("/read/:feedbackId", isAuthenticated, markFeedbackAsRead);

// Get feedback statistics
router.get("/stats/:userId", isAuthenticated, getFeedbackStats);

// Delete feedback
router.delete("/:feedbackId", isAuthenticated, deleteFeedback);


// Like feedback
router.put("/like/:feedbackId", isAuthenticated, likeFeedback);

// Dislike feedback
router.put("/dislike/:feedbackId", isAuthenticated, dislikeFeedback);

export default router;



