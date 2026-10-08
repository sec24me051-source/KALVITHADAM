const Course = require('../models/Course');

// GET /api/courses
const getCourses = async (req, res) => {
  try {
    const { search, category, level } = req.query;
    let query = { isActive: true };
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
    if (category && category !== 'All') query.category = category;
    if (level && level !== 'All') query.level = level;
    const courses = await Course.find(query).sort('-createdAt');
    res.json(courses);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// GET /api/courses/:id
const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// POST /api/courses
const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// PUT /api/courses/:id
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course removed' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { getCourses, getCourse, createCourse, updateCourse, deleteCourse };
