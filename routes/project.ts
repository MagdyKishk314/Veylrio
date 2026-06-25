import express from 'express';
import * as projectController from '../controllers/projectController';
import { rules } from '../validators/projectValidator';
import { verifyToken } from '../middleware/csrf';
import { formLimiter } from '../middleware/rateLimiter';

const router = express.Router();

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

export default router;
