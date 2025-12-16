import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// GET /api/users/profile
router.get('/profile', authenticateToken, getProfile);

// PUT /api/users/profile
router.put('/profile',
  authenticateToken,
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email required'),
    handleValidationErrors
  ],
  updateProfile
);

export default router;

