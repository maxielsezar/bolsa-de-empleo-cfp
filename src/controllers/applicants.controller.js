const Applicant = require('../models/Applicant');

exports.create = async (req, res, next) => {
  try {
    const applicant = await Applicant.create(req.body);
    res.status(201).json(applicant);
  } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try {
    const applicants = await Applicant.find().populate('job');
    res.json(applicants);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const applicant = await Applicant.findByIdAndDelete(req.params.id);
    if (!applicant) return res.status(404).json({ message: 'Applicant not found' });
    res.json({ message: 'Applicant deleted' });
  } catch (err) { next(err); }
};