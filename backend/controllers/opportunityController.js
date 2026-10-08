const Opportunity = require('../models/Opportunity');

// GET /api/opportunities
const getOpportunities = async (req, res) => {
  try {
    const { search, type, location, educationLevel } = req.query;
    let query = { isActive: true };
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { provider: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
    if (type && type !== 'All') query.type = type;
    if (location && location !== 'All') query.location = { $regex: location, $options: 'i' };
    if (educationLevel && educationLevel !== 'All') query.educationLevel = educationLevel;
    const opportunities = await Opportunity.find(query).sort('-createdAt');
    res.json(opportunities);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// POST /api/opportunities
const createOpportunity = async (req, res) => {
  try {
    const opp = await Opportunity.create(req.body);
    res.status(201).json(opp);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// PUT /api/opportunities/:id
const updateOpportunity = async (req, res) => {
  try {
    const opp = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!opp) return res.status(404).json({ message: 'Opportunity not found' });
    res.json(opp);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// DELETE /api/opportunities/:id
const deleteOpportunity = async (req, res) => {
  try {
    const opp = await Opportunity.findByIdAndDelete(req.params.id);
    if (!opp) return res.status(404).json({ message: 'Opportunity not found' });
    res.json({ message: 'Opportunity removed' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { getOpportunities, createOpportunity, updateOpportunity, deleteOpportunity };
