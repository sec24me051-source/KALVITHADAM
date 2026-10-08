const express = require('express');
const router = express.Router();
const { getAdminStats, getTeachers } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('admin'));
router.get('/stats', getAdminStats);
router.get('/teachers', getTeachers);

module.exports = router;
