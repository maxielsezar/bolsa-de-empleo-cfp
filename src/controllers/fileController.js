const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;
mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
});

exports.uploadFile = (req, res) => {
    res.status(200).send(`PDF subido exitosamente: ${req.file.filename}`);
};

exports.downloadFile = (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file) {
            return res.status(404).json({ err: 'No existe el archivo' });
        }
        
        if (file.contentType === 'application/pdf') {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({ err: 'El archivo no es un PDF' });
        }
    });
};
