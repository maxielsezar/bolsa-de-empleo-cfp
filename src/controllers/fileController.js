const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
// const mongodb = require('mongodb'); // Solo necesario si usas GridFSBucket directamente

// --- Preparación de Variables ---
const connection = mongoose.connection;
let storage; 
let uploadMiddleware; // Esta será tu instancia final de Multer

// --- Esperar a la Conexión ---
// Este bloque de código SOLO se ejecuta cuando la conexión está lista
connection.once('open', () => {
    console.log('MongoDB connection open. Initializing GridFsStorage...');
    
    // *** ¡Aquí se crea el storage de forma segura! ***
    storage = new GridFsStorage({
        // Usamos el objeto 'db' que ahora es válido
        db: connection.db, 
        file: (req, file) => {
            // Lógica para nombrar el archivo
            return {
                filename: file.originalname,
                bucketName: 'uploads'
            };
        }
    });

    // *** Inicializamos Multer aquí dentro ***
    uploadMiddleware = multer({ storage: storage });
});

exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se ha subido ningún archivo.');
    }
    res.status(200).send(`PDF subido exitosamente: ${req.file.filename}`);
};
exports.uploadMiddleware = (req, res, next) => {
    if (uploadMiddleware) { // <-- Verifica si la instancia de Multer ya se creó
        // Llama a Multer.single('file') de forma segura
        uploadMiddleware.single('file')(req, res, next);
    } else {
        res.status(503).send('Servicio no disponible, la base de datos no está conectada.');
    }
};
exports.downloadFile = (req, res) => {
    // ... (tu lógica de descarga usando gfsBucket o gfs) ...

    console.log('Ejecutando downloadFile para:', req.params.filename);

    if (!gfsBucket) {
        return res.status(503).send('El servicio de almacenamiento no está disponible.');
    }
    
};