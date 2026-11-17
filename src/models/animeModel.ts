import mongoose from 'mongoose';

const episodeSchema = new mongoose.Schema({
  episodeNumber: { type: Number, required: true },
  videoUrl: { type: String, required: true },
});

const animeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String },
    anilistId: { type: Number, required: true, unique: true },
    videoUrl: { type: String }, // Used for Movies
    episodes: [episodeSchema],  // Used for TV Shows
  },
  { timestamps: true }
);

const AnimeModel = mongoose.model('Anime', animeSchema);
export default AnimeModel;