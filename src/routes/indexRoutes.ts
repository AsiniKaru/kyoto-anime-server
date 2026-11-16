import { Router } from 'express';
import authRoutes from './authRoutes.js';
import animeRoutes from './animeRoutes.js';
import libraryRoutes from './libraryRoutes.js';
import adminRoutes from './adminRoutes.js';
import aiRoutes from './aiRoutes.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    success: true,
    name: 'SayonaraAnime API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      anime: '/api/anime',
      library: '/api/library',
      admin: '/api/admin',
      ai: '/api/ai',
      health: '/api/health',
    },
  });
});

router.use('/auth', authRoutes);
router.use('/anime', animeRoutes);
router.use('/library', libraryRoutes);
router.use('/admin', adminRoutes);
router.use('/ai', aiRoutes);

export default router;
