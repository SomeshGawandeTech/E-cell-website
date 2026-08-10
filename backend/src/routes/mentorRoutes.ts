import { Router } from 'express';
import { getMentors, applyForMentorship, getMentorshipApplications } from '../controllers/mentorController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getMentors);
router.get('/applications', authenticateToken, getMentorshipApplications);
router.post('/apply', authenticateToken, applyForMentorship);

export default router;
