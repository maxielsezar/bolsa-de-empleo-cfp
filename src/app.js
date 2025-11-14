const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const bodyParser = require('body-parser')
const productRoutes = require('/routes/product')

const app = express();

app.use(bodyParser.urlencoded({ extend: false }))
app.use(bodyParser.json())

app.use('/public', express.static())

app.use('/v1', productRoutes)


app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true, message: 'Job Board API' }));

app.use('/api/companies', require('./routes/companies.routes'));
app.use('/api/jobs', require('./routes/jobs.routes'));
app.use('/api/applicants', require('./routes/applicants.routes'));
app.use('/api/users', require('./routes/users.routes'));


app.use(errorHandler);

module.exports = app;