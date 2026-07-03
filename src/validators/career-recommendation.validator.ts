import { z } from 'zod';

export const careerRecommendationSchema = z.object({
  skills: z.string().trim().min(2).max(1000),
  interests: z.string().trim().min(2).max(1000),
  goals: z.string().trim().min(2).max(1000)
});

export type CareerRecommendationInput = z.infer<typeof careerRecommendationSchema>;
