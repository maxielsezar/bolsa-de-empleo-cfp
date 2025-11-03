const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const ctrl = require('../controllers/jobs.controller');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  next();
};

router.post('/',
  [
    body('title').notEmpty().withMessage('Title required'),
    body('description').notEmpty(),
    body('company').notEmpty().isMongoId().withMessage('company id required')
  ],
  validate,
  ctrl.createJob
);

router.get('/', ctrl.getJobs);
router.get('/:id', ctrl.getJob);

router.put('/:id', ctrl.updateJob);
router.delete('/:id', ctrl.deleteJob);

module.exports = router;
