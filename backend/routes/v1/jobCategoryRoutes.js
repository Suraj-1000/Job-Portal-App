const express = require('express');
const router = express.Router();
const categoryController = require('@/controllers/categoryController');
const jobController = require('@/controllers/jobController');

// Category Routes
router.post('/categories', categoryController.create);
router.get('/categories', categoryController.getAll);
router.put('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.delete);

// Job Routes
router.post('/jobs', jobController.create);
router.get('/jobs', jobController.getAll);
router.put('/jobs/:id', jobController.update);
router.delete('/jobs/:id', jobController.delete);

module.exports = router;
