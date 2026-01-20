const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Contact form route
router.post('/submit', contactController.submitInquiry);

module.exports = router;
