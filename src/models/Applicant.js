const { Schema, model, Types } = require('mongoose');

const applicantSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  job: { type: Types.ObjectId, ref: 'Job', required: true }
}, { timestamps: true });

module.exports = model('Applicant', applicantSchema);
