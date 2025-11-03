const Job = require('../models/Job');

// Crear oferta
exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) { next(err); }
};

// Obtener lista con filtros, paginación y búsqueda
exports.getJobs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, q, location, type, company } = req.query;
    const filter = { isActive: true };

    if (q) filter.$or = [
      { title: new RegExp(q, 'i') },
      { description: new RegExp(q, 'i') }
    ];
    if (location) filter.location = new RegExp(location, 'i');
    if (type) filter.type = type;
    if (company) filter.company = company; // expecting company id

    const skip = (Number(page) - 1) * Number(limit);
    const [total, jobs] = await Promise.all([
      Job.countDocuments(filter),
      Job.find(filter)
        .populate('company')
        .sort({ postedAt: -1 })
        .skip(skip)
        .limit(Number(limit))
    ]);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      jobs
    });
  } catch (err) { next(err); }
};

// Obtener una oferta
exports.getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('company');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) { next(err); }
};

// Actualizar oferta
exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) { next(err); }
};

// Eliminar oferta (soft delete posible)
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (err) { next(err); }
};
