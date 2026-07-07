import { z } from 'zod';

export const learningResourceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.string().min(1, 'Type is required'),
  url: z.string().url('Invalid URL')
});

export const careerLevelSchema = z.object({
  name: z.string().min(1, 'Level name is required'),
  requiredSkills: z.array(z.string()).optional(),
  competencies: z.array(z.string()).optional(),
  learningResources: z.array(learningResourceSchema).optional()
});

export const createCareerPathSchema = z.object({
  pathName: z.string().min(1, 'Path name is required'),
  department: z.string().min(1, 'Department is required'),
  description: z.string().min(1, 'Description is required'),
  levels: z.array(careerLevelSchema).optional()
});

export const updateCareerPathSchema = createCareerPathSchema;
