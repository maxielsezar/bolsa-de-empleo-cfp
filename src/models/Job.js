const { Schema, model, Types } = require('mongoose');

const jobSchema = new Schema({
  title: { type: String, required: true },
  company: { type: Types.ObjectId, ref: 'Company', required: true },
}, { timestamps: true });

module.exports = model('Job', jobSchema);
