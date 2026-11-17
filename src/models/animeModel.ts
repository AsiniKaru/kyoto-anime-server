import mongoose, { Schema, Document } from 'mongoose';

export interface IEpisode {
  episodeNumber: number;
  title?: string;
  videoUrl: string;
}

export interface IAnime extends Document {
  title: string;
  description?: string;
  type: string;
  anilistId?: number;
  videoUrl?: string;
  episodes?: IEpisode[];
}

const EpisodeSchema: Schema = new Schema({
  episodeNumber: { type: Number, required: true },
  title: { type: String },
  videoUrl: { type: String, required: true }
});

const AnimeSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String },
  anilistId: { type: Number, sparse: true, unique: true },
  videoUrl: { type: String },
  episodes: [EpisodeSchema]
}, { timestamps: true });

export default mongoose.model<IAnime>('Anime', AnimeSchema);