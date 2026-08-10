import { Router } from 'express';
import { getResources, createResource, incrementDownload } from '../controllers/resourceController';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

router.get('/', getResources);
router.put('/:id/download', incrementDownload);
router.post('/', authenticateToken, requireRole(['Admin', 'Core Team Member']), createResource);

export default router;
