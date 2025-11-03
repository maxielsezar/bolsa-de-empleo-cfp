function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.name === 'ValidationError') {
    return res.status(422).json({ message: 'Validation error', errors: err.errors });
  }
  res.status(500).json({ message: 'Internal server error', error: err.message });
}

module.exports = errorHandler;
