const mongoose = require('mongoose');

const dropoutCaseSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reason: {
    type: String,
    enum: [
      'Financial difficulties',
      'Family circumstances',
      'Need to work',
      'Lack of awareness about education',
      'Migration',
      'Poor academic performance',
      'Health-related barriers',
      'Disability/accessibility barriers',
      'Geographical barriers',
      'Other'
    ],
    required: true
  },
  remarks: { type: String, default: '' },
  riskLevel: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  status: {
    type: String,
    enum: [
      'Reported',
      'Under Review',
      'Intervention Planned',
      'Counselling Provided',
      'Support Provided',
      'Follow-Up Required',
      'Education Continued',
      'Case Closed'
    ],
    default: 'Reported'
  },
  intervention: { type: String, default: '' },
  counsellingInfo: { type: String, default: '' },
  followUpDate: { type: Date },
  adminNotes: { type: String, default: '' },
  isResolved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('DropoutCase', dropoutCaseSchema);
