const express = require('express');
const router = express.Router();
const { getVets } = require('../controllers/vetController');

router.route('/').get(getVets);

module.exports = router;
