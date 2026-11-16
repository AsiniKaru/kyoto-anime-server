import { Router } from 'express';
import {
  searchAnime,
  getHome,
  getSeasonal,
  getAnimeById,
  getAnimeEpisodes,
  getAnimeRecommendations,
  getAnimeCharacters,
  getAnimeTrailer,
  getGenres,
  getRandomAnime,
} from '../controllers/animeController.js';

const router = Router();

// Static / collection routes first so "/:id" does not swallow them
router.get('/home', getHome);
router.get('/search', searchAnime);
router.get('/seasonal', getSeasonal);
router.get('/genres', getGenres);
router.get('/random', getRandomAnime);

router.get('/:id', getAnimeById);
router.get('/:id/episodes', getAnimeEpisodes);
router.get('/:id/recommendations', getAnimeRecommendations);
router.get('/:id/characters', getAnimeCharacters);
router.get('/:id/trailer', getAnimeTrailer);

export default router;
