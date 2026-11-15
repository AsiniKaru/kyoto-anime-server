import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  passwordKey: string;
  role: 'viewer' | 'admin';
}

const UserSchema: Schema = new Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordKey: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ['viewer', 'admin'], 
      default: 'viewer' 
    }
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model<IUser>('User', UserSchema);