const { Schema, model } = require('mongoose');

const companySchema = new Schema({
  name: { type: String, required: true },
}, { timestamps: true });

module.exports = model('Company', companySchema);
