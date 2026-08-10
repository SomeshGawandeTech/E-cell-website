import { Router } from 'express';
import { getStartups, submitStartup, upvoteStartup, updateStartupStatus } from '../controllers/startupController';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

router.get('/', getStartups);
router.post('/submit', authenticateToken, submitStartup);
router.put('/:id/upvote', upvoteStartup);
router.put('/:id/status', authenticateToken, requireRole(['Admin', 'Core Team Member']), updateStartupStatus);

export default router;
