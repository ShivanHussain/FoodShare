import express from 'express';
import {
  getDashboardAnalytics,
  getWeeklyData,
  getFoodTypeDistribution,
  getImpactData,
  getPerformanceMetrics,
} from '../controllers/donorAnalyticsController.js';
import { isAuthenticated, isDonor } from '../middlewares/auth.js';

const router = express.Router();

//Donor Analytics Routes
router.get('/dashboard', isAuthenticated, isDonor, getDashboardAnalytics);
router.get('/weekly', isAuthenticated, isDonor, getWeeklyData);
router.get('/food-types', isAuthenticated, isDonor, getFoodTypeDistribution);
router.get('/impact', isAuthenticated, isDonor, getImpactData);
router.get('/performance', isAuthenticated, isDonor, getPerformanceMetrics);

export default router;