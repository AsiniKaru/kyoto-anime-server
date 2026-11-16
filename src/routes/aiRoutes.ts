import { Router } from 'express';
import { z } from 'zod';
import { recommend } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireDatabase } from '../middleware/requireDatabase.js';
import { authLimiter } from '../middleware/rateLimitMiddleware.js';
import { validateBody } from '../middleware/validateMiddleware.js';

const router = Router();

const recommendSchema = z.object({
  prompt: z.string().trim().min(3).max(500),
  genres: z.array(z.string()).max(10).optional(),
});

router.post('/recommend', requireDatabase, protect, authLimiter, validateBody(recommendSchema), recommend);

export default router;
