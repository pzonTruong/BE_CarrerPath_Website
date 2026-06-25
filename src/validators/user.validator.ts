import { z } from 'zod';

export const updateUserGoalSchema = z.object({
  careerId: z.string().trim().min(1).max(100).optional(),
  goal: z.string().trim().min(1).max(100).optional(),
  careerTitle: z.string().trim().max(150).optional(),
  note: z.string().trim().max(300).optional()
}).refine((data) => data.careerId || data.goal, {
  message: 'careerId or goal is required',
  path: ['careerId']
});

export type UpdateUserGoalInput = z.infer<typeof updateUserGoalSchema>;
