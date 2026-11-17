import { Router } from 'express';
import {
  getWatchlist,
  getWatchlistEntry,
  upsertWatchlistEntry,
  updateWatchlistEntry,
  removeWatchlistEntry,
  getHistory,
  upsertHistory,
  removeHistoryEntry,
  clearHistory,
  getAnimeReviews,
  upsertReview,
  deleteReview,
  getMyReviews,
  getLibraryStats,
} from '../controllers/libraryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireDatabase } from '../middleware/requireDatabase.js';
import { validateBody } from '../middleware/validateMiddleware.js';
import {
  historySchema,
  reviewSchema,
  watchlistSchema,
  watchlistStatusSchema,
} from '../validators/library.js';

const router = Router();

router.use(requireDatabase);

router.get('/reviews/:malId', getAnimeReviews); 
router.post('/reviews/:malId', upsertReview); 0
router.delete('/reviews/:id', deleteReview); 
router.get('/reviews', getMyReviews);

router.use(protect);

router.get('/stats', getLibraryStats);

router.get('/watchlist', getWatchlist);
router.post('/watchlist', validateBody(watchlistSchema), upsertWatchlistEntry);
router.get('/watchlist/:malId', getWatchlistEntry);
router.patch('/watchlist/:malId', validateBody(watchlistStatusSchema), updateWatchlistEntry);
router.delete('/watchlist/:malId', removeWatchlistEntry);

router.get('/history', getHistory);
router.post('/history', validateBody(historySchema), upsertHistory);
router.delete('/history', clearHistory);
router.delete('/history/:malId', removeHistoryEntry);

router.get('/reviews', getMyReviews);
router.post('/reviews/:malId', validateBody(reviewSchema), upsertReview);
router.delete('/reviews/:id', deleteReview);

export default router;
