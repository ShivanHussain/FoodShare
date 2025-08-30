
// NGO Analytics Routes
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { NGO } from "../models/Ngo.js";

// @disc Get total meals
export const getTotalMeals = catchAsyncErrors(async (req, res, next) => {
  const ngo = await NGO.findById(req.user.id).populate("claimedDonations");

  if (!ngo) return next(new ErrorHandler("NGO not found", 404));

  const totalMeals = ngo.claimedDonations.reduce((sum, d) => {
    return sum + (d.servings || d.quantity || 0);
  }, 0);

  res.status(200).json({ success: true, totalMeals });
});




// @disc Get total pickups
export const getTotalPickups = catchAsyncErrors(async (req, res, next) => {
  const ngo = await NGO.findById(req.user.id).populate("claimedDonations");

  if (!ngo) return next(new ErrorHandler("NGO not found", 404));

  const pickedUpDonations = ngo.claimedDonations.filter(
    (donation) => donation.status === "picked-up"
  );

  res.status(200).json({
    success: true,
    totalPickups: pickedUpDonations.length,
  });
});




// @disc Get waste reduced
export const getWasteReduced = catchAsyncErrors(async (req, res, next) => {
  const ngo = await NGO.findById(req.user.id).populate("claimedDonations");
  if (!ngo) return next(new ErrorHandler("NGO not found", 404));

  const wasteReduced = ngo.claimedDonations.reduce((sum, d) => {
    return sum + (d.quantity || 0);
  }, 0);

  res.status(200).json({ success: true, wasteReduced });
});



// @disc Get CO2 saved
export const getCO2Saved = catchAsyncErrors(async (req, res, next) => {
  const ngo = await NGO.findById(req.user.id).populate("claimedDonations");
  if (!ngo) return next(new ErrorHandler("NGO not found", 404));

  const co2Saved = ngo.claimedDonations.reduce((sum, d) => {
    return sum + (d.quantity || 0);
  }, 0); // Assuming 1 kg waste = 1 kg CO₂

  res.status(200).json({ success: true, co2Saved });
});


// @disc Get money value saved
// Assuming ₹25 per meal saved
export const getMoneyValueSaved = catchAsyncErrors(async (req, res, next) => {
  const ngo = await NGO.findById(req.user.id).populate("claimedDonations");
  if (!ngo) return next(new ErrorHandler("NGO not found", 404));

  const totalMeals = ngo.claimedDonations.reduce((sum, d) => {
    return sum + (d.servings || d.quantity || 0);
  }, 0);

  const moneyValueSaved = totalMeals * 25; // ₹25 per meal

  res.status(200).json({ success: true, moneyValueSaved });
});


// @disc Get average response time
export const getAverageResponseTime = catchAsyncErrors(async (req, res, next) => {
  const ngo = await NGO.findById(req.user.id).populate("claimedDonations");
  if (!ngo) return next(new ErrorHandler("NGO not found", 404));

  const claimedDonations = ngo.claimedDonations;

  let totalMinutes = 0;
  let count = 0;

  claimedDonations.forEach(d => {
    if (d.createdAt && d.claimedAt) {
      const minutes = Math.floor((new Date(d.claimedAt) - new Date(d.createdAt)) / (1000 * 60));
      totalMinutes += minutes;
      count += 1;
    }
  });

  const averageResponseTime = count > 0 ? Math.round(totalMinutes / count) : 0;

  res.status(200).json({ success: true, averageResponseTime });
});



// @desc Get yearly trend data (number of donations claimed per month)
// @route GET /api/ngo/analytics/yearly-trend
// @access NGO (authenticated)
export const fetchYearlyTrendData = catchAsyncErrors(async (req, res, next) => {
  const ngo = await NGO.findById(req.user.id).populate("claimedDonations");

  if (!ngo) return next(new ErrorHandler("NGO not found", 404));

  const currentYear = new Date().getFullYear();

  // Initialize an array for all 12 months
  const monthlyCounts = Array(12).fill(0);

  ngo.claimedDonations.forEach(donation => {
    if (donation.claimedAt) {
      const claimedDate = new Date(donation.claimedAt);
      if (claimedDate.getFullYear() === currentYear) {
        const monthIndex = claimedDate.getMonth(); // 0 (Jan) to 11 (Dec)
        monthlyCounts[monthIndex]++;
      }
    }
  });

  res.status(200).json({
    success: true,
    year: currentYear,
    monthlyCounts, // e.g., [2, 5, 0, 3, ...]
  });
});
