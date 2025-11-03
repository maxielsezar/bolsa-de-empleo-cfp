require('dotenv').config();
const connectDB = require('../src/config/db');
const Company = require('../src/models/Company');
const Job = require('../src/models/Job');

(async () => {
  await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/jobboard');

  await Company.deleteMany({});
  await Job.deleteMany({});

  const c = await Company.create({ name: 'Empresa Test' });
  await Job.create({ title: 'Dev Test', company: c._id });

  console.log('Seed ejecutado');
  process.exit(0);
})();
