const express = require('express');
const router = express.Router();
const { getPets, createPet, updatePet, deletePet } = require('../controllers/petController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getPets)
  .post(protect, createPet);

router.route('/:id')
  .put(protect, updatePet)
  .delete(protect, deletePet);

module.exports = router;
