import { Router } from 'express';
import { getRecommendationHistory, recommendCareerPaths } from '../controllers/career-recommendation.controller';
import { getRoadmapByCareerId } from '../controllers/roadmap.controller';
import { authGuard } from '../middlewares/auth.middleware';
import { optionalAuth } from '../middlewares/optional-auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { careerRecommendationSchema } from '../validators/career-recommendation.validator';

export const roadmapRouter = Router();

roadmapRouter.get('/recommendations/history', authGuard, getRecommendationHistory);
roadmapRouter.post('/recommendations', optionalAuth, validateBody(careerRecommendationSchema), recommendCareerPaths);
roadmapRouter.get('/:careerId', getRoadmapByCareerId);
