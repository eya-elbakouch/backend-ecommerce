const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getAllOrders, updateOrderToDelivered } = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
  .post(protect, createOrder)
  .get(protect, getOrders);

router.route('/all')
  .get(protect, admin, getAllOrders);

router.route('/:id/deliver')
  .put(protect, admin, updateOrderToDelivered);

module.exports = router;
