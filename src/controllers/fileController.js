const mongoose = require('mongoose');
const mongodb = require('mongodb'); // Se requiere el driver nativo de mongodb
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage'); // Para manejar la subida con Multer

let gfsBucket; // Usaremos un GridFSBucket en lugar de la instancia 'gfs' de gridfs-stream

// Asegúrate de que la conexión a Mongoose ya se ha establecido antes de este punto
// e.g., mongoose.connect(process.env.MONGO_URI, ...);

mongoose.connection.once('open', () => {
    // Inicializamos el GridFSBucket una vez que la conexión está abierta
    gfsBucket = new mongodb.GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads' // Especifica el nombre de la colección (como hacías con gfs.collection)
    });
    console.log('GridFS Bucket inicializado.');
});


// --- Configuración de Subida con Multer y multer-gridfs-storage ---
// Necesitas este middleware para manejar la subida del archivo en tu ruta.

const storage = new GridFsStorage({
    // Usamos el objeto db de la conexión existente
    db: mongoose.connection.db, 
    file: (req, file) => {
        return {
            filename: file.originalname,
            bucketName: 'uploads'
        };
    }
});

// Middleware de Multer para usar en tus rutas de Express
exports.uploadMiddleware = multer({ storage: storage });


// --- Controladores de Rutas ---

// Controlador para la subida (usando el middleware 'uploadMiddleware')
exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se ha subido ningún archivo.');
    }
    res.status(200).send(`PDF subido exitosamente: ${req.file.filename}`);
};

// Controlador para la descarga
exports.downloadFile = (req, res) => {
    // Usamos gfsBucket.find() y luego createReadStreamByName()
    if (!gfsBucket) {
        return res.status(503).send('El servicio de almacenamiento no está disponible.');
    }

    gfsBucket.find({ filename: req.params.filename }).toArray((err, files) => {
        if (err || !files || files.length === 0) {
            return res.status(404).json({ err: 'No existe el archivo' });
        }
        
        const file = files[0];

        if (file.contentType === 'application/pdf') {
            // Creamos un stream de lectura usando el bucket
            const readstream = gfsBucket.openDownloadStreamByName(file.filename);
            
            // Manejamos errores en el stream
            readstream.on('error', (err) => {
                console.error(err);
                res.status(500).send('Error al transmitir el archivo.');
            });

            // Pipe the file contents to the response
            readstream.pipe(res);
        } else {
            res.status(404).json({ err: 'El archivo no es un PDF' });
        }
    });
};