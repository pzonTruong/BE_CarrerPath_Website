import mongoose, { Schema } from 'mongoose';

export interface SkillDocument extends mongoose.Document {
  name: string;
  slug: string;
  description?: string;
}

const skillSchema = new Schema<SkillDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, trim: true }
  },
  { timestamps: true }
);

export const SkillModel = mongoose.model<SkillDocument>('Skill', skillSchema);
