const { eq, and, or, ilike, desc } = require('drizzle-orm');
const { db, schema, toDoc, pickColumns, isId } = require('../config/db');

const { courses } = schema;

// GET /api/courses
const getCourses = async (req, res) => {
  try {
    const { search, category, level } = req.query;
    const filters = [eq(courses.isActive, true)];
    if (search) filters.push(or(ilike(courses.title, `%${search}%`), ilike(courses.description, `%${search}%`)));
    if (category && category !== 'All') filters.push(eq(courses.category, category));
    if (level && level !== 'All') filters.push(eq(courses.level, level));
    const rows = await db.select().from(courses).where(and(...filters)).orderBy(desc(courses.createdAt));
    res.json(rows.map(toDoc));
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// GET /api/courses/:id
const getCourse = async (req, res) => {
  try {
    if (!isId(req.params.id)) return res.status(404).json({ message: 'Course not found' });
    const [course] = await db.select().from(courses).where(eq(courses.id, req.params.id));
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(toDoc(course));
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// POST /api/courses
const createCourse = async (req, res) => {
  try {
    const [course] = await db.insert(courses).values(pickColumns(courses, req.body)).returning();
    res.status(201).json(toDoc(course));
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// PUT /api/courses/:id
const updateCourse = async (req, res) => {
  try {
    if (!isId(req.params.id)) return res.status(404).json({ message: 'Course not found' });
    const [course] = await db.update(courses).set({ ...pickColumns(courses, req.body), updatedAt: new Date() })
      .where(eq(courses.id, req.params.id)).returning();
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(toDoc(course));
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    if (!isId(req.params.id)) return res.status(404).json({ message: 'Course not found' });
    const [course] = await db.delete(courses).where(eq(courses.id, req.params.id)).returning();
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course removed' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { getCourses, getCourse, createCourse, updateCourse, deleteCourse };
