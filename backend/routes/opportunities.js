const express = require('express');
const router = express.Router();
const { getOpportunities, createOpportunity, updateOpportunity, deleteOpportunity } = require('../controllers/opportunityController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getOpportunities);
router.post('/', protect, authorize('admin'), createOpportunity);
router.put('/:id', protect, authorize('admin'), updateOpportunity);
router.delete('/:id', protect, authorize('admin'), deleteOpportunity);

module.exports = router;
