const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  class: { type: String, required: true },
  school: { type: String, required: true },
  location: { type: String, required: true },
  district: { type: String, default: '' },
  state: { type: String, default: 'Tamil Nadu' },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
  guardianName: { type: String, default: '' },
  guardianContact: { type: String, default: '' },
  attendancePercentage: { type: Number, default: 100, min: 0, max: 100 },
  riskLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  educationStatus: { type: String, enum: ['Active', 'At-Risk', 'Dropout', 'Resumed'], default: 'Active' },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  interests: [String],
  preferredLanguage: { type: String, default: 'Tamil' },
  hasDigitalAccess: { type: Boolean, default: false },
  notes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
