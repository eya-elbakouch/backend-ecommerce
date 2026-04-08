const express = require('express');
const router = express.Router();
const { createAppointment, getMyAppointments, cancelAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, createAppointment).get(protect, getMyAppointments);
router.route('/:id/cancel').put(protect, cancelAppointment);

module.exports = router;
