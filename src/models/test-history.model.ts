import mongoose, { Schema, Document } from 'mongoose';

export interface ITestHistory extends Document {
  userId: mongoose.Types.ObjectId;
  careerId: string;
  stepId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  answersData: any;
  createdAt: Date;
  updatedAt: Date;
}

const TestHistorySchema = new Schema<ITestHistory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    careerId: { type: String, required: true },
    stepId: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    answersData: { type: Schema.Types.Mixed }
  },
  { timestamps: true }
);

export const TestHistoryModel = mongoose.model<ITestHistory>('TestHistory', TestHistorySchema);
