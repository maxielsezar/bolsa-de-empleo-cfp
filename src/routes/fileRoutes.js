const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.post('/upload', fileController.uploadMiddleware, fileController.uploadFile);

router.get('/download/:filename', fileController.downloadFile); 


module.exports = router;
