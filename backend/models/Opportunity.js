const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  provider: { type: String, required: true },
  type: {
    type: String,
    enum: ['Scholarship', 'Government Scheme', 'Educational Assistance', 'Higher Education Scheme', 'NGO Scholarship', 'Mentoring Program', 'Career Support', 'Skill Program'],
    required: true
  },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  benefits: { type: String, required: true },
  documents: [String],
  applicationProcedure: { type: String, required: true },
  deadline: { type: String, default: 'Ongoing' },
  applicationLink: { type: String, default: '' },
  location: { type: String, default: 'Tamil Nadu' },
  educationLevel: [String],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', opportunitySchema);
