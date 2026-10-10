const { eq, and, desc, count, inArray } = require('drizzle-orm');
const { db, schema, toDoc, pickColumns, countWhere, isId } = require('../config/db');

const { dropoutCases, students, users } = schema;

// Populate `studentId` and `teacherId` with their full records
const populate = async (cases) => {
  const studentIds = [...new Set(cases.map((c) => c.studentId))];
  const teacherIds = [...new Set(cases.map((c) => c.teacherId))];
  const [studentRows, teacherRows] = await Promise.all([
    studentIds.length ? db.select().from(students).where(inArray(students.id, studentIds)) : [],
    teacherIds.length
      ? db.select({ id: users.id, name: users.name, email: users.email, school: users.school })
        .from(users).where(inArray(users.id, teacherIds))
      : [],
  ]);
  const studentMap = new Map(studentRows.map((s) => [s.id, toDoc(s)]));
  const teacherMap = new Map(teacherRows.map((t) => [t.id, toDoc(t)]));
  return cases.map((c) => ({
    ...toDoc(c),
    studentId: studentMap.get(c.studentId) || null,
    teacherId: teacherMap.get(c.teacherId) || null,
  }));
};

const findCase = async (id) => {
  if (!isId(id)) return null;
  const [dropoutCase] = await db.select().from(dropoutCases).where(eq(dropoutCases.id, id));
  return dropoutCase || null;
};

const teacherScope = (req) => (req.user.role === 'teacher' ? eq(dropoutCases.teacherId, req.user._id) : undefined);

// POST /api/dropout-cases
const createCase = async (req, res) => {
  try {
    const { studentId, reason, remarks, riskLevel } = req.body;
    if (!studentId || !reason || !riskLevel) {
      return res.status(400).json({ message: 'studentId, reason and riskLevel are required' });
    }
    if (!isId(studentId)) return res.status(404).json({ message: 'Student not found' });
    const caseData = { studentId, teacherId: req.user._id, reason, remarks: remarks || '', riskLevel };
    const [dropoutCase] = await db.insert(dropoutCases).values(caseData).returning();
    // Update student status
    await db.update(students).set({ educationStatus: 'At-Risk', riskLevel, updatedAt: new Date() })
      .where(eq(students.id, studentId));
    const [populated] = await populate([dropoutCase]);
    res.status(201).json(populated);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// GET /api/dropout-cases
const getCases = async (req, res) => {
  try {
    const cases = await db.select().from(dropoutCases).where(teacherScope(req)).orderBy(desc(dropoutCases.createdAt));
    res.json(await populate(cases));
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// GET /api/dropout-cases/:id
const getCase = async (req, res) => {
  try {
    const dropoutCase = await findCase(req.params.id);
    if (!dropoutCase) return res.status(404).json({ message: 'Case not found' });
    if (req.user.role === 'teacher' && dropoutCase.teacherId !== req.user._id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const [populated] = await populate([dropoutCase]);
    res.json(populated);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// PUT /api/dropout-cases/:id
const updateCase = async (req, res) => {
  try {
    const dropoutCase = await findCase(req.params.id);
    if (!dropoutCase) return res.status(404).json({ message: 'Case not found' });
    if (req.user.role === 'teacher' && dropoutCase.teacherId !== req.user._id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const { studentId, teacherId, ...changes } = pickColumns(dropoutCases, req.body);
    const [updated] = await db.update(dropoutCases).set({ ...changes, updatedAt: new Date() })
      .where(eq(dropoutCases.id, dropoutCase.id)).returning();
    // Update student status if case resolved
    if (req.body.status === 'Education Continued' || req.body.status === 'Case Closed') {
      await db.update(students).set({ educationStatus: 'Resumed', updatedAt: new Date() })
        .where(eq(students.id, dropoutCase.studentId));
    }
    const [populated] = await populate([updated]);
    res.json(populated);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// GET /api/dropout-cases/stats
const getCaseStats = async (req, res) => {
  try {
    const scope = teacherScope(req);
    const [total, active, resolved, byReason, byStatus] = await Promise.all([
      countWhere(dropoutCases, scope),
      countWhere(dropoutCases, and(scope, eq(dropoutCases.isResolved, false))),
      countWhere(dropoutCases, and(scope, eq(dropoutCases.isResolved, true))),
      db.select({ _id: dropoutCases.reason, count: count() }).from(dropoutCases).where(scope)
        .groupBy(dropoutCases.reason).orderBy(desc(count())),
      db.select({ _id: dropoutCases.status, count: count() }).from(dropoutCases).where(scope)
        .groupBy(dropoutCases.status),
    ]);
    const toCounts = (rows) => rows.map((r) => ({ _id: r._id, count: Number(r.count) }));
    res.json({ total, active, resolved, byReason: toCounts(byReason), byStatus: toCounts(byStatus) });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { createCase, getCases, getCase, updateCase, getCaseStats };
