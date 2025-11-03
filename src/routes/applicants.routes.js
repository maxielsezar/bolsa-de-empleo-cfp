const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const ctrl = require('../controllers/applicants.controller');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  next();
};

router.post('/',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('job').notEmpty().isMongoId()
  ],
  validate,
  ctrl.applyToJob
);

router.get('/', ctrl.getApplicants);
router.get('/:id', ctrl.getApplicant);
router.delete('/:id', ctrl.deleteApplicant);

module.exports = router;
