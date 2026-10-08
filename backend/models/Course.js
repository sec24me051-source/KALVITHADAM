const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  resourceUrl: { type: String, default: '' },
  duration: { type: String, default: '10 min' },
  order: { type: Number, default: 1 },
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['Academic Learning', 'Skill Development', 'Life Skills', 'Digital Literacy'],
    required: true
  },
  subcategory: { type: String, default: '' },
  description: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  thumbnail: { type: String, default: '' },
  lessons: [lessonSchema],
  lessonCount: { type: Number, default: 0 },
  duration: { type: String, default: '' },
  language: { type: String, default: 'Tamil & English' },
  isActive: { type: Boolean, default: true },
  tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
