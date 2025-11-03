const Applicant = require('../models/Applicant');

exports.applyToJob = async (req, res, next) => {
  try {
    const applicant = await Applicant.create(req.body);
    res.status(201).json(applicant);
  } catch (err) { next(err); }
};

exports.getApplicants = async (req, res, next) => {
  try {
    const { job } = req.query;
    const filter = {};
    if (job) filter.job = job;
    const applicants = await Applicant.find(filter).populate('job').sort({ appliedAt: -1 });
    res.json(applicants);
  } catch (err) { next(err); }
};

exports.getApplicant = async (req, res, next) => {
  try {
    const a = await Applicant.findById(req.params.id).populate('job');
    if (!a) return res.status(404).json({ message: 'Applicant not found' });
    res.json(a);
  } catch (err) { next(err); }
};

exports.deleteApplicant = async (req, res, next) => {
  try {
    const a = await Applicant.findByIdAndDelete(req.params.id);
    if (!a) return res.status(404).json({ message: 'Applicant not found' });
    res.json({ message: 'Applicant deleted' });
  } catch (err) { next(err); }
};
