const DropoutCase = require('../models/DropoutCase');
const Student = require('../models/Student');

// POST /api/dropout-cases
const createCase = async (req, res) => {
  try {
    const { studentId, reason, remarks, riskLevel } = req.body;
    if (!studentId || !reason || !riskLevel) {
      return res.status(400).json({ message: 'studentId, reason and riskLevel are required' });
    }
    const caseData = { studentId, teacherId: req.user._id, reason, remarks, riskLevel };
    const dropoutCase = await DropoutCase.create(caseData);
    // Update student status
    await Student.findByIdAndUpdate(studentId, { educationStatus: 'At-Risk', riskLevel });
    const populated = await DropoutCase.findById(dropoutCase._id).populate('studentId').populate('teacherId', 'name email school');
    res.status(201).json(populated);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// GET /api/dropout-cases
const getCases = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'teacher') query.teacherId = req.user._id;
    const cases = await DropoutCase.find(query)
      .populate('studentId')
      .populate('teacherId', 'name email school')
      .sort('-createdAt');
    res.json(cases);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// GET /api/dropout-cases/:id
const getCase = async (req, res) => {
  try {
    const dropoutCase = await DropoutCase.findById(req.params.id)
      .populate('studentId')
      .populate('teacherId', 'name email school');
    if (!dropoutCase) return res.status(404).json({ message: 'Case not found' });
    if (req.user.role === 'teacher' && dropoutCase.teacherId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(dropoutCase);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// PUT /api/dropout-cases/:id
const updateCase = async (req, res) => {
  try {
    const dropoutCase = await DropoutCase.findById(req.params.id);
    if (!dropoutCase) return res.status(404).json({ message: 'Case not found' });
    if (req.user.role === 'teacher' && dropoutCase.teacherId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const updated = await DropoutCase.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('studentId').populate('teacherId', 'name email school');
    // Update student status if case resolved
    if (req.body.status === 'Education Continued' || req.body.status === 'Case Closed') {
      await Student.findByIdAndUpdate(dropoutCase.studentId, { educationStatus: 'Resumed' });
    }
    res.json(updated);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// GET /api/dropout-cases/stats
const getCaseStats = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'teacher') query.teacherId = req.user._id;
    const total = await DropoutCase.countDocuments(query);
    const active = await DropoutCase.countDocuments({ ...query, isResolved: false });
    const resolved = await DropoutCase.countDocuments({ ...query, isResolved: true });
    const byReason = await DropoutCase.aggregate([
      { $match: query },
      { $group: { _id: '$reason', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const byStatus = await DropoutCase.aggregate([
      { $match: query },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json({ total, active, resolved, byReason, byStatus });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { createCase, getCases, getCase, updateCase, getCaseStats };
