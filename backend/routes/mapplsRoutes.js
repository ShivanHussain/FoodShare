// routes/mapplsRoutes.js
import express from 'express';
import { checkMapplsAPIHealth, getMapplsDistanceAndETA, getToken } from '../controllers/mapplsController.js';
import { isAuthenticated, isDonor } from '../middlewares/auth.js';

const router = express.Router();

// Token endpoint
router.get('/token', isAuthenticated, isDonor, getToken);

// Distance/ETA endpoint 
router.get('/distance', isAuthenticated, isDonor, getMapplsDistanceAndETA);

//
router.get('/health',isAuthenticated,checkMapplsAPIHealth);

export default router;