import { User } from '../models/User.js';
import { NGO } from '../models/Ngo.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';

// @desc Color mapping for categories
const getCategoryColor = (category) => {
  const colors = {
    'Vegetables': '#10B981',
    'Fresh Fruits': '#F59E0B',
    'Cooked Meals': '#8B5CF6',
    'Dairy Products': '#EF4444',
    'Bakery Items': '#6B7280',
    'Packaged Food': '#3B82F6',
    'Beverages': '#F97316',
    'Other': '#6B7280'
  };
  return colors[category] || '#6B7280';
};

// @ desc Dashboard Analytics
export const getDashboardAnalytics = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: 'donationHistory',
    match: {
      status: { $in: ['claimed', 'picked-up'] } 
    }
  });

  if (!user) return next(new ErrorHandler('User not found', 404));

  const donations = user.donationHistory || [];

  const totalFoodDonated = donations.reduce((sum, d) => sum + (d.quantity || 0), 0);
  const totalMeals = donations.reduce((sum, d) => sum + (d.servings || 0), 0);
  const co2Saved = Math.round(totalFoodDonated * 2.5);
  const activeNGOs = await NGO.countDocuments({ isActive: true });

  res.status(200).json({
    success: true,
    data: {
      totalFoodDonated,
      totalMeals,
      activeNGOs,
      co2Saved,
      changes: {
        donationChange: 0,
        mealChange: 0,
        ngoChange: 0,
        co2Change: 0
      }
    }
  });

});


// @desc Weekly Graph Data
export const getWeeklyData = catchAsyncErrors(async (req, res, next) => {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const user = await User.findById(req.user.id).populate({
    path: 'donationHistory',
    match: {
      createdAt: { $gte: weekAgo },
      status: { $in: ['claimed', 'picked-up', 'expired', 'available'] }
    }
  });
  if (!user) return next(new ErrorHandler('User not found', 404));

  const donations = user.donationHistory || [];
  const grouped = {};

  donations.forEach(d => {
    const day = new Date(d.createdAt).getDay();
    if (!grouped[day]) grouped[day] = { donated: 0, wasted: 0, saved: 0 };

    if (['claimed', 'picked-up', 'expired', 'available'].includes(d.status)) {
      grouped[day].donated += d.quantity || 0;
      grouped[day].saved += (d.quantity || 0) * 20;
    } else if (d.status === 'expired') {
      grouped[day].wasted += d.quantity || 0;
    }
  });

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const formatted = Object.entries(grouped).map(([i, val]) => ({
    name: dayNames[i],
    ...val
  })).sort((a, b) => dayNames.indexOf(a.name) - dayNames.indexOf(b.name));

  res.status(200).json({ success: true, data: formatted });
});

// @desc Pie Chart Distribution
export const getFoodTypeDistribution = catchAsyncErrors(async (req, res, next) => {

  const past30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const user = await User.findById(req.user.id).populate({
    path: 'donationHistory',
    match: {
      createdAt: { $gte: past30 },
      status: { $in: ['claimed', 'picked-up','available'] }
    }
  });
  if (!user) return next(new ErrorHandler('User not found', 404));

  const donations = user.donationHistory || [];
  const map = {};

  for (const d of donations) {
    if (!map[d.category]) map[d.category] = { count: 0, totalQuantity: 0 };
    map[d.category].count += 1;
    map[d.category].totalQuantity += d.quantity || 0;
  }

  const total = Object.values(map).reduce((sum, i) => sum + i.count, 0);

  const result = Object.entries(map).map(([name, { count }]) => ({
    name,
    value: Math.round((count / total) * 100),
    color: getCategoryColor(name)
  }));

  res.status(200).json({ success: true, data: result });
});

// @desc Impact Over 6 Months
export const getImpactData = catchAsyncErrors(async (req, res, next) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const user = await User.findById(req.user.id).populate({
    path: 'donationHistory',
    match: {
      createdAt: { $gte: sixMonthsAgo },
      status: { $in: ['claimed', 'picked-up'] }
    }
  });
  if (!user) return next(new ErrorHandler('User not found', 404));

  const donations = user.donationHistory || [];
  const grouped = {};

  for (const d of donations) {
    const date = new Date(d.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!grouped[key]) grouped[key] = { meals: 0, co2: 0, water: 0 };

    grouped[key].meals += d.servings || 0;
    grouped[key].co2 += (d.quantity || 0) * 2.5;
    grouped[key].water += (d.quantity || 0) * 50;
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const result = Object.entries(grouped).map(([key, val]) => {
    const [, month] = key.split('-');
    return {
      month: monthNames[parseInt(month)],
      meals: val.meals,
      co2: Math.round(val.co2),
      water: Math.round(val.water)
    };
  });

  res.status(200).json({ success: true, data: result });
});

// @desc Performance Metrics
export const getPerformanceMetrics = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: 'donationHistory',
    match: {
      status: { $in: ['claimed', 'picked-up'] },
      claimedAt: { $exists: true }
    }
  });
  if (!user) return next(new ErrorHandler('User not found', 404));

  const donations = user.donationHistory || [];
  const total = donations.length;
  const successful = donations.filter(d => ['claimed', 'picked-up'].includes(d.status)).length;

  const avgResponseTime = donations.reduce((sum, d) => {
    if (!d.createdAt || !d.claimedAt) return sum;
    const diff = (new Date(d.claimedAt) - new Date(d.createdAt)) / (1000 * 60);
    return sum + diff;
  }, 0) / (total || 1);

  res.status(200).json({
    success: true,
    data: {
      avgResponseTime: Math.round(avgResponseTime),
      coverageArea: 47, 
      successRate: Math.round((successful / (total || 1)) * 1000) / 10
    }
  });
});

