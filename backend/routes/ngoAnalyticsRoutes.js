import express from "express";
import { isAuthenticated, isNgo } from "../middlewares/auth.js";
import { fetchYearlyTrendData, getAverageResponseTime, getCO2Saved, getMoneyValueSaved, getTotalMeals, 
    getTotalPickups, getWasteReduced } from "../controllers/ngoAnalyticsController.js";


const router = express.Router();

router.get("/impact/total-meals", isAuthenticated,isNgo, getTotalMeals);
router.get("/impact/total-pickups", isAuthenticated, isNgo, getTotalPickups);
router.get("/impact/waste-reduced", isAuthenticated,isNgo, getWasteReduced);
router.get("/impact/co2-saved", isAuthenticated, isNgo, getCO2Saved);
router.get("/impact/money-saved", isAuthenticated, isNgo, getMoneyValueSaved);
router.get("/impact/avg-response-time", isAuthenticated, isNgo, getAverageResponseTime);
router.get("/impact/yearly-trend", isAuthenticated, isNgo, fetchYearlyTrendData);


export default router;
