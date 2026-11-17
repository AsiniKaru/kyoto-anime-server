import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest } from '../utils/apiError.js';
import { recommendAnime, magicSearch } from '../services/geminiService.js';

export const recommend = asyncHandler(async (req, res) => {
  const prompt = String(req.body?.prompt ?? '').trim().slice(0, 500);
  if (prompt.length < 3) throw badRequest('Please describe what you are looking for');

  const genres = Array.isArray(req.body?.genres)
    ? (req.body.genres as unknown[]).map((item) => String(item)).slice(0, 10)
    : [];

  const recommendations = await recommendAnime({ prompt, genres });

  res.json({
    success: true,
    message: 'Recommendations generated',
    data: { recommendations },
  });
});

export const magic = asyncHandler(async (req, res) => {
  const query = String(req.body?.query ?? req.body?.prompt ?? '').trim().slice(0, 500);
  if (query.length < 3) throw badRequest('Please describe what you are looking for');

  const results = await magicSearch(query);

  res.json({
    success: true,
    message: 'Magic search results',
    data: { results },
  });
});
