import { z } from 'zod';

export const createResourceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  type: z.string().min(1, 'Type is required'),
  url: z.string().url('Invalid URL'),
  skillId: z.string().min(1, 'Skill ID is required')
});

export const updateResourceSchema = createResourceSchema;
