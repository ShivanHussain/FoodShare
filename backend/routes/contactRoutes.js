import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { getAllMessages, submitContactForm } from "../controllers/contactController.js";

const router = express.Router();



router.post('/', submitContactForm);

// Admin-only route to fetch contact messages
router.get('/', isAuthenticated, isAdmin, getAllMessages);



export default router;