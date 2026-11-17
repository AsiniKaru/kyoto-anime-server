import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest } from '../utils/apiError.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { anilist, CACHE_TTL } from '../services/anilistService.js';
import { mapAnime } from '../services/animeMapperService.js';

// Initialize Gemini directly in the controller
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const recommend = asyncHandler(async (req, res) => {
  const prompt = String(req.body?.prompt ?? '').trim().slice(0, 500);
  if (prompt.length < 3) throw badRequest('Please describe what you are looking for');

  const genres = Array.isArray(req.body?.genres)
    ? (req.body.genres as unknown[]).map((item) => String(item)).slice(0, 10)
    : [];

  // Placeholder for when you build the specific recommendation engine
  res.json({
    success: true,
    message: 'Recommendations generated',
    data: { recommendations: [] },
  });
});

export const magic = asyncHandler(async (req, res) => {
  const query = String(req.body?.query ?? req.body?.prompt ?? '').trim().slice(0, 500);
  if (query.length < 3) throw badRequest('Please describe what you are looking for');

  // 1. Call Gemini directly
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  const systemPrompt = `You are an expert anime recommender. 
  The user is looking for an anime based on this vibe: "${query}".
  Return a JSON array of exactly 5 AniList IDs (numbers) that best match this vibe. 
  Do not include any text, markdown, or explanations. Only return the JSON array.
  Example: [21519, 11061, 20, 1535, 16498]`;

  const result = await model.generateContent(systemPrompt);
  
  // 2. Parse the IDs
  let anilistIds: number[] = [];
  try {
    anilistIds = JSON.parse(result.response.text());
  } catch (e) {
    throw badRequest("Failed to parse AI response. Please try a different query.");
  }

  // 3. Fetch data from AniList
  const animePromises = anilistIds.map(async (id) => {
    try {
      const payload = await anilist.media(id, CACHE_TTL.detail);
      return payload.Media ? mapAnime(payload.Media) : null;
    } catch (err) {
      return null; 
    }
  });

  const results = (await Promise.all(animePromises)).filter(a => a !== null);

  // 4. Send back the response exactly how your frontend expects it
  res.json({
    success: true,
    message: 'Magic search results',
    data: { results },
  });
});