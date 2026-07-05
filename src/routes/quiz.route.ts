import { Router } from 'express';
import { authGuard } from '../middlewares/auth.middleware';
import { getQuizzes, submitQuiz } from '../controllers/quiz.controller';

export const quizRouter = Router();

quizRouter.get('/:skillId', authGuard, getQuizzes);
quizRouter.post('/submit', authGuard, submitQuiz);
