const Company = require('../models/Company');

exports.createCompany = async (req, res, next) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (err) { next(err); }
};

exports.getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (err) { next(err); }
};

exports.getCompany = async (req, res, next) => {
  try {
    const c = await Company.findById(req.params.id);
    if (!c) return res.status(404).json({ message: 'Company not found' });
    res.json(c);
  } catch (err) { next(err); }
};

exports.updateCompany = async (req, res, next) => {
  try {
    const c = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!c) return res.status(404).json({ message: 'Company not found' });
    res.json(c);
  } catch (err) { next(err); }
};

exports.deleteCompany = async (req, res, next) => {
  try {
    const c = await Company.findByIdAndDelete(req.params.id);
    if (!c) return res.status(404).json({ message: 'Company not found' });
    res.json({ message: 'Company deleted' });
  } catch (err) { next(err); }
};
