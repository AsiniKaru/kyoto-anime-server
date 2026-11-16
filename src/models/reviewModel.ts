import mongoose, { Schema, type Document, type Model, type Types } from 'mongoose';

export interface IReview extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  malId: number;
  animeTitle: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    malId: { type: Number, required: true, index: true },
    animeTitle: { type: String, default: '' },
    rating: {
      type: Number,
      required: true,
      min: [1, 'Rating must be between 1 and 10'],
      max: [10, 'Rating must be between 1 and 10'],
    },
    comment: {
      type: String,
      default: '',
      maxlength: [1000, 'Comment must be at most 1000 characters'],
    },
  },
  { timestamps: true }
);

reviewSchema.index({ user: 1, malId: 1 }, { unique: true });
reviewSchema.index({ createdAt: -1 });

const Review: Model<IReview> =
  (mongoose.models.Review as Model<IReview> | undefined) ??
  mongoose.model<IReview>('Review', reviewSchema);

export default Review;
