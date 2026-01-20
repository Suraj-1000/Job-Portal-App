const express = require('express');
const router = express.Router();
const { JobTitle } = require('@/models');
const createFilterController = require('@/controllers/filter.controller');

const jobTitleController = createFilterController(JobTitle, 'JobTitle');

router.get('/', jobTitleController.getAll);
router.get('/:id', jobTitleController.getById);
router.post('/', jobTitleController.create);
router.put('/:id', jobTitleController.update);
router.delete('/:id', jobTitleController.delete);

module.exports = router;
