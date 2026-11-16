import express from 'express';
import { getAnime, getGenres, getSchedule, listAnime } from '../controllers/animeController.js';

const router = express.Router();

router.get('/', listAnime);
router.get('/genres', getGenres); // keep these two above '/:id'
router.get('/schedule', getSchedule);
router.get('/:id', getAnime);

export default router;
