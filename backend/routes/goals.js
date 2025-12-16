import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { getGoals, getGoal, createGoal, updateGoal, deleteGoal } from '../controllers/goalController.js';
import { handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// GET /api/goals
router.get('/', authenticateToken, getGoals);

// GET /api/goals/:id
router.get('/:id', authenticateToken, getGoal);

// POST /api/goals
router.post('/',
    authenticateToken,
    [
        body('title').notEmpty().withMessage('Title required'),
        body('description').optional(),
        body('status').optional().isIn(['not_started', 'in_progress', 'completed']).withMessage('Invalid status'),
        handleValidationErrors
    ],
    createGoal
);

// PUT /api/goals/:id
router.put('/:id',
    authenticateToken,
    [
        body('title').optional().notEmpty().withMessage('Title cannot be empty'),
        body('status').optional().isIn(['not_started', 'in_progress', 'completed']).withMessage('Invalid status'),
        body('progress').optional().isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100'),
        handleValidationErrors
    ],
    updateGoal
);

// DELETE /api/goals/:id
router.delete('/:id', authenticateToken, deleteGoal);

export default router;

