import { Router } from 'express';
import { authGuard } from '../middlewares/auth.middleware';
import { toggleStepCompletion, getUserDashboardData, enrollInCareerPath } from '../controllers/progress.controller';

export const progressRouter = Router();

progressRouter.post('/toggle', authGuard, toggleStepCompletion);
progressRouter.post('/enroll', authGuard, enrollInCareerPath);
progressRouter.get('/dashboard', authGuard, getUserDashboardData);
