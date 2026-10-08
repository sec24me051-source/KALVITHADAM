const express = require('express');
const router = express.Router();
const { createCase, getCases, getCase, updateCase, getCaseStats } = require('../controllers/dropoutController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('teacher', 'admin'));
router.get('/stats', getCaseStats);
router.route('/').get(getCases).post(createCase);
router.route('/:id').get(getCase).put(updateCase);

module.exports = router;
