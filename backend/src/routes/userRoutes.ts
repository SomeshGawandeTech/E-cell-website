import { Router } from 'express';
import { getLeaderboard, updateProfile } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/leaderboard', getLeaderboard);
router.put('/profile', authenticateToken, updateProfile);

export default router;
