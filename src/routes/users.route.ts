import { Router } from 'express';
import { updateUserGoal } from '../controllers/user.controller';
import { authGuard } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { updateUserGoalSchema } from '../validators/user.validator';

export const usersRouter = Router();

usersRouter.put('/goal', authGuard, validateBody(updateUserGoalSchema), updateUserGoal);
