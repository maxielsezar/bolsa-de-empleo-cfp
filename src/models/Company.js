const { Schema, model } = require('mongoose');

const companySchema = new Schema({
  name: { type: String, required: true, unique: true },
  website: { type: String },
  description: { type: String },
  location: { type: String }
}, { timestamps: true });

module.exports = model('Company', companySchema);