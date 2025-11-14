const express = require('express');
const connectDB = require('./config/db');
const fileRoutes = require('./routes/fileRoutes');
const path = require('path');

const app = express();

connectDB();

app.use(express.static('views'));

app.use('/api/files', fileRoutes); 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
