import { Router } from 'express';
import { handleAIChat, handleGenerateIdea, handleGeneratePitchDeck } from '../controllers/aiController';
import { apiLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/chat', apiLimiter, handleAIChat);
router.post('/generate-idea', apiLimiter, handleGenerateIdea);
router.post('/generate-pitch-deck', apiLimiter, handleGeneratePitchDeck);

export default router;
