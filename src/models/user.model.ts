import mongoose, { Schema } from 'mongoose';

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  isEmailVerified: boolean;
  otpCode?: string;
  otpExpiresAt?: Date;
  resetToken?: string;
  resetTokenExpiresAt?: Date;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  phone?: string;
  goal?: {
    careerId: string;
    careerTitle?: string;
    note?: string;
    updatedAt?: Date;
  };
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    otpCode: { type: String },
    otpExpiresAt: { type: Date },
    resetToken: { type: String },
    resetTokenExpiresAt: { type: Date },
    displayName: { type: String, trim: true },
    bio: { type: String, maxlength: 200 },
    avatarUrl: { type: String },
    phone: { type: String, trim: true },
    goal: {
      careerId: { type: String, trim: true },
      careerTitle: { type: String, trim: true },
      note: { type: String, trim: true, maxlength: 300 },
      updatedAt: { type: Date }
    }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
