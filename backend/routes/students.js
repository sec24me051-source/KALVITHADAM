const express = require('express');
const router = express.Router();
const { getStudents, getStudent, createStudent, updateStudent, deleteStudent, getStudentStats } = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.get('/stats', authorize('teacher', 'admin'), getStudentStats);
router.route('/').get(authorize('teacher', 'admin'), getStudents).post(authorize('teacher', 'admin'), createStudent);
router.route('/:id').get(authorize('teacher', 'admin'), getStudent).put(authorize('teacher', 'admin'), updateStudent).delete(authorize('admin'), deleteStudent);

module.exports = router;
