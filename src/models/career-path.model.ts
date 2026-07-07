import mongoose, { Schema } from 'mongoose';

export interface LearningResource {
  title: string;
  type: string;
  url: string;
}

export interface CareerLevel {
  name: string;
  requiredSkills: mongoose.Types.ObjectId[];
  competencies: string[];
  learningResources: LearningResource[];
}

export interface CareerPathDocument extends mongoose.Document {
  pathName: string;
  department: string;
  description: string;
  levels: CareerLevel[];
}

const learningResourceSchema = new Schema<LearningResource>(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const careerLevelSchema = new Schema<CareerLevel>(
  {
    name: { type: String, required: true, trim: true },
    requiredSkills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    competencies: [{ type: String, trim: true }],
    learningResources: [learningResourceSchema]
  },
  { _id: false }
);

const careerPathSchema = new Schema<CareerPathDocument>(
  {
    pathName: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    levels: [careerLevelSchema]
  },
  { timestamps: true, collection: 'careers', strict: false }
);

export const CareerPathModel = mongoose.model<CareerPathDocument>('CareerPath', careerPathSchema);
