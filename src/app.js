const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true, message: 'Job Board API' }));

app.use('/api/companies', require('./routes/companies.routes'));
app.use('/api/jobs', require('./routes/jobs.routes'));
app.use('/api/applicants', require('./routes/applicants.routes'));

app.use(errorHandler);

module.exports = app;