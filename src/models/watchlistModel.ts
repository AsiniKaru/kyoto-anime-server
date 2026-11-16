import mongoose, { Schema, type Document, type Model, type Types } from 'mongoose';

export const WATCH_STATUSES = [
  'watching',
  'completed',
  'plan_to_watch',
  'on_hold',
  'dropped',
] as const;

export type WatchStatus = (typeof WATCH_STATUSES)[number];

export const isWatchStatus = (value: unknown): value is WatchStatus =>
  typeof value === 'string' && (WATCH_STATUSES as readonly string[]).includes(value);

export interface IWatchlist extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  malId: number;
  title: string;
  image: string;
  year: number | null;
  score: number | null;
  type: string;
  genres: string[];
  status: WatchStatus;
  createdAt: Date;
  updatedAt: Date;
}

const watchlistSchema = new Schema<IWatchlist>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    malId: { type: Number, required: true },
    title: { type: String, required: true },
    image: { type: String, default: '' },
    year: { type: Number, default: null },
    score: { type: Number, default: null },
    type: { type: String, default: '' },
    genres: [{ type: String }],
    status: {
      type: String,
      enum: WATCH_STATUSES,
      default: 'plan_to_watch',
    },
  },
  { timestamps: true }
);

watchlistSchema.index({ user: 1, malId: 1 }, { unique: true });
watchlistSchema.index({ malId: 1 });
watchlistSchema.index({ status: 1 });

const Watchlist: Model<IWatchlist> =
  (mongoose.models.Watchlist as Model<IWatchlist> | undefined) ??
  mongoose.model<IWatchlist>('Watchlist', watchlistSchema);

export default Watchlist;
