require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const MONGO_URI = process.env.MONGO_URI;

let conn = null;
async function ensureConnection() {
  if (!conn) {
    conn = connectDB(MONGO_URI);
  }
  return conn;
}

// Exportar el handler que Vercel usa
module.exports = async (req, res) => {
  await ensureConnection();
  return app(req, res);
};