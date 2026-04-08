const express = require('express');
const router = express.Router();
const { createSubscription, getUserSubscriptions, cancelSubscription } = require('../controllers/subscriptionController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, createSubscription)
  .get(protect, getUserSubscriptions);

router.route('/:id/cancel')
  .put(protect, cancelSubscription);

module.exports = router;
