import { Router } from 'express';
import { getRoadmapByCareerId } from '../controllers/roadmap.controller';

export const roadmapRouter = Router();

roadmapRouter.get('/:careerId', getRoadmapByCareerId);
