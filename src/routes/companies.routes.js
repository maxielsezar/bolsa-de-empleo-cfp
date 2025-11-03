const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/companies.controller');

router.post('/', ctrl.createCompany);
router.get('/', ctrl.getCompanies);
router.get('/:id', ctrl.getCompany);
router.put('/:id', ctrl.updateCompany);
router.delete('/:id', ctrl.deleteCompany);

module.exports = router;
