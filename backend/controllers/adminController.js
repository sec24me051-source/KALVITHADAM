const { eq, desc, count, getTableColumns } = require('drizzle-orm');
const { db, schema, toDoc, countWhere } = require('../config/db');

const { users, students, dropoutCases } = schema;

// GET /api/admin/stats
const getAdminStats = async (req, res) => {
  try {
    const [totalStudents, totalTeachers, atRisk, dropout, totalCases, activeCases, resolvedCases, byReasonRows] = await Promise.all([
      countWhere(students),
      countWhere(users, eq(users.role, 'teacher')),
      countWhere(students, eq(students.educationStatus, 'At-Risk')),
      countWhere(students, eq(students.educationStatus, 'Dropout')),
      countWhere(dropoutCases),
      countWhere(dropoutCases, eq(dropoutCases.isResolved, false)),
      countWhere(dropoutCases, eq(dropoutCases.isResolved, true)),
      db.select({ _id: dropoutCases.reason, count: count() }).from(dropoutCases)
        .groupBy(dropoutCases.reason).orderBy(desc(count())),
    ]);
    const byReason = byReasonRows.map((r) => ({ _id: r._id, count: Number(r.count) }));
    res.json({ totalStudents, totalTeachers, atRisk, dropout, totalCases, activeCases, resolvedCases, byReason });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// GET /api/admin/teachers
const getTeachers = async (req, res) => {
  try {
    const { password, ...columns } = getTableColumns(users);
    const teachers = await db.select(columns).from(users)
      .where(eq(users.role, 'teacher')).orderBy(desc(users.createdAt));
    res.json(teachers.map(toDoc));
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { getAdminStats, getTeachers };
