const Student = require('../models/Student');

// GET /api/students
const getStudents = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'teacher') query.teacherId = req.user._id;
    const students = await Student.find(query).populate('teacherId', 'name email school').sort('-createdAt');
    res.json(students);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// GET /api/students/:id
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('teacherId', 'name email');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    if (req.user.role === 'teacher' && student.teacherId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(student);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// POST /api/students
const createStudent = async (req, res) => {
  try {
    const studentData = { ...req.body, teacherId: req.user._id };
    const student = await Student.create(studentData);
    res.status(201).json(student);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// PUT /api/students/:id
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    if (req.user.role === 'teacher' && student.teacherId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    await student.deleteOne();
    res.json({ message: 'Student removed' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// GET /api/students/stats
const getStudentStats = async (req, res) => {
  try {
    let matchQuery = {};
    if (req.user.role === 'teacher') matchQuery.teacherId = req.user._id;
    const total = await Student.countDocuments(matchQuery);
    const atRisk = await Student.countDocuments({ ...matchQuery, educationStatus: 'At-Risk' });
    const dropout = await Student.countDocuments({ ...matchQuery, educationStatus: 'Dropout' });
    const active = await Student.countDocuments({ ...matchQuery, educationStatus: 'Active' });
    res.json({ total, atRisk, dropout, active });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { getStudents, getStudent, createStudent, updateStudent, deleteStudent, getStudentStats };
