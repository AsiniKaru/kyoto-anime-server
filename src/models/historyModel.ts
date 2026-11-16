import mongoose, { Schema, type Document, type Model, type Types } from 'mongoose';

export interface IHistory extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  malId: number;
  title: string;
  image: string;
  episode: number;
  progress: number;
  durationSeconds: number;
  lastWatchedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const historySchema = new Schema<IHistory>(
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
    episode: { type: Number, default: 1, min: 1 },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    durationSeconds: { type: Number, default: 0, min: 0 },
    lastWatchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

historySchema.index({ user: 1, malId: 1 }, { unique: true });
historySchema.index({ user: 1, lastWatchedAt: -1 });

const History: Model<IHistory> =
  (mongoose.models.History as Model<IHistory> | undefined) ??
  mongoose.model<IHistory>('History', historySchema);

export default History;
