const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const { protect } = require('../middlewares/authMiddleware');

// All routes require authentication
router.use(protect);


// Profile routes
router.get('/profile', userProfileController.getProfile);
router.put('/profile', userProfileController.updateProfile);

// Password and email routes
router.put('/change-password', userProfileController.changePassword);
router.put('/update-email', userProfileController.updateEmail);

// Account deletion
router.delete('/account', userProfileController.deleteAccount);

// Application routes
router.get('/applied-jobs', userProfileController.getAppliedJobs);
router.post('/apply', userProfileController.applyForJob);

// Favorite routes
router.get('/favorites', userProfileController.getFavoriteJobs);
router.post('/favorites', userProfileController.addFavorite);
router.delete('/favorites/:jobId', userProfileController.removeFavorite);

module.exports = router;
