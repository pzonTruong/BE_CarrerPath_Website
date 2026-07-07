import mongoose, { Schema } from 'mongoose';

export interface ResourceDocument extends mongoose.Document {
  title: string;
  type: string;
  url: string;
  skillId: mongoose.Types.ObjectId;
}

const resourceSchema = new Schema<ResourceDocument>(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    skillId: { type: Schema.Types.ObjectId, ref: 'Skill', required: true }
  },
  { timestamps: true, collection: 'resources' }
);

export const ResourceModel = mongoose.model<ResourceDocument>('Resource', resourceSchema);
