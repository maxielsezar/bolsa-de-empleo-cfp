const Job = require('../models/Job');

exports.create = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate('company').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('company');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (err) { next(err); }
};