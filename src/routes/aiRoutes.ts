import { Router } from 'express';
import { z } from 'zod';
import { recommend, magic } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireDatabase } from '../middleware/requireDatabase.js';
import { authLimiter } from '../middleware/rateLimitMiddleware.js';
import { validateBody } from '../middleware/validateMiddleware.js';

const router = Router();

const recommendSchema = z.object({
  prompt: z.string().trim().min(3).max(500),
  genres: z.array(z.string()).max(10).optional(),
});

const magicSearchSchema = z.object({
  query: z.string().trim().min(3).max(500).optional(),
  prompt: z.string().trim().min(3).max(500).optional(),
}).refine((value) => Boolean(value.query || value.prompt), {
  message: 'Please describe what you are looking for',
});

router.post('/recommend', requireDatabase, protect, authLimiter, validateBody(recommendSchema), recommend);
router.post('/magic-search', requireDatabase, protect, authLimiter, validateBody(magicSearchSchema), magic);

export default router;
