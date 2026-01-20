const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/profile.controller');
const { protect } = require('../middlewares/authMiddleware'); // Verify this path/export

router.get('/', protect, getProfile);

module.exports = router;
