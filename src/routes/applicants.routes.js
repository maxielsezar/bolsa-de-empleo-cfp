const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/applicants.controller');

router.post('/', ctrl.create);
router.get('/', ctrl.getAll);
router.delete('/:id', ctrl.remove);

module.exports = router;