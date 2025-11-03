const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async (uri) => {
  if (isConnected) return;

  const db = await mongoose.connect(uri);
  isConnected = db.connections[0].readyState;
  console.log('✅ MongoDB conectado');
};

module.exports = connectDB;