import mongoose, { Schema } from 'mongoose';

export interface RoadmapResource {
  title: string;
  sourceName: string;
  url: string;
}

export interface RoadmapStep {
  stepId: string;
  title: string;
  description: string;
  order: number;
  subtopics: string[];
  skillIds: mongoose.Types.ObjectId[];
  externalResources: RoadmapResource[];
}

export interface RoadmapDocument extends mongoose.Document {
  careerId: string;
  careerTitle: string;
  description: string;
  skills: string[];
  roadmapSteps: RoadmapStep[];
}

const roadmapResourceSchema = new Schema<RoadmapResource>(
  {
    title: { type: String, required: true, trim: true },
    sourceName: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const roadmapStepSchema = new Schema<RoadmapStep>(
  {
    stepId: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    order: { type: Number, required: true },
    subtopics: [{ type: String, trim: true }],
    skillIds: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    externalResources: [roadmapResourceSchema]
  },
  { _id: false }
);

const roadmapSchema = new Schema<RoadmapDocument>(
  {
    careerId: { type: String, required: true, unique: true, trim: true, lowercase: true },
    careerTitle: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    skills: [{ type: String, trim: true }],
    roadmapSteps: [roadmapStepSchema]
  },
  { timestamps: true }
);

export const RoadmapModel = mongoose.model<RoadmapDocument>('Roadmap', roadmapSchema);
