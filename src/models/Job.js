const { Schema, model, Types } = require('mongoose');

const jobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: Types.ObjectId, ref: 'Company', required: true },
  location: String,
  salaryMin: Number,
  salaryMax: Number,
  type: { type: String, enum: ['full-time','part-time','remote','contract'], default: 'full-time' },
  requirements: [String],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = model('Job', jobSchema);