'use strict';

const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');
const { rules } = require('../validators/projectValidator');
const { verifyToken } = require('../middleware/csrf');
const { formLimiter } = require('../middleware/rateLimiter');

// GET: render the inquiry form.
router.get('/start-a-project', projectController.showForm);

// POST: rate-limit → CSRF check → validate/sanitise → handle.
router.post(
  '/start-a-project',
  formLimiter,
  verifyToken,
  rules,
  projectController.submitForm
);

module.exports = router;
