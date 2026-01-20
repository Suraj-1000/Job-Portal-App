const express = require('express');
const router = express.Router();
const publicJobController = require('../controllers/publicJobController');

// Public job routes (no authentication required)
router.get('/jobs', publicJobController.getPublicJobs);
router.get('/jobs/:id', publicJobController.getJobById);
router.get('/categories/with-counts', publicJobController.getCategoriesWithCounts);
router.get('/filter-options', publicJobController.getFilterOptions);

module.exports = router;
