import { z } from 'zod';

const emptyStringToUndefined = (value: unknown) => {
  if (typeof value === 'string' && value.trim() === '') return undefined;
  return value;
};

export const updateProfileSchema = z.object({
  displayName: z.string().trim().min(1).max(100).optional(),
  bio: z.string().trim().max(200).optional(),
  phone: z.string().trim().min(7).max(20).optional(),
  enableStudyReminder: z.boolean().optional()
});

export const createPortfolioSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(120),
  url: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().url('URL must be valid').max(500).optional()
  )
});

export const updatePortfolioSchema = createPortfolioSchema;

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CreatePortfolioInput = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>;
