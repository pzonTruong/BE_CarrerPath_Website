import mongoose, { Schema } from 'mongoose';

interface RecommendationItem {
  careerTitle: string;
  reason: string;
  skillsToLearn: string[];
}

export interface RecommendationHistoryDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  skills: string;
  interests: string;
  goals: string;
  recommendations: RecommendationItem[];
  createdAt: Date;
  updatedAt: Date;
}

const recommendationItemSchema = new Schema<RecommendationItem>(
  {
    careerTitle: { type: String, required: true, trim: true },
    reason: { type: String, required: true, trim: true },
    skillsToLearn: [{ type: String, trim: true }]
  },
  { _id: false }
);

const recommendationHistorySchema = new Schema<RecommendationHistoryDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    skills: { type: String, required: true, trim: true },
    interests: { type: String, required: true, trim: true },
    goals: { type: String, required: true, trim: true },
    recommendations: { type: [recommendationItemSchema], required: true }
  },
  { timestamps: true }
);

recommendationHistorySchema.index({ userId: 1, createdAt: -1 });

export const RecommendationHistoryModel = mongoose.model<RecommendationHistoryDocument>(
  'RecommendationHistory',
  recommendationHistorySchema
);
