import { Router } from 'express';
import { getAnalyticsStats } from '../controllers/analyticsController';

const router = Router();

router.get('/stats', getAnalyticsStats);

export default router;
