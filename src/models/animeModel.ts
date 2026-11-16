import mongoose, { Schema, Document } from 'mongoose';

export interface IAnime extends Document {
  anilistId: number;
  malId?: number;
  title: { romaji: string; english?: string; native?: string };
  description?: string;
  genres: string[];
  format?: string;
  status?: string;
  episodes?: number;
  season?: string;
  year?: number;
  score?: number; // 0 to 100 (AniList average score)
  popularity?: number;
  coverImage?: string;
  bannerImage?: string;
  trailerYoutubeId?: string;
  studios: string[];
  nextEpisode?: { episode: number; airingAt: Date };
}

const AnimeSchema = new Schema<IAnime>(
  {
    anilistId: { type: Number, required: true, unique: true },
    malId: Number,
    title: {
      romaji: { type: String, required: true },
      english: String,
      native: String,
    },
    description: String,
    genres: { type: [String], default: [] },
    format: String,
    status: String,
    episodes: Number,
    season: String,
    year: Number,
    score: Number,
    popularity: Number,
    coverImage: String,
    bannerImage: String,
    trailerYoutubeId: String,
    studios: { type: [String], default: [] },
    nextEpisode: {
      episode: Number,
      airingAt: Date,
    },
  },
  { timestamps: true }
);

AnimeSchema.index({ genres: 1 });
AnimeSchema.index({ year: 1 });
AnimeSchema.index({ popularity: -1 });
AnimeSchema.index({ 'nextEpisode.airingAt': 1 });

export default mongoose.model<IAnime>('Anime', AnimeSchema);
