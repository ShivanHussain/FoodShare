import express from 'express';
import { isAuthenticated, isNgo } from '../middlewares/auth.js';
import { getMyNotifications, getNgoNotificationsWithDetails, markNotificationRead } from '../controllers/notificationController.js';


const router = express.Router();

router.get('/my', isAuthenticated, getMyNotifications);
router.patch('/:id/read', isAuthenticated, markNotificationRead);
router.get('/ngo/details', isAuthenticated, isNgo, getNgoNotificationsWithDetails);
export default router;
