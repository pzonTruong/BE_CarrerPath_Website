import mongoose, { Schema } from 'mongoose';

export interface CareerDocument extends mongoose.Document {
  careerId: string;
  title: string;
  description: string;
  skillIds: mongoose.Types.ObjectId[];
}

const careerSchema = new Schema<CareerDocument>(
  {
    careerId: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    skillIds: [{ type: Schema.Types.ObjectId, ref: 'Skill' }]
  },
  { timestamps: true }
);

export const CareerModel = mongoose.model<CareerDocument>('Career', careerSchema);
