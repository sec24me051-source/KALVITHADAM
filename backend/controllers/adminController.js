const User = require('../models/User');
const Student = require('../models/Student');
const DropoutCase = require('../models/DropoutCase');

// GET /api/admin/stats
const getAdminStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const atRisk = await Student.countDocuments({ educationStatus: 'At-Risk' });
    const dropout = await Student.countDocuments({ educationStatus: 'Dropout' });
    const totalCases = await DropoutCase.countDocuments();
    const activeCases = await DropoutCase.countDocuments({ isResolved: false });
    const resolvedCases = await DropoutCase.countDocuments({ isResolved: true });
    const byReason = await DropoutCase.aggregate([
      { $group: { _id: '$reason', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({ totalStudents, totalTeachers, atRisk, dropout, totalCases, activeCases, resolvedCases, byReason });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// GET /api/admin/teachers
const getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' }).select('-password').sort('-createdAt');
    res.json(teachers);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { getAdminStats, getTeachers };
