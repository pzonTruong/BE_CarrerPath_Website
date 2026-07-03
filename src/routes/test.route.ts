import { Router } from 'express';
import { authGuard } from '../middlewares/auth.middleware';
import { submitTestResult } from '../controllers/test.controller';

export const testRouter = Router();

testRouter.post('/submit', authGuard, submitTestResult);
