const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

// Asegúrate de que dotenv se cargue al inicio si usas .env
// require('dotenv').config();

// Intenta conectar Mongoose. Esto es ASÍNCRONO.
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conexión a MongoDB exitosa.'))
.catch(err => console.error('Error de conexión:', err));


const connection = mongoose.connection;
let storage;
let upload; // Multer instance

// Espera al evento 'open' (cuando la conexión está realmente lista)
connection.once('open', () => {
    console.log('Evento Open: Inicializando GridFsStorage...');

    // Ahora SÍ puedes inicializar storage, porque connection.db existe.
    storage = new GridFsStorage({
        db: connection.db, // Proporcionamos el objeto 'db' válido
        file: (req, file) => {
            return {
                filename: file.originalname,
                bucketName: 'uploads'
            };
        }
    });

    // Inicializa Multer DENTRO de este bloque también
    upload = multer({ storage: storage });
});

// Exporta el middleware de Multer de forma segura
// Este wrapper verifica si 'upload' ya fue inicializado.
exports.uploadMiddleware = (req, res, next) => {
    if (upload) {
        upload.single('file')(req, res, next);
    } else {
        res.status(503).send('Servicio no disponible, la base de datos no está conectada.');
    }
};


