import { Router } from 'express';
import { getEvents, getEventBySlug, createEvent, registerForEvent, getUserRegistrations } from '../controllers/eventController';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

router.get('/', getEvents);
router.get('/registrations/me', authenticateToken, getUserRegistrations);
router.get('/:slug', getEventBySlug);
router.post('/register', authenticateToken, registerForEvent);
router.post('/', authenticateToken, requireRole(['Admin', 'Core Team Member']), createEvent);

export default router;
