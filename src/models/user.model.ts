import mongoose, { Schema } from 'mongoose';

export interface PortfolioItem {
  _id?: mongoose.Types.ObjectId;
  title: string;
  url?: string;
  fileUrl?: string;
  fileName?: string;
  fileMimeType?: string;
  filePublicId?: string;
  fileResourceType?: 'image' | 'raw';
  createdAt?: Date;
}

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
  cvUrl?: string;
  cvName?: string;
  cvPublicId?: string;
  cvResourceType?: 'image' | 'raw';
  goal?: {
    careerId: string;
    careerTitle?: string;
    note?: string;
    updatedAt?: Date;
  };
  role: 'User' | 'Admin';
  portfolios: PortfolioItem[];
}

const portfolioSchema = new Schema<PortfolioItem>(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    url: { type: String, trim: true },
    fileUrl: { type: String },
    fileName: { type: String, trim: true },
    fileMimeType: { type: String, trim: true },
    filePublicId: { type: String, trim: true },
    fileResourceType: { type: String, enum: ['image', 'raw'] },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: true }
);

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
    cvUrl: { type: String },
    cvName: { type: String },
    cvPublicId: { type: String },
    cvResourceType: { type: String, enum: ['image', 'raw'] },
    goal: {
      careerId: { type: String, trim: true },
      careerTitle: { type: String, trim: true },
      note: { type: String, trim: true, maxlength: 300 },
      updatedAt: { type: Date }
    },
    role: { type: String, enum: ['User', 'Admin'], default: 'User' },
    portfolios: { type: [portfolioSchema], default: [] }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
