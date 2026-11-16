import mongoose, { Schema, type Document, type Model, type Types } from 'mongoose';

export interface IRefreshToken extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  createdByIp: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    createdByIp: { type: String, default: '' },
    userAgent: { type: String, default: '' },
  },
  { timestamps: true }
);

// MongoDB removes documents once the refresh token expires.
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken: Model<IRefreshToken> =
  (mongoose.models.RefreshToken as Model<IRefreshToken> | undefined) ??
  mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema);

export default RefreshToken;
