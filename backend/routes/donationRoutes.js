import { Router } from 'express';
import {
  getDonations,
  getDonationById,
  createDonation,
  getUserDonations,
  updateDonationStatus,
  claimDonation,
  ClaimedDonationByDonor,
  ClaimedDonationsByNgo
} from '../controllers/donationController.js';

import {
  isAuthenticated,
  isDonor,
  isNgo
} from '../middlewares/auth.js';

const router = Router();

router.get('/', getDonations);

router.get('/claimed/donor', isAuthenticated, isDonor, ClaimedDonationByDonor);

router.get('/claimed/ngo', isAuthenticated, isNgo, ClaimedDonationsByNgo);


router.get('/:id', getDonationById);


router.use(isAuthenticated);
router.post('/', isDonor, createDonation);
router.get('/user/my-donations', isDonor, getUserDonations);
router.patch('/:id/status', isDonor, updateDonationStatus);


// ==========================
// NGO routes
// ==========================
router.patch('/:id/claim', isNgo, claimDonation);

export default router;
