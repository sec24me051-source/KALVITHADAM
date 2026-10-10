const { eq, and, desc, getTableColumns } = require('drizzle-orm');
const { db, schema, toDoc, pickColumns, countWhere, isId } = require('../config/db');

const { students, users } = schema;

// Select students with their teacher populated as `teacherId`
const selectStudents = (where) =>
  db.select({ student: getTableColumns(students), teacher: { id: users.id, name: users.name, email: users.email, school: users.school } })
    .from(students)
    .leftJoin(users, eq(students.teacherId, users.id))
    .where(where)
    .orderBy(desc(students.createdAt))
    .then((rows) => rows.map(({ student, teacher }) => ({ ...toDoc(student), teacherId: toDoc(teacher) })));

const findStudent = async (id) => {
  if (!isId(id)) return null;
  const [student] = await db.select().from(students).where(eq(students.id, id));
  return student || null;
};

const teacherScope = (req) => (req.user.role === 'teacher' ? eq(students.teacherId, req.user._id) : undefined);

// GET /api/students
const getStudents = async (req, res) => {
  try {
    res.json(await selectStudents(teacherScope(req)));
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// GET /api/students/:id
const getStudent = async (req, res) => {
  try {
    if (!isId(req.params.id)) return res.status(404).json({ message: 'Student not found' });
    const [student] = await selectStudents(eq(students.id, req.params.id));
    if (!student) return res.status(404).json({ message: 'Student not found' });
    if (req.user.role === 'teacher' && student.teacherId?._id !== req.user._id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(student);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// POST /api/students
const createStudent = async (req, res) => {
  try {
    const studentData = { ...pickColumns(students, req.body), teacherId: req.user._id };
    const [student] = await db.insert(students).values(studentData).returning();
    res.status(201).json(toDoc(student));
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// PUT /api/students/:id
const updateStudent = async (req, res) => {
  try {
    const student = await findStudent(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    if (req.user.role === 'teacher' && student.teacherId !== req.user._id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const { teacherId, ...changes } = pickColumns(students, req.body);
    const [updated] = await db.update(students).set({ ...changes, updatedAt: new Date() })
      .where(eq(students.id, student.id)).returning();
    res.json(toDoc(updated));
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  try {
    const student = await findStudent(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    await db.delete(students).where(eq(students.id, student.id));
    res.json({ message: 'Student removed' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// GET /api/students/stats
const getStudentStats = async (req, res) => {
  try {
    const scope = teacherScope(req);
    const [total, atRisk, dropout, active] = await Promise.all([
      countWhere(students, scope),
      countWhere(students, and(scope, eq(students.educationStatus, 'At-Risk'))),
      countWhere(students, and(scope, eq(students.educationStatus, 'Dropout'))),
      countWhere(students, and(scope, eq(students.educationStatus, 'Active'))),
    ]);
    res.json({ total, atRisk, dropout, active });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { getStudents, getStudent, createStudent, updateStudent, deleteStudent, getStudentStats };
