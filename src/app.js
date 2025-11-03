const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ruta de salud
app.get('/', (req, res) => res.json({ ok: true }));

// rutas (se irán agregando)
app.use('/api/companies', require('./routes/companies.routes'));
app.use('/api/jobs', require('./routes/jobs.routes'));
app.use('/api/applicants', require('./routes/applicants.routes'));

// handler de errores simple
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
