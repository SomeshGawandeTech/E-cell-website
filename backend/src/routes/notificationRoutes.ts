import { Router } from 'express';
import { getNotifications, createNotification } from '../controllers/notificationController';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

router.get('/', authenticateToken, getNotifications);
router.post('/broadcast', authenticateToken, requireRole(['Admin', 'Core Team Member']), createNotification);

export default router;
