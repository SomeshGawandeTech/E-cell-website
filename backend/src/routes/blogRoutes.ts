import { Router } from 'express';
import { getBlogs, getBlogBySlug, createBlog, likeBlog } from '../controllers/blogController';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';

const router = Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.put('/:id/like', likeBlog);
router.post('/', authenticateToken, requireRole(['Admin', 'Core Team Member']), createBlog);

export default router;
