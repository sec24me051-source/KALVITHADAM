const { eq, and, or, ilike, desc, arrayContains } = require('drizzle-orm');
const { db, schema, toDoc, pickColumns, isId } = require('../config/db');

const { opportunities } = schema;

// GET /api/opportunities
const getOpportunities = async (req, res) => {
  try {
    const { search, type, location, educationLevel } = req.query;
    const filters = [eq(opportunities.isActive, true)];
    if (search) filters.push(or(
      ilike(opportunities.title, `%${search}%`),
      ilike(opportunities.provider, `%${search}%`),
      ilike(opportunities.description, `%${search}%`)
    ));
    if (type && type !== 'All') filters.push(eq(opportunities.type, type));
    if (location && location !== 'All') filters.push(ilike(opportunities.location, `%${location}%`));
    if (educationLevel && educationLevel !== 'All') filters.push(arrayContains(opportunities.educationLevel, [educationLevel]));
    const rows = await db.select().from(opportunities).where(and(...filters)).orderBy(desc(opportunities.createdAt));
    res.json(rows.map(toDoc));
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// POST /api/opportunities
const createOpportunity = async (req, res) => {
  try {
    const [opp] = await db.insert(opportunities).values(pickColumns(opportunities, req.body)).returning();
    res.status(201).json(toDoc(opp));
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// PUT /api/opportunities/:id
const updateOpportunity = async (req, res) => {
  try {
    if (!isId(req.params.id)) return res.status(404).json({ message: 'Opportunity not found' });
    const [opp] = await db.update(opportunities).set({ ...pickColumns(opportunities, req.body), updatedAt: new Date() })
      .where(eq(opportunities.id, req.params.id)).returning();
    if (!opp) return res.status(404).json({ message: 'Opportunity not found' });
    res.json(toDoc(opp));
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// DELETE /api/opportunities/:id
const deleteOpportunity = async (req, res) => {
  try {
    if (!isId(req.params.id)) return res.status(404).json({ message: 'Opportunity not found' });
    const [opp] = await db.delete(opportunities).where(eq(opportunities.id, req.params.id)).returning();
    if (!opp) return res.status(404).json({ message: 'Opportunity not found' });
    res.json({ message: 'Opportunity removed' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { getOpportunities, createOpportunity, updateOpportunity, deleteOpportunity };
