import { Router } from 'express';
import { sendOTP, verifyOTP, getMe } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/send-otp', authLimiter, sendOTP);
router.post('/verify-otp', authLimiter, verifyOTP);
router.get('/me', authenticateToken, getMe);

export default router;
