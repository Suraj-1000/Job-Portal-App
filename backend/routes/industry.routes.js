const express = require('express');
const router = express.Router();
const { Industry } = require('../models');
const createFilterController = require('../controllers/filter.controller');

const industryController = createFilterController(Industry, 'Industry');

router.get('/', industryController.getAll);
router.get('/:id', industryController.getById);
router.post('/', industryController.create);
router.put('/:id', industryController.update);
router.delete('/:id', industryController.delete);

module.exports = router;
