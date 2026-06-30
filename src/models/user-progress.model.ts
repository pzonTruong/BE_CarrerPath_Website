import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  careerId: string;
  completedSteps: string[];
  percentage: number;
  isEnrolled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserProgressSchema = new Schema<IUserProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    careerId: { type: String, required: true },
    completedSteps: [{ type: String }],
    percentage: { type: Number, default: 0, min: 0, max: 100 },
    isEnrolled: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Compound index to ensure unique record per user and career path
UserProgressSchema.index({ userId: 1, careerId: 1 }, { unique: true });

export const UserProgressModel = mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
